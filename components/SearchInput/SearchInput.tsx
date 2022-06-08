import React, { useState, ReactElement, useContext, useEffect } from 'react'
import { data } from '../../utils/data'
import { useRouter } from 'next/router'
import BlueButton from '../Buttons/BlueButton'
import slugify from '../../utils/slugify'
import { Store } from '../../Context/Store'
import { Input, Select } from '@chakra-ui/react'

function SearchInput():ReactElement {
    const [search_query, setSearchQuery] = useState('')
    const [search_category, setSearchCategory] = useState('')
    const history = useRouter()
    const { dispatch } = useContext(Store)

    const search_handler = () => {
        dispatch({ type: 'SET_SEARCH_QUERY', payload: search_query })
        history.push('/explore')
    }

    useEffect(()=>{
        dispatch({ type: 'SET_SEARCH_QUERY', payload: search_category })
    },[search_category])

    return (
        <div className="flex flex-row items-center pb-4 ">
            <div className="flex flex-row search_and_dropdown space-x-2 items-center w-full rounded mr-2 bg-white">
                <div className="flex">
                <Select
                    onChange={e => setSearchCategory(e.target.value)}
                    name="categories"
                    id="categories"
                    className="md:block hidden outline-none border-none text-xs font-semibold text-gray-700 rounded">

                    {data?.categories.map((category, index) => (
                        <option key={index} value={slugify(category.value)}>{category.name}</option>
                    ))}

                </Select>
                </div>
                <Input
                    type="text"
                    placeholder="Search Product Here..."
                    className="md:p-3 p-2 text-xs rounded-r border-l border-gray-200 flex-1 outline-none"
                    onChange={e => setSearchQuery(e.target.value)}
                />
            </div>
            <BlueButton text="Search" onClick={search_handler} />
        </div>
    )
}

export default SearchInput
