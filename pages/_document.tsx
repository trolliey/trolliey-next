import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
import { data } from '../utils/data'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head prefix="og:https://ogp.me/ns#">
          <link rel="icon" type="image/png" href="/images/icon.png" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;700;800&family=Roboto:wght@100;300;400;500;700&display=swap"
            rel="stylesheet"
          />
          <link rel="shortcut icon" type="image/png" href="/images/icon.png" />
          <link rel="apple-touch-icon" href="/images/icon.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
