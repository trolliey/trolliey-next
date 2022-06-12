import React from 'react'
import Router from 'next/router';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '../styles/embla.global.css'
import '../styles/RatingComponent.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';
import { StoreProvider } from '../Context/Store'
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress

//Binding loading events. 
Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());

const theme = extendTheme({
  components: {
    Steps,
  },
});

if (typeof document === 'undefined') {
  React.useLayoutEffect = React.useEffect;
}

function MyApp({ Component, pageProps, }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </ChakraProvider>
  )
}

export default MyApp
