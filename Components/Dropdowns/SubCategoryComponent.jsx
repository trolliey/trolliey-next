import React from 'react';
import Image from 'next/image';
import '../../styles/CategoriesDropdown.module.css'

function SubCategoryComponent({ category_id, cat_name, cat_image }) {
    const search_handler = (search_query) => {
        dispatch(set_search_query_Action(search_query))
        history.push('/explore')
    }
  return (
    <div className="megadrop bg-gray-50 border border-gray-200 rounded flex flex-row z-10">
            <div className="w-3/5 ">
                <p className='text-blue-primary font-semibold items-center text-lg p-4 capitalize'>{cat_name}</p>
                <div className=" px-4">
                    <ul className='bg-gray-50'>
                        {/* {
                            !sub_categories ? (
                                <p>loading...</p>
                            ) : sub_cat_error ? (
                                <p>error</p>
                            ) : sub_categories?.sub_categories.length < 1 ? (
                                <p className='text-center'>No subcategories to show</p>
                            ) : (
                                <>
                                    {
                                        sub_categories?.sub_categories.map((sub_cat, index) => (
                                            <li onClick={()=>search_handler(sub_cat.sub_category)} key={index} className='bg-gray-50 cursor-pointer hover:text-black hover:font-semibold text-sm p-1 rounded hover:bg-gray-200'>
                                                <p className='text-gray-700 hover:text-black font-normal hover:font-semibold'>{sub_cat.sub_category}</p>
                                            </li>
                                        ))
                                    }
                                </>
                            )
                        } */}
                    </ul>
                </div>
            </div>
            <div className="w-2/5 bg-white grid items-center justify-center content-center">
                <Image src={cat_image} className='h-32' alt="category representation on category component" />
            </div>
        </div>
  )
}

export default SubCategoryComponent