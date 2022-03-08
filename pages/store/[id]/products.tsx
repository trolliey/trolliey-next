import React, { useEffect, useState } from 'react'
import StoreLayout from '../../../layouts/StoreLayout'
import Store from '../../../models/Store'
import { connect, disconnect } from '../../../utils/mongo'
import axios from 'axios'
import { useRouter } from 'next/router'
import ProductLoading from '../../../components/ProductItem/ProductLoading'
import ProductItem from '../../../components/ProductItem/ProductItem'

function StoreProducts(props: any) {
    const [products, setProducts] = useState<any>()
    const [loading, setLoading] = useState<boolean>(false)

    const history = useRouter()
    const { id } = history.query

    useEffect(() => {
        const getProducts = async () => {
            const { data } = await axios.get(`/api/store/${id}`)
            setProducts(data?.products)
        }
        getProducts()
    }, [])
    return (
        <StoreLayout store_info={props.store}>
            <div className="flex flex-col p-4 bg-white rounded shadow w-full">
                <p className="text-gray-700 font-semibold my-4 text-center">All products sold by {props.store?.company_name}</p>
                {
                    loading ? (
                        <div className={`lg:grid-cols-5 md:grid-cols-4 grid-cols-2 grid w-full md:gap-8 gap-4 mx-auto  rounded-lg`} >
                            {[1, 2, 3, 4, 5]?.map((product: any, index: number) => (
                                <div key={index} className="p-0 col-span-1">
                                    <ProductLoading />
                                </div>
                            ))}
                        </div>
                    ) : (
                            <div className={`lg:grid-cols-5 md:grid-cols-4 grid-cols-2 grid w-full md:gap-8 gap-4 mx-auto  rounded-lg`} >
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
        </StoreLayout>
    )
}

export async function getServerSideProps(context: any) {
    const { params } = context
    const { id } = params
    await connect()
    const store = await Store.findOne({ _id: id }).lean()
    await disconnect()
    return {
        props: {
            //@ts-ignore
            store: JSON.parse(JSON.stringify(store))
        }
    }
}

export default StoreProducts
