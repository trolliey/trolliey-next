import React, { useState, useContext } from 'react'
import GeneralLayout from './GeneralLayout'
import { StarIcon } from '@heroicons/react/outline'
import { StarIcon as SolidStarIcon } from '@heroicons/react/solid'
import { data } from '../utils/data'
import slugify from '../utils/slugify'
import { Store } from '../Context/Store'
import { Select } from '@chakra-ui/react'

const OG_IMAGE =
  'https://res.cloudinary.com/trolliey/image/upload/v1656413519/trolliey%20static%20images/home_og_image_rwubje.jpg'

interface Props {
  children: any | null
}

export default function ExploreLayout({ children }: Props) {
  const [sort_value, sortValue] = useState<any>(0)
  const [sort_order, sortOrder] = useState<any>(0)
  const [slice_number, setSliceNumber] = useState<any>(5)
  const { dispatch } = useContext(Store)

  const filter_by_price = () => {
    console.log(sort_value, sort_order)
  }

  const filter_by_category = (category: string) => {
    dispatch({ type: 'SET_SEARCH_CATEGORY', payload: category })
  }

  return (
    <GeneralLayout
      og_image={OG_IMAGE}
      og_url="explore"
      title="Explore Products"
      description="Search and buy items from our large list of products from different buyers and sellers"
    >
      <div className="mx-auto mb-8 max-w-7xl rounded bg-white p-2 md:p-8">
        <div className="top flex w-full flex-row gap-2 md:gap-8">
          <div className="hidden flex-col md:flex md:w-1/5">
            <p className="text mt-8 border-b border-blue-primary pb-4 font-semibold text-gray-700">
              Refine Search
            </p>

            {/* //filter by categories */}
            <>
              <p className="mt-4 font-bold text-gray-700">Categories</p>

              {data.categories
                .slice(0, slice_number)
                ?.map((category, index) => (
                  <div
                    key={index}
                    onClick={() => filter_by_category(slugify(category.name))}
                    className="flex cursor-pointer flex-row items-center rounded p-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  >
                    {/* <ArrowRightIcon className="text-gray-700 mr-3" height={12} width={12} /> */}
                    <p className=" text-sm capitalize ">{category.name}</p>
                    <div className="flex-1"></div>
                  </div>
                ))}
              <div
                onClick={() => setSliceNumber(slice_number + 6)}
                className="my-2 cursor-pointer text-center text-sm font-semibold text-gray-700 hover:text-gray-500"
              >
                Show more
              </div>
            </>

            {/* filter by rating  */}
            <>
              <p className="font-bold text-gray-700">Rating</p>
              <div className="p-2">
                <div className="my-2 flex cursor-pointer flex-row items-center space-x-1 font-semibold text-gray-600">
                  {[1, 2, 3, 4].map((star, index) => (
                    <SolidStarIcon
                      key={index}
                      height={20}
                      width={20}
                      className="text-yellow-500"
                    />
                  ))}
                  {[1].map((star, index) => (
                    <StarIcon
                      key={index}
                      height={20}
                      width={20}
                      className="text-yellow-500"
                    />
                  ))}
                  <p className="text-xs">& Up</p>
                </div>
                <div className="my-2 flex cursor-pointer flex-row items-center space-x-1 font-semibold text-gray-600">
                  {[1, 2, 3].map((star, index) => (
                    <SolidStarIcon
                      key={index}
                      height={20}
                      width={20}
                      className="text-yellow-500"
                    />
                  ))}
                  {[1, 2].map((star, index) => (
                    <StarIcon
                      key={index}
                      height={20}
                      width={20}
                      className="text-yellow-500"
                    />
                  ))}
                  <p className="text-xs">& Up</p>
                </div>
                <div className="my-2 flex cursor-pointer flex-row items-center space-x-1 font-semibold text-gray-600">
                  {[1, 2].map((star, index) => (
                    <SolidStarIcon
                      key={index}
                      height={20}
                      width={20}
                      className="text-yellow-500"
                    />
                  ))}
                  {[1, 2, 3].map((star, index) => (
                    <StarIcon
                      key={index}
                      height={20}
                      width={20}
                      className="text-yellow-500"
                    />
                  ))}
                  <p className="text-xs">& Up</p>
                </div>
                <div className="my-2 flex cursor-pointer flex-row items-center space-x-1 font-semibold text-gray-600">
                  {[1].map((star, index) => (
                    <SolidStarIcon
                      key={index}
                      height={20}
                      width={20}
                      className="text-yellow-500"
                    />
                  ))}
                  {[1, 2, 3, 4].map((star, index) => (
                    <StarIcon
                      key={index}
                      height={20}
                      width={20}
                      className="text-yellow-500"
                    />
                  ))}
                  <p className="text-xs">& Up</p>
                </div>
              </div>
            </>

            {/* filter by price */}
            <>
              <p className="font-bold text-gray-700">Sort By</p>
              <div className="flex flex-col space-y-4 p-2">
                <Select
                  onChange={(e) => sortValue(e.target.value)}
                  placeholder="Sort"
                >
                  <option value="price">Price</option>
                  <option value="title">Title</option>
                </Select>
                <Select
                  onChange={(e) => sortValue(e.target.value)}
                  placeholder="Sort By"
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </Select>

                <div className="flex flex-col items-end">
                  <button
                    onClick={filter_by_price}
                    className="rounded border border-blue-primary bg-white px-2 py-1 text-sm font-semibold uppercase text-blue-primary hover:bg-blue-primary hover:text-white"
                  >
                    Set Filters
                  </button>
                </div>
              </div>
            </>
          </div>
          <div className="flex-1">
            {/* <SearchInput /> */}
            {children}
          </div>
        </div>
      </div>
    </GeneralLayout>
  )
}
