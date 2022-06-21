import React, { useContext } from 'react'
import {
  CheckCircleIcon,
  InboxIcon,
  SparklesIcon,
} from '@heroicons/react/outline'
import GeneralNavbar from '../../components/Navigations/GeneralNavbar'
import { useRouter } from 'next/router'
import BlueButton from '../../components/Buttons/BlueButton'
import dashboard from '../../public/img/dashboard_screenshot.png'
import Image from 'next/image'
import { Store } from '../../Context/Store'
import Link from 'next/link'
import Head from 'next/head'
import { data } from '../../utils/data'

const includedFeatures = [
  'Unlimited products',
  'Free delivery service',
  'Inventory management dashboard',
  'Official member t-shirt',
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
            'List your products online. Apply to become a seller on Trolliey, and get access to a seller dashboard with a lotof features to boost and track your sales.'
          }
        />
        <meta property="og:site_name" content={'Trolliey'} />
        <meta property="og:url" content={`${data.site_url}/applytosell`} />
        <meta
          property="og:image"
          content={'https://cdn.example.com/uploads/images/webpage_300x200.png'}
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
        <link rel="canonical" href={data.site_url} />
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
                  <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                    <span className="block text-white">
                      Put your business online and enjoy
                    </span>
                    <span className="block text-indigo-200">
                      a significant growth in sales
                    </span>
                  </h1>
                  <p className="mx-auto mt-6 max-w-lg text-center text-xl text-indigo-200 sm:max-w-3xl">
                    We can help you grow your local business by providing you with the necessary tools for online shopping.
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
                  <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
                      Pricing
                    </h2>
                    <p className="mt-4 text-xl text-gray-600">
                      Apply and Register for an online store for free. We handle delivery of your products to customers. 
                    </p>
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
                          Weekly Payouts
                        </h3>
                        <p className="mt-6 text-base text-gray-500">
                           Weekly payouts are sent to your account. We charge 5% tax inclusive service fee on every successfull transaction. 
                        </p>
                        <div className="mt-8">
                          <div className="flex items-center">
                            <h4 className="flex-shrink-0 bg-white pr-4 text-sm font-semibold uppercase tracking-wider text-blue-primary">
                              What's included
                            </h4>
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
                          <span>$0/m</span>
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

          {/* Alternating Feature Sections */}
          <div className="relative overflow-hidden pt-16 pb-32">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-gray-100"
            />
            <div className="relative">
              <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
                <div className="mx-auto max-w-xl px-4 sm:px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0">
                  <div>
                    <div>
                      <span className="flex h-12 w-12 items-center justify-center rounded-md bg-gradient-to-r from-blue-primary to-blue-dark">
                        <InboxIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                    <div className="mt-6">
                      <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                        Multi Vendor platform
                      </h2>
                      <p className="mt-4 text-lg text-gray-500">
                        More than half of the products sold in our stores are
                        from independent sellers. We made online shopping
                        easier, apply to sell and access tools you need to
                        increase sales and grow your business.
                      </p>
                      <div className="mt-6">
                        <div className="mt-6">
                          <div
                            onClick={() => history.push('/create-store')}
                            className="inline-flex rounded-md border border-transparent bg-gradient-to-r from-blue-primary to-blue-dark bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"
                          >
                            Get started
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative mt-12 sm:mt-16 lg:mt-0">
                  <div className="relative -mr-48 pl-4 sm:pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0">
                    <Image
                      layout="fill"
                      objectFit="cover"
                      className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                      src={dashboard}
                      alt="Inbox user interface"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-24">
              <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
                <div className="mx-auto max-w-xl px-4 sm:px-6 lg:col-start-2 lg:mx-0 lg:max-w-none lg:py-32 lg:px-0">
                  <div>
                    <div>
                      <span className="flex h-12 w-12 items-center justify-center rounded-md bg-gradient-to-r from-blue-primary to-blue-dark">
                        <SparklesIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                    <div className="mt-6">
                      <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                        Grow your busienss online
                      </h2>
                      <p className="mt-4 text-lg text-gray-500">
                        Get access to over a thousand and still growing
                        customers on trolliey. Manage your stock the way you
                        want, Safe and secure online payments
                      </p>
                      <div className="mt-6">
                        <div
                          onClick={() => history.push('/create-store')}
                          className="inline-flex rounded-md border border-transparent bg-gradient-to-r from-blue-primary to-blue-dark bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"
                        >
                          Get started
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-12 sm:mt-16 lg:col-start-1 lg:mt-0">
                  <div className="relative -ml-48 pr-4 sm:pr-6 md:-ml-16 lg:relative lg:m-0 lg:h-full lg:px-0">
                    <Image
                      layout="fill"
                      objectFit="cover"
                      className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                      src={dashboard}
                      alt="Customer profile user interface"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats section */}
          {/* <div className="relative bg-gray-900">
                    <div className="h-80 absolute inset-x-0 bottom-0 xl:top-0 xl:h-full">
                        <div className="h-full w-full xl:grid xl:grid-cols-2">
                            <div className="h-full xl:relative xl:col-start-2">
                                <img
                                    className="h-full w-full object-cover opacity-25 xl:absolute xl:inset-0"
                                    src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2830&q=80&sat=-100"
                                    alt="People working on laptops"
                                />
                                <div
                                    aria-hidden="true"
                                    className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-900 xl:inset-y-0 xl:left-0 xl:h-full xl:w-32 xl:bg-gradient-to-r"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 xl:grid xl:grid-cols-2 xl:grid-flow-col-dense xl:gap-x-8">
                        <div className="relative pt-12 pb-64 sm:pt-24 sm:pb-64 xl:col-start-1 xl:pb-24">
                            <h2 className="text-sm font-semibold tracking-wide uppercase">
                                <span className="bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent">
                                    Valuable Metrics
                                </span>
                            </h2>
                            <p className="mt-3 text-3xl font-extrabold text-white">
                                Get actionable data that will help grow your business
                            </p>
                            <p className="mt-5 text-lg text-gray-300">
                                Rhoncus sagittis risus arcu erat lectus bibendum. Ut in adipiscing quis in viverra tristique sem. Ornare
                                feugiat viverra eleifend fusce orci in quis amet. Sit in et vitae tortor, massa. Dapibus laoreet amet
                                lacus nibh integer quis. Eu vulputate diam sit tellus quis at.
                            </p>
                            <div className="mt-12 grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">
                                {metrics.map((item) => (
                                    <p key={item.id}>
                                        <span className="block text-2xl font-bold text-white">{item.stat}</span>
                                        <span className="mt-1 block text-base text-gray-300">
                                            <span className="font-medium text-white">{item.emphasis}</span> {item.rest}
                                        </span>
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div> */}

          {/* CTA Section */}
          <div className="bg-white">
            <div className="mx-auto max-w-4xl py-16 px-4 sm:px-6 sm:py-24 lg:flex lg:max-w-7xl lg:items-center lg:justify-between lg:px-8">
              <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                <span className="block">Ready to get started?</span>
                <span className="block bg-gradient-to-r from-blue-primary to-blue-dark bg-clip-text text-transparent">
                  Get in touch or create an account.
                </span>
              </h2>
              <div className="mt-6 space-y-4 sm:flex sm:space-y-0 sm:space-x-5">
                <div className="flex items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-blue-primary to-blue-dark bg-origin-border px-4 py-3 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700">
                  Learn more
                </div>
                <div className="flex items-center justify-center rounded-md border border-transparent bg-indigo-50 px-4 py-3 text-base font-medium text-indigo-800 shadow-sm hover:bg-indigo-100">
                  Get started
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default BecomeASeller