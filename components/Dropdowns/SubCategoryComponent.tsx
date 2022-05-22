import React, { useContext } from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Store } from '../../Context/Store'

interface Props {
  category_id: string
  cat_name: string
  cat_image: any
}

function SubCategoryComponent({ category_id, cat_name, cat_image }: Props) {
  const history = useRouter()
  const { data: sub_categories, error: sub_cat_error } = useSWR(
    `/api/sub_category/all/${category_id}`
  )

  const { dispatch } = useContext(Store)

  const search_handler = (search_query: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: search_query })
    history.push('/explore')
  }
  return (
    <div className="megadrop z-10 flex flex-row rounded border border-gray-200 bg-gray-50 shadow-lg">
      <div className="w-3/5 ">
        <p className="items-center p-4 text-lg font-semibold capitalize text-blue-primary">
          {cat_name}
        </p>
        <div className=" px-4">
          <ul className="bg-gray-50">
            {!sub_categories ? (
              <p>loading...</p>
            ) : sub_cat_error ? (
              <p>error</p>
            ) : sub_categories?.sub_categories.length < 1 ? (
              <p className="text-center">No subcategories to show</p>
            ) : (
              <>
                {sub_categories?.sub_categories.map(
                  (sub_cat: any, index: number) => (
                    <li
                      onClick={() => search_handler(sub_cat.sub_category)}
                      key={index}
                      className="cursor-pointer rounded bg-gray-50 p-1 text-sm hover:bg-gray-200 hover:font-semibold hover:text-black"
                    >
                      <p className="font-normal text-gray-700 hover:font-semibold hover:text-black">
                        {sub_cat.sub_category}
                      </p>
                    </li>
                  )
                )}
              </>
            )}
          </ul>
        </div>
      </div>
      <div className="relative grid w-2/5 content-center items-center justify-center bg-white">
        <Image
          layout="fill"
          src={cat_image}
          className="h-32"
          alt="category representation on category component"
        />
      </div>
    </div>
  )
}

export default SubCategoryComponent
