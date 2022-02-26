import React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '../styles/embla.global.css'
import '../styles/RatingComponent.css'
import { ChakraProvider } from '@chakra-ui/react'
import { StoreProvider } from '../Context/Store'

if (typeof document === 'undefined') {
  React.useLayoutEffect = React.useEffect;
}

function MyApp({ Component, pageProps, }: AppProps) {
  return (
    <StoreProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </StoreProvider>
  )
}

export default MyApp
