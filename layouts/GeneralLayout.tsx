import Head from 'next/head'
import React, { ReactElement, useContext, useEffect, useState } from 'react'
import GeneralNavbar from '../components/Navigations/GeneralNavbar'
import { useDisclosure } from '@chakra-ui/react'
import Footer from '../components/Navigations/Footer'
import { Store } from '../Context/Store'
import { data } from '../utils/data'
import CurrencyModal from '../components/Modals/CurrencyModal'
import { useWindowScrollPositions } from '../hooks/useWindowScrollPosition'
import { useRouter } from 'next/router'

interface Props {
  title: string
  description: string
  icon?: any
  children?: any
  no_text?: any
  twitter_title?: string
  twitter_description?: string
  canonical_url?: string
  og_image?: any
  bg_color?: string
  component_above_navbar?: any
  og_url?: string
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
  og_url,
  bg_color,
  component_above_navbar,
}: Props): ReactElement {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { state, dispatch } = useContext(Store)
  const { currency } = state
  const { scrollY } = useWindowScrollPositions()
  const [close_message, setCloseMessage] = useState(false)
  const router = useRouter()

  const OG_IMAGE =
    'https://res.cloudinary.com/trolliey/image/upload/v1668036453/flyer_qb7qnl.png'

  useEffect(() => {
    if (!currency) {
      onOpen()
    }
    dispatch({ type: 'CHANGE_CURRENCY', payload: currency })
  }, [])
  const targetPages = ['/about', '/contact', '/terms', '/privacy']
  const isTargetPage = targetPages.includes(router.pathname)

  return (
    <div
      className={`${
        bg_color ? bg_color : 'bg-gray-100 '
      } overflow-scroll bg-gray-100`}
      style={{ backgroundColor: 'rgb(243 244 246)' }}
    >
      <Head>
        <title>{title ? `${title} | Trolliey ` : data.original_title}</title>
        <meta
          name="description"
          content={
            description
              ? description.replace(/<[^>]*>?/gm, '')
              : data.site_description
          }
        />

        {/* // facebook and whatapp meta tags */}
        <meta property="og:type" content="website" />
        <meta
          name="og:title"
          property="og:title"
          content={title ? `${title} | Trolliey` : data.original_title}
        />
        <meta
          name="og:description"
          property="og:description"
          content={
            description
              ? description.replace(/<[^>]*>?/gm, '')
              : data.site_description
          }
        />
        <meta property="og:site_name" content={data.site_url} />
        <meta property="og:url" content={`${data.site_url}/${og_url}`} />
        <meta
          property="og:image"
          content={og_image ? og_image : '/images/icon.png'}
        />
        <meta
          property="og:image:alt"
          content="Product and site representation on link"
        />
        <meta property="og:image:width" content="2500" />
        <meta property="og:image:height" content="1330" />

        {/* // twitter tags */}
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content={
            twitter_title
              ? `${twitter_title} | Trolliey`
              : 'Trolliey | Buy and sell items online'
          }
        />
        <meta
          name="twitter:description"
          content={twitter_description?.replace(/<[^>]*>?/gm, '')}
        />
        <meta name="twitter:site" content="" />
        <meta name="twitter:creator" content="" />
        <meta name="twitter:image" content={og_image ? og_image : OG_IMAGE} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="en_GB" />
        <meta property="og:locale:alternate" content="cn_CN" />

        <link rel="icon" type="image/png" href="/images/icon.png" />
        <link rel="shortcut icon" type="image/png" href="/images/icon.png" />
        <link rel="apple-touch-icon" href="/images/icon.png" />
        <link rel="canonical" href={`${data.site_url}/${og_url}`} />
      </Head>
      <nav className="z-50">
        <GeneralNavbar
          setCloseMessage={setCloseMessage}
          close_message={close_message}
          scrollY={scrollY}
          component_above_navbar={component_above_navbar}
        />
      </nav>
      <main
        className={`${
          !close_message && component_above_navbar ? 'pt-32 ' : 'pt-16 '
        } w-full pt-16`}
      >
        <div
          className={!isTargetPage ? 'container mx-auto max-w-7xl px-2' : ''}
        >
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
        </div>
      </main>

      <footer className="text-gray-700">
        <Footer />
      </footer>
    </div>
  )
}

export default GeneralLayout
