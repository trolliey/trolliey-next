import React, { useContext, useState, useEffect } from 'react'
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
  const [category, setCategory] = useState('')
  const router = useRouter()
  const [sort_value, sortValue] = useState<any>('price')
  const [sort_order, sortOrder] = useState<any>('asc')
  // for showing sub categories
  const [category_value, setCategoryValue] = useState<any>('')
  const [current_category, setCurrentCategory] = useState<any>('')

  useEffect(() => {
    var tuna = data?.categories?.find(function (sandwich) {
      return sandwich.value === category_value
    })
    setCurrentCategory(tuna)
  }, [category_value])

  const { dispatch } = useContext(Store)

  const handle_hover = (slug: any, name: any, imag: any, value: any) => {
    setCategorySlug(slug)
    setCatName(name)
    setCategoryImage(imag)
    setCategoryValue(value)
  }
  const filter_by_category = (category: string) => {
    setCategory(category)
    router.push(
      `/explore?category=${category}&sort_order=${sort_order}&sort_value=${sort_value}&q=${
        router.query.q ? router.query.q : ''
      }`
    )
    dispatch({ type: 'SET_SEARCH_CATEGORY', payload: category })
  }

  return (
    <div className="z-10 md:w-96 lg:w-60">
      <ul className="menu relative font-semibold text-gray-700">
        <div className="flex flex-row items-center justify-between gap-8 rounded-t bg-[#0e75bc] p-3 text-sm capitalize text-white">
          <p className="hidden pl-2 pr-8 md:hidden lg:flex">By Category</p>
          <p className="hidden pl-2 pr-8 md:flex lg:hidden">By Category</p>
          <ChevronDownIcon height={16} width={16} />
        </div>
        <li className="rounded-b-0 border border-b-0 border-gray-200">
          <>
            {data.categories.slice(0, 10)?.map((category, index) => (
              <div
                key={index}
                onClick={() => filter_by_category(slugify(category.name))}
                onMouseEnter={() =>
                  handle_hover(
                    slugify(category.name),
                    category.name,
                    category.icon,
                    category.value
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
                category={current_category}
              />
            </>
          )}
        </li>
        <div
          onClick={() => history.push('/categories')}
          className="border-gra-200 flex cursor-pointer flex-row items-center justify-between gap-2 rounded border border-t-0 py-2 px-4 text-sm hover:bg-gray-100"
        >
          <p className="capitalize">all categories</p>
          <ChevronRightIcon height={16} width={16} className="text-gray-400" />
        </div>
      </ul>
    </div>
  )
}

export default CategoriesDropdown
