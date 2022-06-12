import Head from 'next/head'
import React, { ReactElement, useContext, useEffect } from 'react'
import GeneralNavbar from '../components/Navigations/GeneralNavbar'
import { Container, useDisclosure } from '@chakra-ui/react'
import Footer from '../components/Navigations/Footer'
import { Store } from '../Context/Store'
import { data } from '../utils/data'
import CurrencyModal from '../components/Modals/CurrencyModal'
import { useWindowScrollPositions } from '../hooks/useWindowScrollPosition'

interface Props {
  title: string
  description: string
  icon?: any
  children?: any
  no_text?: any
  twitter_title?: string
  twitter_description?: string
  canonical_url?: string
  og_image?: any,
  bg_color?:string,
  component_above_navbar?:any
}

function GeneralLayout({
  children,
  no_text,
  title,
  description,
  twitter_title,
  twitter_description,
  canonical_url,
  og_image,
  bg_color,
  component_above_navbar
}: Props): ReactElement {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { state, dispatch } = useContext(Store)
  const { currency } = state
  const { scrollX, scrollY } = useWindowScrollPositions()

  useEffect(() => {
    if (!currency) {
      onOpen()
    }
    dispatch({ type: 'CHANGE_CURRENCY', payload: currency })
  }, [])

  return (
    <div
      className={`${bg_color ? bg_color : "bg-gray-100 "} overflow-scroll bg-gray-100`}
      style={{ backgroundColor: 'rgb(243 244 246)' }}
    >
      <Head>
        <title>{title ? `${title} | Trolliey ` : data.original_title}</title>
        <meta
          name="description"
          content={description ? description : data.site_description}
        />
        <meta property="og:type" content="website" />
        <meta
          name="og:title"
          property="og:title"
          content={title ? `${title} | Trolliey` : data.original_title}
        />
        <meta
          name="og:description"
          property="og:description"
          content={description ? description : data.site_description}
        />
        <meta property="og:site_name" content={data.site_url} />
        <meta property="og:url" content="" />
        <meta
          property="og:image"
          content={
            og_image
              ? og_image
              : '//cdn.example.com/uploads/images/webpage_300x200.png'
          }
        />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content={
            twitter_title
              ? `${twitter_title} | Trolliey`
              : 'Trolliey | Buy and sell items online'
          }
        />
        <meta name="twitter:description" content={twitter_description} />
        <meta name="twitter:site" content="" />
        <meta name="twitter:creator" content="" />
        <link rel="icon" type="image/png" href="/icon.png" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="twitter:image" content={og_image} />
        <link
          rel="canonical"
          href={canonical_url ? canonical_url : data.site_url}
        />
      </Head>
      <nav className="">
        <GeneralNavbar scrollY={scrollY} component_above_navbar={component_above_navbar} />
      </nav>
      <main className={`${component_above_navbar ? "pt-32 " : "pt-16 " } w-full pt-16`}>
        <Container maxW="container.xl" className="mx-auto">
          {!no_text && (
            <h1
              className="flex text-sm font-semibold text-gray-700 "
              style={{ marginTop: '15px', marginBottom: '15px' }}
            >
              {data.site_top_message}
            </h1>
          )}
          {children}
          {!currency && (
            <CurrencyModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
          )}
        </Container>
      </main>

      <footer className="text-gray-700">
        <Footer />
      </footer>
    </div>
  )
}

export default GeneralLayout
