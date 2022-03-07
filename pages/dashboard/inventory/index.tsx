import React, { useState } from 'react'
import DashboardLayout from '../../../layouts/DashboardLayout'
import { SearchIcon, ArrowDownIcon } from '@heroicons/react/outline'
import ProductsTable from '../../../components/Tables/ProductsTable'
import { data } from '../../../utils/data'
import BlueButton from '../../../components/Buttons/BlueButton'
import { useRouter } from 'next/router'

export default function Inventory() {
    const [show_filter, setShowFilter] = useState<boolean>(false)
    const history = useRouter()
    return (
        <DashboardLayout>
            <div className="flex flex-col p-8">
                <div className="flex bg-white rounded shadow p-4 flex-col mb-8">
                    <div className="flex flex-row items-center space-x-8">
                        <p className="text text-gray-700 font-semibold">Products</p>
                        <div className="flex flex-row items-center border flex-1 border-gray-200 rounded px-2 text-gray-500">
                            <SearchIcon height={20} width={20} />
                            <input type="text" placeholder="Search something and press enter" className="p-2 flex-1 outline-none" />
                        </div>
                        <BlueButton text="Create Product" onClick={() => history.push('/dashboard/inventory/create')} />
                        <div onClick={() => setShowFilter(true ? false : true)} className="flex cursor-pointer flex-row items-center space-x-2 text-blue-primary">
                            <p>Filter</p>
                            <ArrowDownIcon height={16} width={16} />
                        </div>
                    </div>
                </div>


                <>
                    <ProductsTable products={data.products} />
                </>

            </div>
        </DashboardLayout>
    )
}