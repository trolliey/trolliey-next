import React, { ReactFragment } from 'react'
import GeneralLayout from '../layouts/GeneralLayout'
import Products from '../models/Product'
import { connect, convertDocToObj, disconnect } from '../utils/mongo'
import Courosel from '../components/Carousel/Carousel'
import promo_1 from '../public/img/promo_1.png'
import promo_2 from '../public/img/fregrance_sale.png'
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


function Home(props: any): ReactFragment {
  const history = useRouter()
  const { products } = props

  const banner_images = [
    { body: '', image: promo_1 },
    { body: '', image: promo_2 },
    { body: '', image: promo_1 }
  ]

  if (!products) {
    return (
      <div>no products to show at the moment</div>
    )
  }

  const search_by_category = (category: string) => {
    console.log(category)
    history.push('/explore')
  }

  var randomItem = data.categories[Math.floor(Math.random() * data.categories.length)];

  return (
    <GeneralLayout title='Home page' description='Buy more, Spend Less'>
      {/* <h1>Products</h1> */}
      <div className="min-h-screen container max-w-7xl">
        <div className="top w-full flex flex-row md:gap-8 gap-2 bg-white md:p-8 rounded md:px-4 px-0  md:py-4 py-0 mb-8">
          <div className="md:w-1/5 md:flex hidden">
            <CategoriesDropdown />
          </div>
          <div className="flex-1">

            <div className='flex flex-col'>
              <div className="z-0 overflow-hidden w-full  h-auto bg-gray-100 md:mb-4 mb-2">
                <div className="z-0 grid content-center items-center overflow-hidden rounded w-full  bg-white">
                  {/* <img src={banner} alt="banner showing ads for the home page" className="flex-1 max-h-full flex-shrink-0 object-cover w-auto h-auto" /> */}
                  <Courosel data={banner_images} />
                </div>
              </div>
              <div className="flex flex-col my-auto">
                <p className='text-gray-900 font-semibold capitalize md:mb-8 mb-2 md:text-lg text-xs md:flex hidden'>Featured Brands</p>
                <div className="brands flex flex-row items-center justify-between overflow-auto md:px-8 px-2 md:py-0 py-2 gap-4">
                  <div className="relative md:h-6 h-4 md:w-16 w-10">
                    <Image src={samsung} alt="" layout='fill' />
                  </div>
                  <div className="relative md:h-6 h-4 md:w-16 w-10">
                    <Image src={defy} alt="" layout='fill' />
                  </div>
                  <div className="relative md:h-6 h-4 md:w-16 w-10">
                    <Image src={kenwood} alt="" layout='fill' />
                  </div>
                  <div className="relative md:h-6 h-4 md:w-16 w-10">
                    <Image src={dell} alt="" layout='fill' />
                  </div>
                  <div className="relative md:h-6 h-4 md:w-16 w-10">
                    <Image src={oppo} alt="" layout='fill' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* // featured products */}
        <>
          <FeaturedProducts products={products} />
        </>
        <section aria-labelledby="category-heading" className="my-8">
          <div className="max-w-7xl mx-auto bg-white md:p-8 p-4 rounded">
            <div className="sm:flex sm:items-baseline sm:justify-between">
              <h2 id="category-heading" className="md:text-xl text-base font-bold tracking-tight text-gray-700">
                Shop by Category
              </h2>
              <a href="/categories" className="hidden font-semibold text-blue-primary hover:text-blue-primary sm:block">
                Browse all categories<span aria-hidden="true"> &rarr;</span>
              </a>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8 ">
              <div onClick={() => search_by_category(randomItem.value)} className="group aspect-w-2 aspect-h-1 rounded-lg overflow-hidden sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:transform-none border">
                <Image
                  layout='responsive'
                  objectFit='contain'
                  src={surprise}
                  alt="suprised user."
                  className="object-center object-cover group-hover:opacity-75"
                />
                <div aria-hidden="true" className="bg-gradient-to-b from-transparent to-black opacity-50" />
                <div className="p-6 flex items-end">
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
              <div onClick={() => search_by_category('tech')} className="group aspect-w-2 aspect-h-1 rounded-lg overflow-hidden sm:relative sm:aspect-none sm:h-full transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:transform-none border">
                <Image
                  layout='fill'
                  src={tech_stuff}
                  alt="tech category."
                  className="object-center object-cover group-hover:opacity-75 sm:absolute sm:inset-0 sm:w-full sm:h-full"
                />
                <div
                  aria-hidden="true"
                  className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
                />
                <div className="p-6 flex items-end sm:absolute sm:inset-0">
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
              <div onClick={() => search_by_category('Fashion-And-Luggage')} className="group aspect-w-2 aspect-h-1 rounded-lg overflow-hidden sm:relative sm:aspect-none sm:h-full transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:transform-none border">
                <Image
                  layout='fill'
                  src={clothes}
                  alt="Clothes and fashion"
                  className="object-center object-cover group-hover:opacity-75 sm:absolute sm:inset-0 sm:w-full sm:h-full"
                />
                <div
                  aria-hidden="true"
                  className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
                />
                <div className="p-6 flex items-end sm:absolute sm:inset-0">
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
              <a href="/categories" className="block font-semibold text-blue-primary hover:text-blue-primary">
                Browse all categories<span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
          </div>
        </section>

        {/* // featured products */}
        <>
          <AllProducts products={products} />
        </>

      </div>
    </GeneralLayout>
  )
}

export async function getServerSideProps(context: any) {
  await connect()
  const products = await Products.find({}).lean()
  await disconnect()
  return {
    props: {
      //@ts-ignore
      products: products?.map(convertDocToObj)
    }
  }
}

export default Home