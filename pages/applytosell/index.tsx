import React, { useContext } from 'react'
import {
  CheckCircleIcon,
  InboxIcon,
  SparklesIcon,
} from '@heroicons/react/outline'
import GeneralNavbar from '../../components/Navigations/GeneralNavbar'
import { useRouter } from 'next/router'
import BlueButton from '../../components/Buttons/BlueButton'
import dashboard from '../../public/images/picture1.png'
import dashboard2 from '../../public/images/picture2.png'
import Image from 'next/image'
import { Store } from '../../Context/Store'
import Link from 'next/link'
import Head from 'next/head'
import { data } from '../../utils/data'
import { Box, Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'

const OG_IMAGE = 'https://res.cloudinary.com/trolliey/image/upload/v1656413342/trolliey%20static%20images/applytosell_aytff9.png'

const includedFeatures = [
  'We help you from warehousing, delivery and product returns. We have made your shopping easier',
  'Your products are visible to over thousands of daily customer reach on our website and we offer market for all sellers on our social media platforms.',
  'Once you upload your products, you do not have to worry anymore, we handle delivery to customers, collections and returns as well.  If you are keeping stock yourself, we can either collect the product from you at a fee or you bring yourself at our fulfilment centre. ',
  'Local and international payments for customers. On all successful transactions, payments are made directly to you weekly.',
]

function BecomeASeller() {
  const history = useRouter()
  const { state, dispatch } = useContext(Store)
  const { userInfo } = state
  return (
    <>
      <Head>
        <title>{`Apply To Sell | Trolliey `}</title>
        <meta
          name="description"
          content={
            'Apply to sell your products online to more that a thousand daily customers who visit ourwebsite. Apply and sell for free Ts and Cs Apply.'
          }
        />
        <meta property="og:type" content="website" />
        <meta
          name="og:title"
          property="og:title"
          content={`Apply To Sell | Trolliey`}
        />
        <meta
          name="og:description"
          property="og:description"
          content={
            "Join Zimbabwe's  best online marketplace platform. Sell to over 1000 happy shoppers"
          }
        />
        <meta property="og:site_name" content={'Trolliey'} />
        <meta property="og:url" content={`${data.site_url}/applytosell`} />
        <meta
          property="og:image"
          content={OG_IMAGE}
        />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content={`Trolliey | Buy and sell items online`}
        />
        <meta
          name="twitter:description"
          content={
            'Earn money online. Apply to become a seller on Trolliey, and get access to a seller dashboard.'
          }
        />
        <meta name="twitter:site" content="" />
        <meta name="twitter:creator" content="" />
        {/* <link rel=”shortcut icon” href=”/icon.png" type=”image/x-icon” /> */}
        <link rel="shortcut icon" href="/icon.png" type="image/x-icon" />
        <link rel="icon" type="image/png" href="/icon.png" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta
          name="twitter:image"
          content={'https://cdn.example.com/uploads/images/webpage_300x200.png'}
        />
        <link
          rel="canonical"
          href={`${data.site_url}/applytosell`}
        />
      </Head>
      <div className="bg-white">
        <header>
          <GeneralNavbar />
        </header>
        <main>
          {/* Hero section */}
          <div className="relative py-8">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
                <div className="absolute inset-0">
                  <img
                    className="h-full w-full object-cover"
                    src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2830&q=80&sat=-100"
                    alt="People working on laptops"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-primary to-blue-dark mix-blend-multiply" />
                </div>
                <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                  <h1 className="text-center text-white text-xl font-extrabold tracking-tight sm:text-4xl lg:text-4xl">
                    We can help you grow your local business by providing you with the necessary tools for online shopping.
                  </h1>
                  <p className="mx-auto mt-6 max-w-lg text-center text-xl text-indigo-200 sm:max-w-3xl">
                    Apply to sell and connect online shoppers across Zimbabwe
                  </p>
                  <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                    <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                      <div
                        onClick={
                          userInfo
                            ? () => history.push('/create-store')
                            : () =>
                                history.push('/login?redirect=/create-store')
                        }
                        className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-blue-primary shadow-sm hover:bg-indigo-50 sm:px-8"
                      >
                        Apply Now
                      </div>

                      <Link href={'/explore'}>
                        <a className="flex items-center justify-center rounded-md border border-transparent bg-blue-dark bg-opacity-60 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-opacity-70 sm:px-8">
                          Back To Shopping
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* // price section */}
          <section>
            <div className="bg-gray-100">
              <div className="pt-12 sm:pt-16 lg:pt-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="text-left">
                    <h2 className="text-3xl font-black text-gray-900 sm:text-4xl lg:text-5xl">
                      Pricing
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                      We charge a monthly subscription fee $25 per seller account/month. You can choose to cancel your account at any time. (Free for the first month)
                    </p>
                    <p className='font-bold text-sm'>NB Storage fees (May Apply) – Free first month (if products are not bought, you pay for storage from the 1st  day of the following month )</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 bg-white pb-16 sm:mt-12 sm:pb-20 lg:pb-28">
                <div className="relative">
                  <div className="absolute inset-0 h-1/2 bg-gray-100" />
                  <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-lg overflow-hidden rounded-lg shadow-lg lg:flex lg:max-w-none">
                      <div className="flex-1 bg-white px-6 py-8 lg:p-12">
                        <h3 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                         How we work
                        </h3>
                        
                        <div className="mt-8">
                          <div className="flex items-center">
                            
                            <div className="flex-1 border-t-2 border-gray-200" />
                          </div>
                          <ul
                            role="list"
                            className="mt-8 space-y-5 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5 lg:space-y-0"
                          >
                            {includedFeatures.map((feature) => (
                              <li
                                key={feature}
                                className="flex items-start lg:col-span-1"
                              >
                                <div className="flex-shrink-0">
                                  <CheckCircleIcon
                                    className="h-5 w-5 text-green-400"
                                    aria-hidden="true"
                                  />
                                </div>
                                <p className="ml-3 text-sm text-gray-700">
                                  {feature}
                                </p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="bg-gray-50 py-8 px-6 text-center lg:flex lg:flex-shrink-0 lg:flex-col lg:justify-center lg:p-12">
                        <p className="text-lg font-medium leading-6 text-gray-900">
                          Pay,Grow, Rest
                        </p>
                        <div className="mt-4 flex items-center justify-center text-5xl font-extrabold text-gray-900">
                          <span>$25/m</span>
                          <span className="ml-3 text-xl font-medium text-gray-500">
                            USD
                          </span>
                        </div>
                        <p className="mt-4 text-sm">
                          <a
                            href="#"
                            className="font-medium text-gray-500 underline"
                          >
                            Proceed to Application
                          </a>
                        </p>
                        <div className="mt-6">
                          <BlueButton
                            onClick={() => history.push('/create-store')}
                            text={'Apply Now'}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
{/* @ts-ignore */}
             <Flex direction="column" justifyContent={'center'} px={16} my={8}>
      <Heading as="h2" size="xl" mb={4}>
        Application Process
      </Heading>

      {/* Step 1 */}
      <Box mb={4}>
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          1. Application
        </Text>
        <Text>
          Apply now by providing details about your business, products, and
          contact information.
        </Text>
      </Box>

      {/* Step 2 */}
      <Box mb={4}>
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          2. Approval
        </Text>
        <Text>
          We'll review your application within 24 hours and notify you of the
          approval status.
        </Text>
      </Box>

      {/* Step 3 */}
      <Box mb={4}>
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          3. Sales
        </Text>
        <Text>
          Once approved, you can start uploading your products and listing them
          for sale on our platform.
        </Text>
      </Box>

      {/* Step 4 */}
      <Box mb={4}>
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          4. Growth
        </Text>
        <Text>
          Boost your sales by participating in promotions and marketing
          campaigns. We're here to support your business growth.
        </Text>
      </Box>
    </Flex>

          {/* Alternating Feature Sections */}
        

          {/* CTA Section */}
          <div className="bg-white mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
           <Table variant="striped" colorScheme="teal" size="md">
      <TableCaption placement="top" fontSize="xl" mb={4}>
        Size of Packed product in cm3
      </TableCaption>
      <Thead>
        <Tr>
          <Th>Size</Th>
          <Th>0-30 stock days cover</Th>
          <Th>31+ days stock cover (overstocked)</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>Small</Td>
          <Td>0 – 60,000 cm</Td>
          <Td>$0</Td>
          <Td>$0.50</Td>
        </Tr>
        <Tr>
          <Td>Standard</Td>
          <Td>60,001 – 130,000 cm3</Td>
          <Td>$0</Td>
          <Td>$1.50</Td>
        </Tr>
        <Tr>
          <Td>Large</Td>
          <Td>130,001 – 200,000 cm3</Td>
          <Td>$0</Td>
          <Td>$2</Td>
        </Tr>
        <Tr>
          <Td>Extra Large</Td>
          <Td>200,001 – 275,000 cm3</Td>
          <Td>$0</Td>
          <Td>$2.50</Td>
        </Tr>
        <Tr>
          <Td>Oversize</Td>
          <Td>275,001 – 545,000 cm3</Td>
          <Td>$0</Td>
          <Td>$7</Td>
        </Tr>
        <Tr>
          <Td>Bulky</Td>
          <Td>545,001 – 775,000 cm3</Td>
          <Td>$0</Td>
          <Td>$13</Td>
        </Tr>
        <Tr>
          <Td>Extra Bulky</Td>
          <Td>&gt; 775,000 cm3</Td>
          <Td>$0</Td>
          <Td>$25</Td>
        </Tr>
      </Tbody>
    </Table>
          </div>
        </main>
      </div>
    </>
  )
}

export default BecomeASeller