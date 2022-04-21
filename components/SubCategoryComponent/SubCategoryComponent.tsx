import React, { useState } from 'react'
import { Disclosure } from '@headlessui/react'
import BlueButton from '../Buttons/BlueButton'

interface Props {
  category_slug?: any
}

function SubCategoryComponent({ category_slug }: Props) {
  const [toggle_subcategory_on, setToggleCategory] = useState<boolean>(false)
  const [sub_cat, setSubCat] = useState<any>('')
  const [pictures_for_upload, setPicturesForUpload] = useState<any>()

  const toggle_sub_category_Handler = () => {
    toggle_subcategory_on ? setToggleCategory(false) : setToggleCategory(true)
  }

  const add_sub_category_handler = () => {
    console.log('add sub_category under ----- ', category_slug)
  }

  return (
    <div>
      <Disclosure.Panel as="dd" className="mt-2 bg-white rounded border border-gray-100 ">
        <div className="flex w-full flex-col items-end">
          <div className="flex flex-row items-center py-4 pr-2 text-sm font-semibold capitalize">
            <span className="mr-2 cursor-pointer text-blue-400 hover:text-blue-700">
              Edit{' '}
            </span>{' '}
            |
            <span className="mx-2 cursor-pointer text-red-400 hover:text-red-700">
              {' '}
              delete{' '}
            </span>{' '}
            |
            <span
              onClick={toggle_sub_category_Handler}
              className="ml-2 cursor-pointer text-gray-700 hover:text-black"
            >
              {' '}
              {!toggle_subcategory_on ? 'add sub-category' : 'cancel'}
            </span>
          </div>

          {toggle_subcategory_on ? (
            <div className="mb-2 flex w-full flex-col">
              <input
                type="text"
                className="m-2 flex-1 rounded border border-gray-300 p-2 outline-none"
                placeholder="add category"
                onChange={(e) => setSubCat(e.target.value)}
              />
              {/*//ts-ignore */}
              <input 
                type="file" 
                className='m-2 flex-1 rounded border border-gray-300 outline-none p-1'
                placeholder='select picture'
                onChange={(e:any) => setPicturesForUpload(e?.target.files[0])} 
                multiple={false}
                />
              <div className="mx-2 ml-auto">
                <BlueButton
                  text="Add Sub-Category"
                  onClick={add_sub_category_handler}
                  loading={false}
                />
              </div>
            </div>
          ) : null}
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
