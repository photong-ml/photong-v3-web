/* eslint-disable react/no-danger */
import React from 'react';
import { extractStyles } from 'evergreen-ui';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    static async getInitialProps({ renderPage }) {
        const page = await renderPage();
        // `css` is a string with css from both glamor and ui-box.
        // No need to get the glamor css manually if you are using it elsewhere in your app.
        //
        // `hydrationScript` is a script you should render on the server.
        // It contains a stringified version of the glamor and ui-box caches.
        // Evergreen will look for that script on the client and automatically hydrate
        // both glamor and ui-box.
        const { css, hydrationScript } = extractStyles();

        return {
            ...page,
            css,
            hydrationScript,
        };
    }

    render() {
        const { css, hydrationScript } = this.props;

        return (
            <Html lang="en">
                <Head>
                    <style dangerouslySetInnerHTML={{ __html: css }} />
                    <link rel="preconnect" href="https://rsms.me/" />
                    <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                    <link rel="manifest" href="/site.webmanifest" />
                    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#22c55e" />
                    <meta name="apple-mobile-web-app-title" content="Photong" />
                    <meta name="application-name" content="Photong" />
                </Head>

                <body>
                    <Main />
                    {hydrationScript}
                    <NextScript />
                </body>
            </Html>
        );
    }
}
