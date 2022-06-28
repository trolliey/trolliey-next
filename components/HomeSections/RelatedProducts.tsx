import React, { useEffect, useState, ReactElement, useContext } from 'react'
import { ArrowRightIcon } from '@heroicons/react/outline'
import { Store } from '../../Context/Store'
import { useRouter } from 'next/router'
import axios from 'axios'
import { getError } from '../../utils/error'
import ProductLoading from '../ProductItem/ProductLoading'
import ProductItem from '../ProductItem/ProductItem'
import slugify from '../../utils/slugify'

interface Props {
    cols?: any,
    no_text?: any,
    category?: any
}

function RelatedProducts({ cols, no_text, category }: Props): ReactElement {
    const { dispatch } = useContext(Store)
    const history = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [products, setProducts] = useState<any>()

    useEffect(() => {
        setLoading(true)
        const get_related = async () => {
            try {
                const { data } = await axios.post(`/api/products?page=${1}&category=${slugify(category)}&page=${1}`, {
                    query: category
                })
                setLoading(false)
                setProducts(data?.products)
            } catch (error) {
                setLoading(false)
                setError(getError(error))
            }
        }
        get_related()
    }, [category, dispatch])

    return (
        <div className="items flex-col bg-white rounded md:px-8 px-4 w-full pb-8">
            <div className="md:text-lg text-sm md:py-8 py-4 flex flex-row items-center justify-between">
                <p className="font-semibold text-gray-700 capitalize ">related products - {(category)}</p>
                {!no_text && <div onClick={() => history.push('/explore')} className="text-new-primary capitalize font-semibold flex flex-row items-center cursor-pointer hover:text-new-light">
                    View all
                    <ArrowRightIcon height={16} width={16} className="ml-2" />
                </div>}
            </div>
            <div className="w-full">
                {
                    loading ? (
                        <>
              <div
              className={`${
                cols ? cols : 'grid-cols-2 md:grid-cols-4 lg:grid-cols-5'
              } mx-auto md:grid hidden w-full gap-4 rounded-lg  md:gap-8`}
            >
              {[1, 2, 3, 4, 5]?.map((product: any, index: number) => (
                <div key={index} className="col-span-1 p-0">
                  <ProductLoading />
                </div>
              ))}
            </div>
            <div
              className={`${
                cols ? cols : 'grid-cols-2 md:grid-cols-4 lg:grid-cols-5'
              } mx-auto md:hidden grid w-full gap-4 rounded-lg  md:gap-8`}
            >
              {[1, 2]?.map((product: any, index: number) => (
                <div key={index} className="col-span-1 p-0">
                  <ProductLoading />
                </div>
              ))}
            </div>
            </>
                    ) : error ? (
                        <p className="text-gray-700 text-center py-8 w-full min-h-96">Could not load products, Try reloading the page! </p>
                    ) : (
                                <div className={`${loading || error ? "flex-1 flex w-full " : `grid ${cols ? cols : "lg:grid-cols-5 "} md:grid-cols-3 grid-cols-2`}  gap-4`}>
                                    {
                                        products?.length >= 1 ? (
                                            <>
                                                {
                                                    products?.slice(0, 4)?.map((product: any, index: number) => (
                                                        <ProductItem
                                                            remove_add_to_cart_botton={true}
                                                            key={index}
                                                            picture={product.pictures[0]}
                                                            price={product.price}
                                                            discount_price={product.discount_price}
                                                            name={product.title}
                                                            description={product.description}
                                                            category={product.category}
                                                            rating={product.averageRating}
                                                            id={product._id}
                                                            countInStock={product.countInStock}
                                                        />
                                                    ))
                                                }
                                            </>
                                        ) : (
                                                <div onClick={() => history.push('/dashboard/inventory')} className="flex lg:col-span-5 md:col-span-3 col-span-2">
                                                    <p className="md:text-lg text-sm text-gray-700 text-center flex-1 p-1 cursor-pointer hover:bg-gray-50 rounded w-full my-4 capitalize">No products to show. click here to become a seller?</p>
                                                </div>
                                            )
                                    }
                                </div>
                            )
                }
            </div>
        </div>
    );
}

export default RelatedProducts;
