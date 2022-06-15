import React, { ReactFragment, useContext, useState } from 'react'
import GeneralLayout from '../layouts/GeneralLayout'
import Courosel from '../components/Carousel/Carousel'
import CategoriesDropdown from '../components/Dropdowns/CategoriesDropdown'
import samsung from '../public/img/samsung.svg'
import defy from '../public/img/defy.svg'
import kenwood from '../public/img/kenwood-logo.svg'
import dell from '../public/img/dell-logo.svg'
import oppo from '../public/img/oppo-logo.svg'
import Image from 'next/image'
import surprise from '../public/img/surprise.jpg'
import tech_stuff from '../public/img/tech_stuff.jpg'
import clothes from '../public/img/clothes.jpg'
import FeaturedProducts from '../components/HomeSections/FeaturedProducts'
import { useRouter } from 'next/router'
import { data } from '../utils/data'
import AllProducts from '../components/HomeSections/AllProducts'
import axios from 'axios'
import { Store } from '../Context/Store'
import useSWR from 'swr'
import GeneralNavbar from '../components/Navigations/GeneralNavbar'
import { useWindowScrollPositions } from '../hooks/useWindowScrollPosition'
import Footer from '../components/Navigations/Footer'
import { Text } from '@chakra-ui/react'
import Link from 'next/link'

function Home(): ReactFragment {
  const history = useRouter()
  const { dispatch } = useContext(Store)
  const address = `/api/products?page=${1}`
  const fetcher = async (url: any) =>
    await axios.post(url).then((res) => res.data)
  const { data: products, error } = useSWR(address, fetcher)
  const [close_message, setCloseMessage] = useState(false)

  const search_by_category = (category: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: category })
    history.push('/explore')
  }
  const { scrollX, scrollY } = useWindowScrollPositions()

  var randomItem =
    data.categories[Math.floor(Math.random() * data.categories.length)]

  return (
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
            <div className="flex-1">
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
                  <div className="brands flex flex-row items-center justify-between gap-4 overflow-auto px-2 py-2 md:px-8 md:py-0">
                    <div className="relative h-4 w-10 md:h-6 md:w-16">
                      <Image
                        quality={50}
                        loading="eager"
                        src={samsung}
                        alt=""
                        layout="fill"
                      />
                    </div>
                    <div className="relative h-4 w-10 md:h-6 md:w-16">
                      <Image
                        quality={50}
                        loading="eager"
                        src={defy}
                        alt=""
                        layout="fill"
                      />
                    </div>
                    <div className="relative h-4 w-10 md:h-6 md:w-16">
                      <Image
                        quality={50}
                        loading="eager"
                        src={kenwood}
                        alt=""
                        layout="fill"
                      />
                    </div>
                    <div className="relative h-4 w-10 md:h-6 md:w-16">
                      <Image
                        quality={50}
                        loading="eager"
                        src={dell}
                        alt=""
                        layout="fill"
                      />
                    </div>
                    <div className="relative h-4 w-10 md:h-6 md:w-16">
                      <Image
                        quality={50}
                        loading="eager"
                        src={oppo}
                        alt=""
                        layout="fill"
                      />
                    </div>
                    <div className="relative h-4 w-10 md:h-6 md:w-16">
                      <Image
                        quality={50}
                        loading="eager"
                        src={oppo}
                        alt=""
                        layout="fill"
                      />
                    </div>
                  </div>
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
                <div className="sm:flex sm:items-baseline sm:justify-between pb-4">
                  <h2
                    id="category-heading"
                    className="text-base font-bold tracking-tight text-gray-700 md:text-xl"
                  >
                    Shop by Category
                  </h2>
                  <a
                    href="/categories"
                    className="hidden font-semibold text-blue-primary hover:text-blue-primary sm:block"
                  >
                    Browse all categories<span aria-hidden="true"> &rarr;</span>
                  </a>
                </div>

                {/* <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8 ">
                <div
                  onClick={() => search_by_category(randomItem.value)}
                  className="group aspect-w-2 aspect-h-1 sm:aspect-h-1 sm:aspect-w-1 relative h-40 transform cursor-pointer overflow-hidden rounded-lg border transition hover:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none sm:row-span-2 md:h-96"
                >
                  <Image
                    layout="fill"
                    objectFit="cover"
                    placeholder="blur"
                    quality={50}
                    loading='eager'
                    src={surprise}
                    alt="suprised user."
                    className="object-cover object-center group-hover:opacity-75"
                  />
                  <div
                    aria-hidden="true"
                    className="bg-gradient-to-b from-transparent to-black opacity-50"
                  />
                  <div className="flex items-end p-6">
                    <div>
                      <h3 className="font-semibold text-white">
                        <span>
                          <span className="absolute inset-0" />
                          Suprise Me
                        </span>
                      </h3>
                      <p aria-hidden="true" className="mt-1 text-sm text-white">
                        Shop now
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => search_by_category('tech')}
                  className="group aspect-w-2 aspect-h-1 sm:aspect-none transform cursor-pointer overflow-hidden rounded-lg border transition hover:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none sm:relative sm:h-full"
                >
                  <Image
                    layout="fill"
                    src={tech_stuff}
                    placeholder="blur"
                    quality={50}
                    loading='eager'
                    alt="tech category."
                    className="object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full"
                  />
                  <div
                    aria-hidden="true"
                    className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
                  />
                  <div className="flex items-end p-6 sm:absolute sm:inset-0">
                    <div>
                      <h3 className="font-semibold text-white">
                        <span>
                          <span className="absolute inset-0" />
                          Tech Stuff
                        </span>
                      </h3>
                      <p aria-hidden="true" className="mt-1 text-sm text-white">
                        Shop now
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => search_by_category('Fashion-And-Luggage')}
                  className="group aspect-w-2 aspect-h-1 sm:aspect-none transform cursor-pointer overflow-hidden rounded-lg border transition hover:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none sm:relative sm:h-full"
                >
                  <Image
                    layout="fill"
                    src={clothes}
                    alt="Clothes and fashion"
                    quality={50}
                    placeholder="blur"
                    loading='eager'
                    className="object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full"
                  />
                  <div
                    aria-hidden="true"
                    className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
                  />
                  <div className="flex items-end p-6 sm:absolute sm:inset-0">
                    <div>
                      <h3 className="font-semibold text-white">
                        <div>
                          <span className="absolute inset-0" />
                          Clothes and fashion
                        </div>
                      </h3>
                      <p aria-hidden="true" className="mt-1 text-sm text-white">
                        Shop now
                      </p>
                    </div>
                  </div>
                </div>
              </div> */}
                <div className="scrollbar-hide relative mx-auto flex md:space-x-4 space-x-2 overflow-x-auto">
                  {data.categories.map((category, index) => (
                    <div
                    className={`relative w-full transition hover:-translate-y-1 hover:shadow-lg motion-reduce:transform-none  motion-reduce:transition-none`}
                  >
                    <div onClick={() => search_by_category(category.name)}>
                      <div className="relative flex h-36 w-36 flex-col items-center overflow-hidden rounded bg-white md:h-52 md:w-52">
                        <Image
                          objectFit="cover"
                          src={category.icon ? category.icon : ''}
                          layout="fill"
                          quality={50}
                          placeholder="blur"
                          blurDataURL={category.icon}
                          alt="product"
                          className="h-full max-h-full w-auto flex-1 flex-shrink-0 rounded object-cover"
                        />
                      </div>
                    </div>
                    <div className="px-4">
                     
                      <div
                        className="flex-1 overflow-hidden"
                      >
                       
                        <Text
                          noOfLines={2}
                          className="my-1 text-sm font-semibold text-gray-700"
                        >
                          {category.name}
                        </Text>
                      </div>
              
                      
                    </div>
                  </div>
                  ))}
                </div>

                <div className="mt-6 sm:hidden">
                  <a
                    href="/categories"
                    className="block font-semibold text-blue-primary hover:text-blue-primary"
                  >
                    Browse all categories<span aria-hidden="true"> &rarr;</span>
                  </a>
                </div>
              </div>
            </section>

            {/* // featured products */}
            <>
              <AllProducts products={products} loading={!data} error={error} />
            </>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home
