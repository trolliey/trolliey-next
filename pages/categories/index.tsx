import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { Store } from '../../Context/Store'
import GeneralLayout from '../../layouts/GeneralLayout'
import { data } from '../../utils/data'

function Categories() {
    const { dispatch } = useContext(Store)
    const history = useRouter()

    const search_by_category = (category: any) => {
        dispatch({ type: 'SET_SEARCH_QUERY', payload: category })
        history.push('/explore')
    }
    return (
        <GeneralLayout title="Explore Products" description="Explore all all products offered by Trolliey marketplace">
            <div className="flex flex-col flex-wrap items-center max-w-7xl mb-8">
                <div className="grid md:grid-cols-3 grid-cols-2 md:gap-8 gap-4 mx-auto max-w-7xl">
                    {data.categories.map((category, index) => (
                        <div onClick={()=>search_by_category(category.name)}  key={index} className="transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:transform-none cursor-pointer hover:text-blue-primary col-span-1">
                            <CategoryItem text={category.name} image={category.icon} />
                        </div>
                    ))}
                </div>
            </div>
        </GeneralLayout>
    )
}

interface CatProps{
    text: string,
    image: any
}

const CategoryItem = ({ text, image }:CatProps) => {
    return (
        <div className="bg-white p-2 rounded m-1 grid items-center justify-center content-center shadow w-full">
            <div className='p-4 grid items-center justify-center content-center'>
            <Image height={150} objectFit="contain" src={image} alt="" className='h-24' />
            </div>
            <p className='text-center'>{text}</p>
        </div>
    )
}

export default Categories
