import React, { ReactFragment, useContext, useState } from 'react'
import Courosel from '../components/Carousel/Carousel'
import CategoriesDropdown from '../components/Dropdowns/CategoriesDropdown'
import Image from 'next/image'
import FeaturedProducts from '../components/HomeSections/FeaturedProducts'
import { useRouter } from 'next/router'
import { data } from '../utils/data'
import AllProducts from '../components/HomeSections/AllProducts'
import { Store } from '../Context/Store'
import GeneralNavbar from '../components/Navigations/GeneralNavbar'
import { useWindowScrollPositions } from '../hooks/useWindowScrollPosition'
import Footer from '../components/Navigations/Footer'
import { Text } from '@chakra-ui/react'
import slugify from '../utils/slugify'
import Head from 'next/head'
import ScrollingLogoSection from '../components/SrollingLogoSection/ScrollingLogoSection'

const OG_IMAGE = 'https://res.cloudinary.com/trolliey/image/upload/v1656413519/trolliey%20static%20images/home_og_image_rwubje.jpg'

function Home(): ReactFragment {
  const history = useRouter()
  const { dispatch } = useContext(Store)
  const [close_message, setCloseMessage] = useState(false)

  const search_by_category = (category: string) => {
    dispatch({ type: 'SET_SEARCH_CATEGORY', payload: slugify(category) })
    history.push('/explore')
  }
  
  const { scrollY } = useWindowScrollPositions()

  return (
    <>
    <Head>
        <title>{`Trolliey Online Retail`}</title>
        <meta
          name="description"
          content={data.site_description}
        />
        <meta property="og:type" content="website" />
        <meta
          name="og:title"
          property="og:title"
          content={`Trolliey Online Retail`}
        />
        <meta
          name="og:description"
          property="og:description"
          content={data.site_description}
        />
        <meta property="og:site_name" content={'Trolliey Retail'} />
        <meta property="og:url" content={`${data.site_url}/`} />
        <meta
          property="og:image"
          content={OG_IMAGE}
        />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content={`Trolliey | Buy and Sell Items Online`}
        />
        <meta
          name="twitter:description"
          content={data.site_description}
        />
        <meta name="twitter:site" content="" />
        <meta name="twitter:creator" content="" />
        {/* <link rel=”shortcut icon” href=”/icon.png" type=”image/x-icon” /> */}
        <link rel="shortcut icon" href="/images/icon.png" type="image/x-icon" />
        <link rel="icon" type="image/png" href="/images/icon.png" />
        <link rel="apple-touch-icon" href="/images/icon.png" />
        <meta name="twitter:image" content={OG_IMAGE} />
        <link rel="canonical" href={`${data.site_url}/`} />
      </Head>
      <div className="flex w-full flex-col  overflow-scroll bg-gradient-to-b from-blue-superlight via-gray-100 to-gray-100">
      <div className="nav">
        <GeneralNavbar
          setCloseMessage={setCloseMessage}
          close_message={close_message}
          scrollY={scrollY}
          component_above_navbar
        />
      </div>
      <div className="flex w-full flex-col">
        <div
          className={`${
            !close_message ? 'pt-24 md:pt-32 ' : 'pt-12 md:pt-16 '
          }`}
        >
          <div className="mx-auto hidden w-full max-w-7xl grid-cols-1 items-center gap-4 py-4 md:grid md:grid-cols-2 md:py-4 lg:grid-cols-4 ">
            {data.benefits.map((benefit, index) => (
              <div
                key={index}
                className="col-span-1 mx-auto flex cursor-pointer flex-col items-center border-b border-blue-dark pb-4 text-blue-dark hover:text-new-primary md:flex-row md:border-none md:pb-0"
              >
                <div className="hidden md:block">
                  <benefit.icon height={32} width={32} className="mr-2" />
                </div>
                <div className="mb-1 block md:hidden">
                  <benefit.icon height={24} width={24} className="mr-2" />
                </div>
                <div className="flex flex-col items-center md:items-start">
                  <p className="font-semibold capitalize text-blue-dark">
                    {benefit.heading}
                  </p>
                  <p className="text-sm capitalize text-gray-700">
                    {benefit.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <h1>Products</h1> */}
        <div className="container mx-auto min-h-screen max-w-7xl pt-4 md:pt-0">
          <div className="top mb-8 flex w-full flex-row gap-2 rounded-lg bg-white px-0 py-0 md:gap-8  md:p-8 md:px-4 md:py-4">
            <div className="hidden md:flex md:w-1/5">
              <CategoriesDropdown />
            </div>
            <div className="flex-1 overflow-hidden pb-4">
              <div className="flex flex-col">
                <div className="z-0 mb-2 h-auto  w-full overflow-hidden bg-gray-100 md:mb-4">
                  <div className="z-0 grid w-full content-center items-center overflow-hidden rounded  bg-white">
                    <Courosel data={data?.banner_images} />
                  </div>
                </div>
                <div className="my-auto flex flex-col">
                  <h1 className="mb-2 hidden text-xs font-semibold capitalize text-gray-900 md:mb-8 md:flex md:text-lg">
                    Featured Brands
                  </h1>
                  <ScrollingLogoSection />
                </div>
              </div>
            </div>
          </div>

          <div className="section px-2 md:px-0">
            {/* // featured products */}
            <>
              <FeaturedProducts />
            </>
            <section aria-labelledby="category-heading" className="my-8">
              <div className="mx-auto max-w-7xl rounded bg-white p-4 md:p-8">
                <div className="flex flex-row items-center justify-between pb-4">
                  <h2
                    id="category-heading"
                    className="text-base font-bold tracking-tight text-gray-700 md:text-xl"
                  >
                    Shop by Category
                  </h2>
                  <div className="">
                    <a
                      href="/categories"
                      className="block font-semibold text-blue-primary hover:text-blue-primary"
                    >
                      Browse all<span aria-hidden="true"></span>
                    </a>
                  </div>
                </div>

                <div className="scrollbar-hide relative mx-auto flex space-x-2 overflow-x-auto md:space-x-4">
                  {data.categories.map((category, index) => (
                    <div
                      key={`${category.value}-${index}`}
                      className={`relative w-full transition hover:-translate-y-1 hover:shadow-lg motion-reduce:transform-none  motion-reduce:transition-none`}
                    >
                      <div onClick={() => search_by_category(category.name)}>
                        <div className="relative flex h-36 w-36 flex-col items-center overflow-hidden rounded bg-white md:h-52 md:w-52">
                          <Image
                            objectFit="cover"
                            src={category.icon ? category.icon : ''}
                            layout="fill"
                            loading="eager"
                            quality={50}
                            placeholder="blur"
                            blurDataURL={category.icon}
                            alt="product"
                            className="h-full max-h-full w-auto flex-1 flex-shrink-0 rounded object-cover"
                          />
                        </div>
                      </div>
                      <div className="px-4">
                        <div className="flex-1 overflow-hidden">
                          <Text
                            noOfLines={2}
                            className="my-1 text-center text-sm font-semibold text-gray-700"
                          >
                            {category.name}
                          </Text>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* // featured products */}
            <>
              <AllProducts />
            </>
          </div>
        </div>
      </div>
      <Footer />
    </div>
    </>
  )
}

export default Home
