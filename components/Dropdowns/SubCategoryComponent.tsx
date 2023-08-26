import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Store } from '../../Context/Store'

interface Props {
  category_id: string
  cat_name: string
  cat_image: any
  category?: any
}

function SubCategoryComponent({
  category_id,
  cat_name,
  cat_image,
  category,
}: Props) {
  const history = useRouter()
  const { dispatch } = useContext(Store)

  const search_handler = (search_query: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: search_query })
    history.push(`/explore?q=${search_query}`)
  }
  return (
    <div className="megadrop z-10 flex flex-row rounded border border-gray-200 bg-gray-50 shadow-lg">
      <div className="w-3/5 ">
        <p className="items-center p-4 text-lg font-semibold capitalize text-blue-primary">
          {cat_name}
        </p>
        <div className=" px-4">
          <ul className="bg-gray-50">
            {category?.sub_categories?.length < 1 ? (
              <p className="text-center">No subcategories to show</p>
            ) : (
              <>
                {category?.sub_categories
                  .slice(0, 13)
                  ?.map((sub_cat: any, index: number) => (
                    <li
                      onClick={() => search_handler(sub_cat.name)}
                      key={index}
                      className="cursor-pointer rounded bg-gray-50 p-1 text-sm hover:bg-gray-200 hover:font-semibold hover:text-black"
                    >
                      <p className="font-normal text-gray-700 hover:font-semibold hover:text-black">
                        {sub_cat.name}
                      </p>
                    </li>
                  ))}
              </>
            )}
          </ul>
        </div>
      </div>
      <div className="relative grid w-2/5 content-center items-center justify-center bg-white">
        <div className="relative h-32 w-32">
          <Image
            layout="fill"
            src={cat_image}
            objectFit="contain"
            className="h-32"
            alt="category representation on category component"
          />
        </div>
      </div>
    </div>
  )
}

export default SubCategoryComponent
