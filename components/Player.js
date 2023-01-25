import {
  ArrowLeftIcon,
  Button,
  Heading,
  IconButton,
  Pane,
  PauseIcon,
  PlayIcon,
  Text
} from 'evergreen-ui';
import React from 'react';

export default function Player({
  images,
  setUploaded,
  audios,
  clearAudios,
  index,
  setIndex,
  caption,
  prompt
}) {
  const [playing, setPlaying] = React.useState(false);
  const [bgImageURL, setBgImageURL] = React.useState('');

  React.useEffect(() => { setBgImageURL(URL.createObjectURL(images[0])); }, []);

  const playAudio = () => {
    console.log(`Playing audio index ${index}`);
    audios[index].play();

    setPlaying(true);

    audios[index].on('end', () => { setIndex(index + 1); });
  };

  React.useEffect(() => {
    if (playing)
      playAudio();
  }, [ index ]);

  const pauseAudio = () => {
    console.log(`Pausing audio index ${index}`);
    audios[index].pause();
    setPlaying(false);
  };

  const exitPlayer = () => {
    audios[index].stop();
    clearAudios();
    setIndex(0);
    setUploaded(false);
  };

    return (
        <Pane width="100%" marginTop={32}>
            <Button iconBefore={ArrowLeftIcon} appearance="minimal" onClick={exitPlayer}>
                Select new image
            </Button>
            <Pane maxWidth="100%" marginTop={16}>
                <Text size={400}>We saw</Text>
                <Heading size={600} marginBottom={8}>
                    {caption}
                </Heading>
                <Text size={400}>...so we composed</Text>
                <Heading size={600}>{prompt}.</Heading>
            </Pane>
            <Pane
    marginTop = {24} width = "100%"
    backgroundImage = {
        `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${
            bgImageURL})`} backgroundPosition = "center"
    backgroundSize = "cover"
    borderRadius = {6} height = {200} elevation = {4} > < IconButton
    icon = {playing ? PauseIcon
                    : PlayIcon} onClick = {playing ? pauseAudio
                                                   : playAudio} marginTop = {
        24} marginLeft = {24} height = {60} borderRadius = {30} border = "none"
    opacity = { 0.95 } />
            </Pane > < /Pane>
    );
}
