import React, {  useState } from 'react';
import { Disclosure } from '@headlessui/react'
import BlueButton from '../Buttons/BlueButton';

interface Props{
    category_slug ?: any
}

function SubCategoryComponent({category_slug}:Props) {
    const [toggle_subcategory_on, setToggleCategory] = useState<boolean>(false)
    const [sub_cat, setSubCat] = useState<any>('')
    const [pictures_for_upload, setPicturesForUpload] = useState<any>()

    const toggle_sub_category_Handler = () => {
        toggle_subcategory_on ? setToggleCategory(false) : setToggleCategory(true)
    }

    return (
        <div>
           <Disclosure.Panel as="dd" className="mt-2 pr-12 bg-white">
            <div className="flex flex-col items-end w-full">
                <div className="flex flex-row items-center font-semibold capitalize text-sm py-2">
                    <span className="text-blue-400 hover:text-blue-700 mr-2 cursor-pointer">Edit </span> |
                    <span className="mx-2 text-red-400 hover:text-red-700 cursor-pointer"> delete </span> |
                    <span
                        onClick={toggle_sub_category_Handler}
                        className="ml-2 cursor-pointer text-gray-700 hover:text-black"> {!toggle_subcategory_on ? "add sub-category" : "cancel"}</span>
                </div>
     
                {
                    toggle_subcategory_on ? (
                        <div className="flex flex-col w-full mb-2">
                            <input
                                type="text"
                                className="border border-gray-300 p-2 rounded outline-none flex-1 m-2"
                                placeholder="add category"
                                onChange={e => setSubCat(e.target.value)}
                            />
                            {/*//ts-ignore */}
                           {/* <input type="file" onChange={e => setPicturesForUpload(e.target.files[0])} /> */}
                            <div className="mx-2 ml-auto">
                                <BlueButton
                                    text="Add Sub-Category"
                                    onClick={() => console.log(' add a sub category')}
                                    loading={false}
                                />
                            </div>
                        </div>
                    ) : null
                }
            </div>

            {/* <>
                {
                    sub_cat_loading ? (
                        <p>Loading ..</p>
                    ) : (
                        <>
                            {
                                sub_categories?.result.length < 1 ? (
                                    <p className='text-center text-gray-700 font-semibold'>No sub categories under this category</p>
                                ) : (
                                    <>
                                        {
                                            sub_categories?.result.map((sub_cat, index) => (
                                                <p key={index} className="text-base text-gray-600 mx-2">{index + 1}. {sub_cat?.name}</p>
                                            ))
                                        }
                                    </>
                                )
                            }
                        </>
                    )
                }
            </> */}

        </Disclosure.Panel>  
        </div>
    )
}

export default SubCategoryComponent
