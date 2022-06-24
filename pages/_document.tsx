import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
import { data } from '../utils/data'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head prefix="og:https://ogp.me/ns#">
          <title>{`${data.original_title} - Buy and sell items online from Zimbabwe`}</title>
          <meta name="description" content={data.site_description} />
          <link rel="icon" type="image/png" href="/images/icon.png" />
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
