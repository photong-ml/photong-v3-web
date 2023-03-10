import Head from 'next/head';
import React from 'react';

import Header from './Header';
import Intro from './Intro';
import Player from './Player';
import ImageUpload from './ImageUpload';
import Loading from './Loading';

import config from '../config.json';

import { Pane, Heading, Link, Image, toaster } from 'evergreen-ui';
import { Howl, Howler } from 'howler';

export default function Home() {
    const [uploaded, setUploaded] = React.useState(false);
    const [images, setImages] = React.useState([]);
    const [audios, setAudios] = React.useState([]);
    const [seed, setSeed] = React.useState(0);
    const [alphaIndex, setAlphaIndex] = React.useState(0);
    const [caption, setCaption] = React.useState('');
    const [prompt, setPrompt] = React.useState('');
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [loading, setLoading] = React.useState(false);

    const MAX_FILES = 100; // how many audio files to download, maximum
    const alphas = [0.25, 0.5, 0.75, 1.0]; // alpha values for the model
    const seedImg = 'agile'; // seed image for the model

    Howler.volume(0.2);

    const generateAudio = React.useCallback(async () => {
        try {
            // Generate music with a given image.

            const nseed = Math.floor(Math.random() * 1000000);
            const nalphaIndex = 0;

            // skipcq: JS-0002
            console.log(`Generating audio seed ${nseed} alpha ${alphas[nalphaIndex]}`);

            setSeed(nseed);
            setAlphaIndex(nalphaIndex);

            setLoading(true);

            const formData = new FormData();
            formData.append('file', images[0]);

            const res = await fetch(`${config.API_URL}/infer?seed_img=${seedImg}&seed=${seed}&alpha=${alphas[nalphaIndex]}`, {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

            const data = res.ok ? await res.json() : Promise.reject(res);
            const audio = new Howl({
                src: [data.audio],
            });

            setUploaded(true);
            setAudios([audio]);
            setCaption(data.caption);
            setPrompt(data.prompt);
        } catch (e) {
            toaster.danger('Error generating audio. Please try again.', {
                description: `${e.message}`,
            });
            setLoading(false);
        }
    }, [seed, alphaIndex, audios, images]);

    const extendAudio = React.useCallback(async () => {
        try {
            // Add more 5-second segments based on the image/prompt already set.

            let nseed = seed;
            const nalphaIndex = (alphaIndex + 1) % 4;
            if (nalphaIndex === 0) nseed = seed + 1;
            setAlphaIndex(nalphaIndex);
            setSeed(nseed);

            // skipcq: JS-0002
            console.log(`Extending audio prompt ${prompt} seed ${nseed} alpha ${alphas[nalphaIndex]}`);

            const res = await fetch(
                `${config.API_URL}/infer/with-prompt?seed_img=${seedImg}&seed=${nseed}&prompt=${prompt}&alpha=${alphas[nalphaIndex]}`,
                {
                    method: 'POST',
                },
            );

            if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

            const data = await res.json();
            const resAudios = [...audios];
            resAudios.push(
                new Howl({
                    src: [data.audio],
                }),
            );

            if (!uploaded) return;
            setAudios(resAudios);
            setLoading(false);
        } catch (e) {
            toaster.danger('Error generating audio. Please try again.', {
                description: `${e.name}: ${e.message}`,
            });
            setLoading(false);
        }
    }, [seed, alphaIndex, audios, prompt, uploaded]);

    const clearAudios = React.useCallback(() => {
        setAudios([]);
    }, []);

    React.useEffect(() => {
        if (uploaded && audios.length > 0 && audios.length < MAX_FILES) extendAudio();
    }, [audios]);

    return (
        <Pane width="100vw" height="100vh" background="tint1">
            <Head>
                <title>Photong</title>
                <meta name="description" content="Photong uses machine learning to generate soundtracks from images." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />

            <Pane width="100%" display="flex" flexDirection="column" alignItems="center">
                <Pane display="flex" flexDirection="column" alignItems="center" marginTop={48} marginX={32}>
                    <Intro />
                    {loading ? (
                        <Loading />
                    ) : uploaded ? (
                        <Player
                            images={images}
                            setUploaded={setUploaded}
                            audios={audios}
                            clearAudios={clearAudios}
                            index={currentIndex}
                            setIndex={setCurrentIndex}
                            caption={caption}
                            prompt={prompt}
                        />
                    ) : (
                        <ImageUpload marginTop={32} files={images} setFiles={setImages} generateAudio={generateAudio} />
                    )}
                </Pane>
                <Pane marginTop={64} marginBottom={16} display="flex" flexDirection="column" alignItems="center">
                    <Heading size={100} marginBottom={4} fontWeight={400}>
                        Created by the Photong team.
                    </Heading>
                    <Link height={16} marginTop={8} href="https://status.photong.ml" target="_blank" rel="noopener noreferrer">
                        <Image
                            height={16}
                            src="https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/photong-ml/photong-status/master/api/photong-v3-api/uptime-day.json"
                            alt="Uptime status"
                        />
                    </Link>
                </Pane>
            </Pane>
        </Pane>
    );
}
