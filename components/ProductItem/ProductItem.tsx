import { ShoppingCartIcon, StarIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'

interface Props {
    picture?: string,
    rating?: number,
    description: string,
    name: string,
    discount_price?: number,
    price?: number,
    id: string,
    category: string
}

function ProductItem({ picture, rating, name, description, price, discount_price, id, category }: Props): ReactElement {
    const history = useRouter()
    const { pathname } = useRouter()

    const add_to_cart =() =>{
        console.log('added item to cart')
    }

    return (
        <div className="cursor-pointer shadow relative flex flex-col max-h-96 w-full flex-1 bg-white rounded overflow-hidden transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:transform-none border border-gray-100  hover:shadow-lg">
            <div onClick={() => history.push(`/product/description/${id}`)} className="relative md:h-52 h-32 overflow-hidden flex flex-col items-center rounded bg-white">
                <Image objectFit='cover' src={picture ? picture : ''} layout="fill" alt="product" className="flex-1 max-h-full flex-shrink-0 object-cover w-auto h-full rounded" />
            </div>
            <div className="px-2">
                <div onClick={() => history.push(`/product/description/${id}`)} className="star flex flex-row items-center md:mt-2 mt-1">
                    {/* {
                rating?.map((rate, index) => (
                    <StarIcon key={index} className="text-yellow-400" height={16} width={16} />
                ))
            } */}
                    {
                        pathname === '/' ? (
                            null
                        ) : (
                            <div className="star-rating gap-1 flex flex-row ">
                                {[...Array(Math.floor(rating ? rating :0))].map((star, index) => (
                                    <span key={index} className="star">
                                        <StarIcon className="text-yellow-400" height={16} width={16} />
                                    </span>
                                ))}
                            </div>
                        )
                    }
                </div>
                <div onClick={() => history.push(`/product/description/${id}`)} className="flex-1 overflow-ellipsis overflow-hidden">
                    <p className="text-gray-500 text-sm ">{name}</p>
                    <p className="line-clamp-1 text-sm text-gray-700 my-1 overflow-ellipsis font-semibold">{category}</p>
                </div>


                <div className="mb-12"></div>
                {/* //price */}
                <div className="absolute bottom-0 w-full pb-2">
                    {/* <p className='text-gray-500 text-sm'>Price:</p> */}
                    <div className="flex flex-row items-center justify-between">
                        {
                            discount_price ? (
                                <div onClick={() => history.push(`/product/description/${id}`)} className="flex flex-row items-center">
                                    <p className="text-gray-900 font-bold mr-2">${price ? price : 0 - discount_price}</p>
                                    <p className="line-through text-gray-400 text-sm">${price}</p>
                                </div>
                            ) : (
                                <div onClick={() => history.push(`/product/description/${id}`)} className="flex flex-row items-center">
                                    <p className="text-gray-900 font-bold mr-2">${price}</p>
                                </div>
                            )
                        }

                        {
                            pathname !== '/' ? (
                                <div onClick={add_to_cart} className=" mb-2 text-xs p-2 rounded-full bg-blue-primary hover:bg-blue-dark font-semibold text-center capitalize text-white mr-4">
                                    {/* <BlueButton text="add to cart" onClick={add_to_cart} /> */}
                                    <ShoppingCartIcon height={16} width={16} />
                                </div>
                            ) : <div className=" mb-2 text-xs font-semibold text-center capitalize mr-4 flex flex-row items-center">
                                <StarIcon className="text-yellow-400 font-semibold" height={20} width={20} />
                                <p>{Math.floor(rating ? rating : 0)}(5)</p>
                            </div>
                        }
                    </div>

                </div>



            </div>
        </div>
    )
}

export default ProductItem