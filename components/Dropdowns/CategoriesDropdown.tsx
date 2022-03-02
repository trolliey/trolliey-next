import React, { useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid';
import SubCategoryComponent from './SubCategoryComponent'
import { data } from '../../utils/data';
import slugify from '../../utils/slugify';
import { useRouter } from 'next/router';

function CategoriesDropdown() {
    const history = useRouter()
    const [category_slug, setCategorySlug] = useState('')
    const [cat_name, setCatName] = useState('')
    const [category_image, setCategoryImage] = useState()

    const handle_hover = (slug:any, name:any, imag:any) => {
        setCategorySlug(slug)
        setCatName(name)
        setCategoryImage(imag)

    }

    return (
        <div className='lg:w-60 md:w-96'>
            <ul className="menu relative text-gray-700 font-semibold">
                <div className="flex flex-row items-center gap-8 bg-blue-primary text-white p-3 justify-between capitalize text-sm rounded-t">
                    <p className='pl-2 pr-8 lg:flex md:hidden hidden'>By Category</p>
                    <p className='pl-2 pr-8 lg:hidden md:flex hidden'>By Category</p>
                    <ChevronDownIcon height={16} width={16} />
                </div>
                <li className='border border-gray-200 rounded-b'>
                    <>
                        {
                            data.categories.slice(0, 10)?.map((category, index) => (
                                <div
                                    key={index}
                                    onClick={() => history.push(`/sub-category/${slugify(category.name)}`)}
                                    onMouseEnter={() => handle_hover(slugify(category.name), category.name, category.icon)}
                                    className="flex flex-row items-center gap-2 py-2 px-4 cursor-pointer justify-between text-sm hover:bg-gray-100 overflow-ellipsis overflow-hidden">
                                    <p className='capitalize overflow-ellipsis line-clamp-1'>{category.name}</p>
                                    <ChevronRightIcon height={16} width={16} className='text-gray-400' />
                                </div>
                            ))
                        }
                    </>

                    {
                        category_slug && <>
                            <SubCategoryComponent 
                                category_id={category_slug} 
                                cat_name={cat_name} 
                                cat_image={category_image} />
                        </>
                    }

                </li>
                <div onClick={() => history.push('/categories')} className="flex flex-row items-center gap-2 py-2 px-4 border border-gra-200 rounded cursor-pointer justify-between text-sm hover:bg-gray-100">
                    <p className='capitalize'>all categories</p>
                    <ChevronRightIcon height={16} width={16} className='text-gray-400' />
                </div>

            </ul>
        </div>
    )
}

export default CategoriesDropdown;
