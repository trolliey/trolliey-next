import { ShoppingCartIcon } from '@heroicons/react/outline'
import { StarIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { ReactElement, useContext } from 'react'
import axios from 'axios'
import { Store } from '../../Context/Store'
import { Text, useToast } from '@chakra-ui/react'

interface Props {
    picture?: string,
    rating?: number,
    description: string,
    name: string,
    discount_price?: number,
    price?: number,
    id: string,
    category: string,
    countInStock: number,
    product?: any,
    averageRating?: any
}

function ProductItem({ picture, rating, name, description, price, discount_price, id, category, product, averageRating }: Props): ReactElement {
    const history = useRouter()
    const { pathname } = useRouter()
    const { dispatch } = useContext(Store)

    // for toasy
    const toast = useToast()

    const add_to_cart = async () => {
        const { data } = await axios.get(`/api/products/${id}`)
        if (data?.countInStock <= 0) {
            toast({
                title: 'Item is out of stock.',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
            return
        }
        dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity: 1 } })
        toast({
            title: `${product?.title} added to cart.`,
            position: 'top-right',
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
    }

    return (
        <div className="cursor-pointer relative flex flex-col max-h-96 w-full flex-1 bg-white rounded overflow-hidden transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:transform-none border border-gray-100  hover:shadow-lg">
            <div onClick={() => history.push(`/product/description/${id}`)} className="relative md:h-52 h-32 overflow-hidden flex flex-col items-center rounded bg-white">
                <Image objectFit='cover' src={picture ? picture : ''} layout="fill" alt="product" className="flex-1 max-h-full flex-shrink-0 object-cover w-auto h-full rounded" />
            </div>
            <div className="px-2">
                <div onClick={() => history.push(`/product/description/${id}`)} className="star flex flex-row items-center md:mt-2 mt-1">

                    {
                        pathname === '/' ? (
                            null
                        ) : (
                                <div className="star-rating gap-1 flex flex-row ">
                                    {[...Array(Math.floor(averageRating ? averageRating : 0))].map((star, index) => (
                                        <span key={index} className="star">
                                            <StarIcon className="text-yellow-400" height={16} width={16} />
                                        </span>
                                    ))}
                                </div>
                            )
                    }
                </div>
                <div onClick={() => history.push(`/product/description/${id}`)} className="flex-1 overflow-hidden">
                    <Text noOfLines={1} className="text-gray-500 text-sm ">{name}</Text>
                    <Text noOfLines={1} className="text-sm text-gray-700 my-1 font-semibold">{category}</Text>
                </div>


                <div className="mb-12"></div>
                {/* //price */}
                <div className="absolute bottom-0 w-full pb-2">
                    {/* <p className='text-gray-500 text-sm'>Price:</p> */}
                    <div className="flex flex-row items-center justify-between">
                        {
                            discount_price ? (
                                <div onClick={() => history.push(`/product/description/${id}`)} className="flex flex-row items-center">
                                    <p className="text-gray-900 font-bold mr-2">${discount_price ? discount_price : price}</p>
                                    {
                                        discount_price && (
                                            <p className="line-through text-gray-400 text-sm">${price}</p>
                                        )
                                    }
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