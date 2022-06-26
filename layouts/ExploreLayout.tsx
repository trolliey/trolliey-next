import React, { useState, useContext } from 'react'
import GeneralLayout from './GeneralLayout'
import { StarIcon } from '@heroicons/react/outline'
import { StarIcon as SolidStarIcon } from '@heroicons/react/solid'
import { data } from '../utils/data'
import slugify from '../utils/slugify'
import { Store } from '../Context/Store'
import { Select } from '@chakra-ui/react'

interface Props{
    children: any | null
}

export default function ExploreLayout({children}:Props){
    const [sort_value, sortValue] = useState<any>(0)
    const [sort_order, sortOrder] = useState<any>(0)
    const [slice_number, setSliceNumber] = useState<any>(5)
    const { dispatch } = useContext(Store)

    const filter_by_price = () => {
        console.log(sort_value, sort_order)
    }

    const filter_by_category = (category:string) => {
        dispatch({ type: 'SET_SEARCH_CATEGORY', payload: category })
    }

    return(
        <GeneralLayout  title="Explore Products" description="Buy and sell items in Zimbabwe from Trolliey">
            <div className="bg-white md:p-8 p-2 rounded max-w-7xl mx-auto mb-8">
                <div className="top w-full flex flex-row md:gap-8 gap-2">
                    <div className="md:w-1/5 md:flex flex-col hidden">
                        <p className="text text-gray-700 mt-8 font-semibold pb-4 border-b border-blue-primary">Refine Search</p>

                        {/* //filter by categories */}
                        <>
                            <p className="text-gray-700 font-bold mt-4">Categories</p>

                            {
                                data.categories.slice(0, slice_number)?.map((category, index) => (
                                    <div key={index} onClick={() => filter_by_category(slugify(category.name))} className="flex text-gray-700 hover:text-gray-900 flex-row items-center p-2 cursor-pointer hover:bg-gray-50 rounded">
                                        {/* <ArrowRightIcon className="text-gray-700 mr-3" height={12} width={12} /> */}
                                        <p className=" text-sm capitalize ">{category.name}</p>
                                        <div className="flex-1"></div>
                                    </div>
                                ))
                            }
                            <div onClick={() => setSliceNumber(slice_number + 6)} className="font-semibold text-center text-sm text-gray-700 my-2 cursor-pointer hover:text-gray-500">Show more</div>

                        </>

                        {/* filter by rating  */}
                        <>
                            <p className="text-gray-700 font-bold">Rating</p>
                            <div className="p-2">
                                <div className="flex flex-row space-x-1 cursor-pointer items-center my-2 font-semibold text-gray-600">
                                    {[1, 2, 3, 4].map((star, index) => (
                                        <SolidStarIcon key={index} height={20} width={20} className="text-yellow-500" />
                                    ))}
                                    {[1].map((star, index) => (
                                        <StarIcon key={index} height={20} width={20} className="text-yellow-500" />
                                    ))}
                                    <p className="text-xs">& Up</p>
                                </div>
                                <div className="flex flex-row space-x-1 cursor-pointer items-center my-2 font-semibold text-gray-600">
                                    {[1, 2, 3].map((star, index) => (
                                        <SolidStarIcon key={index} height={20} width={20} className="text-yellow-500" />
                                    ))}
                                    {[1, 2].map((star, index) => (
                                        <StarIcon key={index} height={20} width={20} className="text-yellow-500" />
                                    ))}
                                    <p className="text-xs">& Up</p>
                                </div>
                                <div className="flex flex-row space-x-1 cursor-pointer items-center my-2 font-semibold text-gray-600">
                                    {[1, 2].map((star, index) => (
                                        <SolidStarIcon key={index} height={20} width={20} className="text-yellow-500" />
                                    ))}
                                    {[1, 2, 3].map((star, index) => (
                                        <StarIcon key={index} height={20} width={20} className="text-yellow-500" />
                                    ))}
                                    <p className="text-xs">& Up</p>
                                </div>
                                <div className="flex flex-row space-x-1 cursor-pointer items-center my-2 font-semibold text-gray-600">
                                    {[1].map((star, index) => (
                                        <SolidStarIcon key={index} height={20} width={20} className="text-yellow-500" />
                                    ))}
                                    {[1, 2, 3, 4].map((star, index) => (
                                        <StarIcon key={index} height={20} width={20} className="text-yellow-500" />
                                    ))}
                                    <p className="text-xs">& Up</p>
                                </div>
                            </div>
                        </>

                        {/* filter by price */}
                        <>
                            <p className="text-gray-700 font-bold">Sort By</p>
                            <div className="p-2 flex flex-col space-y-4">
                                <Select onChange={(e) => sortValue(e.target.value)} placeholder='Sort'>
                                    <option value="price">Price</option>
                                    <option value="title">Title</option>
                                </Select>
                                <Select onChange={(e) => sortValue(e.target.value)} placeholder='Sort By'>
                                    <option value="asc">Ascending</option>
                                    <option value="desc">Descending</option>
                                </Select>
                              
                                <div className="flex flex-col items-end">
                                    <button onClick={filter_by_price} className="text-sm border bg-white hover:bg-blue-primary hover:text-white border-blue-primary rounded text-blue-primary font-semibold px-2 py-1 uppercase">Set Filters</button>
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