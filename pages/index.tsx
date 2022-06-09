import React, { ReactFragment, useEffect, useContext, useState } from 'react'
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
import useSWR from "swr";

function Home(): ReactFragment {
  const history = useRouter()
  const { state, dispatch } = useContext(Store)
  const address = `/api/products?page=${1}`;
  const fetcher = async (url:any) => await axios.post(url).then((res) => res.data);
  const { data:products, error } = useSWR(address, fetcher);

  const search_by_category = (category: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: category })
    history.push('/explore')
  }

  var randomItem =
    data.categories[Math.floor(Math.random() * data.categories.length)]

  return (
    <GeneralLayout title="Home Page" description="Buy more. Spend Less">
      {/* <h1>Products</h1> */}
      <div className="container min-h-screen max-w-7xl">
        <div className="top mb-8 flex w-full flex-row gap-2 rounded bg-white px-0 py-0 md:gap-8  md:p-8 md:px-4 md:py-4">
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
                <p className="mb-2 hidden text-xs font-semibold capitalize text-gray-900 md:mb-8 md:flex md:text-lg">
                  Featured Brands
                </p>
                <div className="brands flex flex-row items-center justify-between gap-4 overflow-auto px-2 py-2 md:px-8 md:py-0">
                  <div className="relative h-4 w-10 md:h-6 md:w-16">
                    <Image src={samsung} alt="" layout="fill" />
                  </div>
                  <div className="relative h-4 w-10 md:h-6 md:w-16">
                    <Image src={defy} alt="" layout="fill" />
                  </div>
                  <div className="relative h-4 w-10 md:h-6 md:w-16">
                    <Image src={kenwood} alt="" layout="fill" />
                  </div>
                  <div className="relative h-4 w-10 md:h-6 md:w-16">
                    <Image src={dell} alt="" layout="fill" />
                  </div>
                  <div className="relative h-4 w-10 md:h-6 md:w-16">
                    <Image src={oppo} alt="" layout="fill" />
                  </div>
                  <div className="relative h-4 w-10 md:h-6 md:w-16">
                    <Image src={oppo} alt="" layout="fill" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* // featured products */}
        <>
          <FeaturedProducts/>
        </>
        <section aria-labelledby="category-heading" className="my-8">
          <div className="mx-auto max-w-7xl rounded bg-white p-4 md:p-8">
            <div className="sm:flex sm:items-baseline sm:justify-between">
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

            <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8 ">
              <div
                onClick={() => search_by_category(randomItem.value)}
                className="group aspect-w-2 aspect-h-1 sm:aspect-h-1 cursor-pointer sm:aspect-w-1 relative h-40 transform overflow-hidden rounded-lg border transition hover:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none sm:row-span-2 md:h-96"
              >
                <Image
                  layout="fill"
                  objectFit="cover"
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
                className="group aspect-w-2 aspect-h-1 cursor-pointer sm:aspect-none transform overflow-hidden rounded-lg border transition hover:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none sm:relative sm:h-full"
              >
                <Image
                  layout="fill"
                  src={tech_stuff}
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
                className="group aspect-w-2 aspect-h-1 cursor-pointer sm:aspect-none transform overflow-hidden rounded-lg border transition hover:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none sm:relative sm:h-full"
              >
                <Image
                  layout="fill"
                  src={clothes}
                  alt="Clothes and fashion"
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
    </GeneralLayout>
  )
}

export default Home
