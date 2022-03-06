import React from 'react'
import ProductItem from '../ProductItem/ProductItem'
import { ArrowRightIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import ProductLoading from '../ProductItem/ProductLoading'

interface Props {
    products?: any | null,
    query?: any | null,
    cols?: string,
    no_text?: any,
    loading?: boolean
}

function AllProducts({ products, query, cols, no_text, loading }: Props) {
    const history = useRouter()

    return (
        <div className="flex flex-col w-full bg-white p-4 mb-8">
            {
                !no_text && (
                    <div className="md:text-lg text-sm pb-4 flex flex-row items-center justify-between">
                        <p className="font-semibold text-gray-700 capitalize ">{query ? query : 'all products'}</p>
                        <div onClick={() => history.push('/explore')} className="text-new-primary capitalize font-semibold flex flex-row items-center cursor-pointer hover:text-new-light">
                            View all
                    <ArrowRightIcon height={16} width={16} className="ml-2" />
                        </div>
                    </div>
                )
            }
            {
                loading ? (
                    <div className={`${cols ? cols : "lg:grid-cols-5 md:grid-cols-4 grid-cols-2"} grid w-full md:gap-8 gap-4 mx-auto  rounded-lg`} >
                        {[1,2,3,4,5]?.map((product: any, index: number) => (
                            <div key={index} className="p-0 col-span-1">
                                <ProductLoading />
                            </div>
                        ))}
                    </div>
                ) : (
                        <div className={`${cols ? cols : "lg:grid-cols-5 md:grid-cols-4 grid-cols-2"} grid w-full md:gap-8 gap-4 mx-auto  rounded-lg`} >
                            {products?.map((product: any, index: number) => (
                                <div key={index} className="p-0 col-span-1">
                                    <ProductItem
                                        name={product.title}
                                        description={product.description}
                                        rating={product.rating}
                                        picture={product.pictures[0]}
                                        price={product.price}
                                        discount_price={product.discount_price}
                                        category={product.category}
                                        id={product._id}
                                        countInStock={product.countInStock}
                                        product={product}
                                        averageRating={product.averageRating}
                                    />
                                </div>
                            ))}
                        </div>
                    )
            }
        </div>
    )
}

export default AllProducts
