import Head from 'next/head'
import React, { ReactElement, useContext, useEffect, useState } from 'react'
import GeneralNavbar from '../components/Navigations/GeneralNavbar'
import { Button, Container, useDisclosure } from '@chakra-ui/react'
import Footer from '../components/Navigations/Footer'
import Cookies from 'js-cookie'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { Store } from '../Context/Store'

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
}

interface CompareItemProps {
  picture: any
  name: string
  price: any
  id?: string
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
}: Props): ReactElement {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const desc =
    'Trolliey is a modern ecommerce platform. You can become a seller or become a buyer and trade your items from anywhere you like. You can manage you inventory and customers using our intuitive dashboard, Buy and sell goods and items online'
  const original_title = 'Trolliey'
  const url = 'www.trolliey.com'

  const { state, dispatch } = useContext(Store)
  const { currency } = state

  useEffect(() => {
    if (!currency) {
      onOpen()
    }
    dispatch({ type: 'CHANGE_CURRENCY', payload: currency })
  }, [])

  return (
    <div
      className="overflow-scroll bg-gray-100"
      style={{ backgroundColor: 'rgb(243 244 246)' }}
    >
      <Head>
        <title>{title ? `${title} | Trolliey ` : original_title}</title>
        <meta name="description" content={description ? description : desc} />
        <meta property="og:type" content="website" />
        <meta
          name="og:title"
          property="og:title"
          content={title ? `${title} | Trolliey` : original_title}
        />
        <meta
          name="og:description"
          property="og:description"
          content={description ? description : desc}
        />
        <meta property="og:site_name" content="www.trolliey.com" />
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
        <link rel="canonical" href={canonical_url ? canonical_url : url} />
      </Head>
      <nav className="">
        <GeneralNavbar />
      </nav>
      <main className="w-full pt-16">
        <Container maxW="container.xl" className="mx-auto">
          {!no_text && (
            <h1
              className="flex text-sm font-semibold text-gray-700 "
              style={{ marginTop: '15px', marginBottom: '15px' }}
            >
              Free Shipping On All Order Over $100 Code
            </h1>
          )}
          {children}
          {!currency && (
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Select Preferred Currency</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <div className="flex w-full flex-col items-center">
                    <div
                      onClick={() => {
                        Cookies.set('trolliey_currency', 'USD')
                        dispatch({ type: 'CHANGE_CURRENCY', payload: 'USD' })
                        onClose()
                      }}
                      className="w-full cursor-pointer rounded border-y border-gray-200 p-2 text-center hover:bg-gray-100"
                    >
                      USD
                    </div>
                    <div
                      onClick={() => {
                        Cookies.set('trolliey_currency', 'ZWL')
                        dispatch({ type: 'CHANGE_CURRENCY', payload: 'ZWL' })
                        onClose()
                      }}
                      className="w-full cursor-pointer rounded border-y border-gray-200 bg-gray-100 p-2 text-center hover:bg-gray-200"
                    >
                      ZWL
                    </div>
                    <div
                      onClick={() => {
                        Cookies.set('trolliey_currency', 'ANY')
                        dispatch({ type: 'CHANGE_CURRENCY', payload: 'ANY' })
                        onClose()
                      }}
                      className="w-full cursor-pointer rounded border-y border-gray-200 p-2 text-center hover:bg-gray-100"
                    >
                      ALL
                    </div>
                  </div>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button onClick={onClose} variant="ghost">
                    Proceed
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
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
