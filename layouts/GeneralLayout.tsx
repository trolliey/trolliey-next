import Head from 'next/head'
import React, { ReactElement, useEffect, useState } from 'react'
import GeneralNavbar from '../components/Navigations/GeneralNavbar'
import { Button, Container, useDisclosure } from '@chakra-ui/react'
import Footer from '../components/Navigations/Footer'
import { XIcon } from '@heroicons/react/outline'
import Image from 'next/image'
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

  const [_currency_, setCurrency] = useState<any>('')

  useEffect(() => {
    const currency = Cookies.get('trolliey_currency')
    if (!currency) {
      onOpen()
    }
    setCurrency(currency)
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
          {!_currency_ && (
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
                        onClose()
                      }}
                      className="w-full cursor-pointer rounded border-y border-gray-200 p-2 text-center hover:bg-gray-100"
                    >
                      USD
                    </div>
                    <div
                      onClick={() => {
                        Cookies.set('trolliey_currency', 'ZWL')
                        onClose()
                      }}
                      className="w-full cursor-pointer rounded border-y border-gray-200 bg-gray-100 p-2 text-center hover:bg-gray-200"
                    >
                      ZWL
                    </div>
                    <div
                      onClick={() => {
                        Cookies.set('trolliey_currency', 'ANY')
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
                  <Button variant="ghost">Proceed</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
        </Container>
      </main>

      {/* // commpare items */}
      {/* <div className="fixed bottom-0 left-0 z-40 h-24 w-full bg-white p-4 shadow">
        <div className="absolute top-0 right-0 z-30 cursor-pointer flex-row items-center rounded-full border border-gray-300 bg-white p-1">
          <XIcon className="text-gray-700" height={16} width={16} />
        </div>
        <div className="flex w-full flex-row items-center justify-between px-8">
          <div className="flex flex-row ">
            <Image
              src={the_image}
              width={80}
              height={60}
              objectFit="cover"
              className="rounded"
            />
            <div className="ml-2 flex flex-col">
              <p className="font-semibold text-gray-800">name</p>
              <p className="text-sm text-gray-400">price</p>
            </div>
          </div>
          <div className="flex flex-row ">
            <Image
              src={the_image}
              width={80}
              height={60}
              objectFit="cover"
              className="rounded"
            />
            <div className="flex flex-col">
              <p>name</p>
              <p>price</p>
            </div>
          </div>
          <div className="flex flex-row ">
            <Image
              src={the_image}
              width={80}
              height={60}
              objectFit="cover"
              className="rounded"
            />
            <div className="flex flex-col">
              <p>name</p>
              <p>price</p>
            </div>
          </div>
        </div>
      </div> */}
      <footer className="text-gray-700">
        <Footer />
      </footer>
    </div>
  )
}

const CompareItem = ({ name, price, picture, id }: CompareItemProps) => {
  return (
    <div className="flex flex-row ">
      <Image
        src={picture}
        width={80}
        height={60}
        objectFit="cover"
        className="rounded"
      />
      <div className="flex flex-col">
        <p>{name}</p>
        <p>{price}</p>
      </div>
    </div>
  )
}

export default GeneralLayout
