import React from 'react';
import useSWR from "swr";
import { useRouter } from 'next/router';
import Image from 'next/image';

interface Props{
    category_id: string,
    cat_name:string,
    cat_image:any
}

function SubCategoryComponent({category_id, cat_name, cat_image}:Props) {
    const history = useRouter()
    const { data: sub_categories, error: sub_cat_error } = useSWR(`/api/sub_category/all/${category_id}`)

    const search_handler = (search_query:string) => {
        history.push('/explore')
    }
    return (
        <div className="megadrop bg-gray-50 border border-gray-200 rounded flex flex-row z-10 shadow-lg">
            <div className="w-3/5 ">
                <p className='text-blue-primary font-semibold items-center text-lg p-4 capitalize'>{cat_name}</p>
                <div className=" px-4">
                    <ul className='bg-gray-50'>
                        {
                            !sub_categories ? (
                                <p>loading...</p>
                            ) : sub_cat_error ? (
                                <p>error</p>
                            ) : sub_categories?.sub_categories.length < 1 ? (
                                <p className='text-center'>No subcategories to show</p>
                            ) : (
                                            <>
                                                {
                                                    sub_categories?.sub_categories.map((sub_cat:any, index:number) => (
                                                        <li onClick={() => search_handler(sub_cat.sub_category)} key={index} className='bg-gray-50 cursor-pointer hover:text-black hover:font-semibold text-sm p-1 rounded hover:bg-gray-200'>
                                                            <p className='text-gray-700 hover:text-black font-normal hover:font-semibold'>{sub_cat.sub_category}</p>
                                                        </li>
                                                    ))
                                                }
                                            </>
                                        )
                        }
                    </ul>
                </div>
            </div>
            <div className="relative w-2/5 bg-white grid items-center justify-center content-center">
                <Image layout="fill" src={cat_image} className='h-32' alt="category representation on category component" />
            </div>
        </div>
    )
}

export default SubCategoryComponent
