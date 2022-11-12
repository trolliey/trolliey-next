import { Avatar } from '@chakra-ui/avatar'
import { SearchIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import moment from 'moment'
import BlueButton from '../Buttons/BlueButton'
import StoresDropdown from '../Dropdowns/StoresDropdown'
import { useFetch } from '../../hooks/useFetch'
import { apiUrl } from '../../utils/apiUrl'
import { Spinner } from '@chakra-ui/react'

interface Props{
    stores?:any
}

function StoresTable({ stores }:Props) {
    const [search_query, setSearchQuery] = useState<any>('')
    const [page, setPage] = useState(1)
    const url = `${apiUrl}/api/store/all?page=${page}`
    const all_stores = useFetch(url)

    console.log('all stores ', all_stores)

    const search_item = () => {
        console.log(search_query)
    }

    if(all_stores?.status === 'fetching'){
        return(
            <div className="flex items-center content-center justify-center py-16 w-full">
                <Spinner size={"xl"} />
            </div>
        )
    }

    return (
        <div className="flex flex-col mx-4">
            <div className="flex flex-row items-center space-x-2 w-full mb-4 ">
                <div className="flex flex-row items-center border border-gray-200 rounded px-4 py-1 flex-1">
                    <SearchIcon height={16} width={16} className="text-gray-300" />
                    <input
                        type="text"
                        placeholder="Search user by name or id"
                        onChange={e => setSearchQuery(e.target.value)}
                        className="p-2 bg-gray-100 flex-1 outline-none border-none" />
                </div>
                <BlueButton text="Search" onClick={search_item} />
            </div>
            <div className="grid grid-cols-6 items-center rounded-t shadow border-b border-gray-100">
                <div className="col-span-1 text-gray-400 uppercase p-2 bg-gray-50  ">
                    logo
                </div>
                <div className="col-span-2 text-gray-400 uppercase p-2 bg-gray-50 ">
                    email
                </div>
                <div className="col-span-1 text-gray-400 uppercase p-2 bg-gray-50 ">
                    verified
                </div>
                <div className="col-span-1 text-gray-400 uppercase p-2 bg-gray-50 ">
                    Created
                </div>
                <div className="col-span-1 text-gray-400 uppercase p-2 bg-gray-50 ">
                    edit
                </div>
            </div>

            {
                all_stores?.data?.stores?.map((store:any, index:number) => (
                    <div key={index} className="grid grid-cols-6 w-full bg-white p-2 flex-1 items-center rounded-t shadow border-b text-gray-800 border-gray-100 ">
                        <div className="col-span-1 flex flex-row items-center gap-2  ">
                            <Avatar src={store?.photoURL} name={store?.company_name} />
                            <p>
                                {store?.company_name}
                            </p>
                        </div>
                        <div className="col-span-2  ">
                            {store?.email}
                        </div>
                        <div className="col-span-1  ">
                            {store?.verified ? 'true' : 'false'}
                        </div>
                        <div className="col-span-1  ">
                            {moment(store?.createdAt).fromNow()}
                        </div>
                        <div className="col-span-1  text-blue-primary ">
                            <StoresDropdown verified={store?.verified} id={store._id} />
                        </div>
                    </div>
                ))
            }

        </div>
    )
}

export default StoresTable
