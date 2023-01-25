/* eslint-disable react/no-danger */
import {extractStyles} from 'evergreen-ui';
import Document, {Head, Html, Main, NextScript} from 'next/document';
import React from 'react';

export default class MyDocument extends Document {
  static async getInitialProps({renderPage}) {
    const page = await renderPage();
    // `css` is a string with css from both glamor and ui-box.
    // No need to get the glamor css manually if you are using it elsewhere in
    // your app.
    //
    // `hydrationScript` is a script you should render on the server.
    // It contains a stringified version of the glamor and ui-box caches.
    // Evergreen will look for that script on the client and automatically
    // hydrate both glamor and ui-box.
    const {css, hydrationScript} = extractStyles();

    return {
      ...page,
      css,
      hydrationScript,
    };
  }

  render() {
    const {css, hydrationScript} = this.props;

    return (<Html><Head><style dangerouslySetInnerHTML =
                         {
                           { __html: css }
                         } />
                </Head>

            <body><Main />{hydrationScript}<NextScript />
            </body>
            </Html>);
  }
}
