import React, { useState, useEffect, useContext } from 'react'
import DashboardLayout from '../../../layouts/DashboardLayout'
import { SearchIcon } from '@heroicons/react/outline'
import ProductsTable from '../../../components/Tables/ProductsTable'
import BlueButton from '../../../components/Buttons/BlueButton'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Store } from '../../../Context/Store'
import { Spinner } from '@chakra-ui/react'

export default function Inventory() {
    const history = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
    const [search_query, setSearchQuery] = useState<string>('')
    const [products, setProducts] = useState<any>([])
    const { state } = useContext(Store)
    const { userInfo } = state

    useEffect(() => {
        setLoading(true)
        const getData = async () => {
            try {
                const { data } = await axios.post(`/api/products/user?user_id=${userInfo._id}`,{
                    query: search_query
                })
                setProducts(data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
        }
        getData()
    }, [search_query])

    console.log(products)

    return (
        <DashboardLayout>
            <div className="flex flex-col md:p-8 p-2">
                <div className="flex bg-white rounded shadow md:p-4 p-2 flex-col mb-8">
                    <div className="flex md:flex-row flex-col items-center md:space-x-8 space-x-2">
                        {/* <p className="text text-gray-700 font-semibold">Products</p> */}
                        <div className="flex flex-row items-center border flex-1 w-full md:mb-0 mb-4 border-gray-200 rounded px-2 text-gray-500">
                            <SearchIcon height={20} width={20} />
                            <input 
                                type="text" 
                                onChange={e => setSearchQuery(e.target.value)}
                                placeholder="Search something and press enter" className="p-2 flex-1 outline-none" />
                        </div>
                        <BlueButton text="Create Product" onClick={() => history.push('/dashboard/inventory/create')} />
                       
                    </div>
                </div>


                {
                    loading ? (
                        <div className="grid items-center content-center justify-center w-full h-96">
                            <Spinner />
                        </div>
                    ) : (
                            <>
                               {
                                   products?.length < 1 ? (
                                       <p>no products</p>
                                   ):(
                                       <>
                                         <ProductsTable products={products} />
                                       </>
                                   )
                               }
                            </>
                        )
                }

            </div>
        </DashboardLayout>
    )
}

