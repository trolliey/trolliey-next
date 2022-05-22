import React, { useContext, useState } from 'react'
import { ChevronRightIcon } from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'
import SubCategoryComponent from './SubCategoryComponent'
import { data } from '../../utils/data'
import slugify from '../../utils/slugify'
import { useRouter } from 'next/router'
import { Store } from '../../Context/Store'

function CategoriesDropdown() {
  const history = useRouter()
  const [category_slug, setCategorySlug] = useState('')
  const [cat_name, setCatName] = useState('')
  const [category_image, setCategoryImage] = useState()

  const { dispatch } = useContext(Store)

  const handle_hover = (slug: any, name: any, imag: any) => {
    setCategorySlug(slug)
    setCatName(name)
    setCategoryImage(imag)
  }

  return (
    <div className="md:w-96 lg:w-60">
      <ul className="menu relative font-semibold text-gray-700">
        <div className="flex flex-row items-center justify-between gap-8 rounded-t bg-blue-primary p-3 text-sm capitalize text-white">
          <p className="hidden pl-2 pr-8 md:hidden lg:flex">By Category</p>
          <p className="hidden pl-2 pr-8 md:flex lg:hidden">By Category</p>
          <ChevronDownIcon height={16} width={16} />
        </div>
        <li className="rounded-b border border-gray-200">
          <>
            {data.categories.slice(0, 10)?.map((category, index) => (
              <div
                key={index}
                onClick={() => {
                  dispatch({ type: 'SET_SEARCH_QUERY', payload: category })
                  history.push('/explore')
                }}
                onMouseEnter={() =>
                  handle_hover(
                    slugify(category.name),
                    category.name,
                    category.icon
                  )
                }
                className="flex cursor-pointer flex-row items-center justify-between gap-2 overflow-hidden overflow-ellipsis py-2 px-4 text-sm hover:bg-gray-100"
              >
                <p className="line-clamp-1 overflow-ellipsis capitalize">
                  {category.name}
                </p>
                <ChevronRightIcon
                  height={16}
                  width={16}
                  className="text-gray-400"
                />
              </div>
            ))}
          </>

          {category_slug && (
            <>
              <SubCategoryComponent
                category_id={category_slug}
                cat_name={cat_name}
                cat_image={category_image}
              />
            </>
          )}
        </li>
        <div
          onClick={() => history.push('/categories')}
          className="border-gra-200 flex cursor-pointer flex-row items-center justify-between gap-2 rounded border py-2 px-4 text-sm hover:bg-gray-100"
        >
          <p className="capitalize">all categories</p>
          <ChevronRightIcon height={16} width={16} className="text-gray-400" />
        </div>
      </ul>
    </div>
  )
}

export default CategoriesDropdown
