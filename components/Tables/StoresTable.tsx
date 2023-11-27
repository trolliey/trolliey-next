import { Avatar } from '@chakra-ui/avatar'
import { SearchIcon } from '@heroicons/react/outline'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import BlueButton from '../Buttons/BlueButton'
import StoresDropdown from '../Dropdowns/StoresDropdown'
import { useFetch } from '../../hooks/useFetch'
import { apiUrl } from '../../utils/apiUrl'
import { Spinner } from '@chakra-ui/react'

interface Props {
  stores?: any
}

function StoresTable({ stores }: Props) {
  const [search_query, setSearchQuery] = useState<any>('')
  const [page, setPage] = useState(1)
  const url = `${apiUrl}/api/store/all?page=${page}`
  const all_stores = useFetch(url)

  const filteredStores = all_stores?.data?.stores?.filter((store: any) =>
    store.company_name.toLowerCase().includes(search_query.toLowerCase())
  )

  const search_item = () => {
    console.log(search_query)
  }

  if (all_stores?.status === 'fetching') {
    return (
      <div className="flex w-full content-center items-center justify-center py-16">
        <Spinner size={'xl'} />
      </div>
    )
  }

  return (
    <div className="mx-4 flex flex-col">
      <div className="mb-4 flex w-full flex-row items-center space-x-2 ">
        <div className="flex flex-1 flex-row items-center rounded border border-gray-200 px-4 py-1">
          <SearchIcon height={16} width={16} className="text-gray-300" />
          <input
            type="text"
            placeholder="Search user by name or id"
            value={search_query}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 border-none bg-gray-100 p-2 outline-none"
          />
        </div>
        <BlueButton text="Search" onClick={search_item} />
      </div>
      <table className="w-full">
        <thead>
          <tr className="grid grid-cols-7 items-center rounded-t border-b border-gray-100 shadow">
            <th className="col-span-1 bg-gray-50 p-2 uppercase text-gray-400">
              Logo
            </th>
            <th className="col-span-2 bg-gray-50 p-2 uppercase text-gray-400">
              Email
            </th>
            <th className="col-span-1 bg-gray-50 p-2 uppercase text-gray-400">
              Active
            </th>
            <th className="col-span-1 bg-gray-50 p-2 uppercase text-gray-400">
              Approved
            </th>
            <th className="col-span-1 bg-gray-50 p-2 uppercase text-gray-400">
              Created
            </th>
            <th className="col-span-1 bg-gray-50 p-2 uppercase text-gray-400">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredStores?.map((store: any, index: number) => (
            <tr
              key={index}
              className="grid w-full flex-1 grid-cols-7 items-center rounded-t border-b border-gray-100 bg-white p-2 text-gray-800 shadow "
            >
              <td className="col-span-1 flex flex-row items-center gap-2  ">
                <Avatar src={store?.photoURL} name={store?.company_name} />
                <p>{store?.company_name}</p>
              </td>
              <td className="col-span-2">{store?.email}</td>
              <td className="col-span-1">
                {store?.active === true ? (
                  <p className="text-green-500">Active</p>
                ) : (
                  <p className="text-red-500">Inactive</p>
                )}
              </td>
              <td className="col-span-1">
                {store?.approved === true ? (
                  <p className="text-green-500">Verified</p>
                ) : (
                  <p className="text-red-500">Unverified</p>
                )}
              </td>
              <td className="col-span-1">
                {moment(store?.createdAt).fromNow()}
              </td>
              <td className="col-span-1 text-blue-primary ">
                <StoresDropdown verified={store?.verified} id={store._id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default StoresTable
