import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head prefix="og:https://ogp.me/ns#">
                    <link rel="shortcut icon" href="/icon.png" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
