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
    <GeneralLayout
    no_text
      title="Explore Products"
      description="Explore all all products offered by Trolliey marketplace"
    >
      <div className="mb-8 flex md:my-16 my-8 max-w-7xl flex-col flex-wrap items-center">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 lg:grid-cols-5 md:grid-cols-4 md:gap-8">
          {data.categories.map((category, index) => (
            <div
              onClick={() => search_by_category(category.name)}
              key={index}
              className="col-span-1 transform cursor-pointer transition hover:-translate-y-1 hover:text-blue-primary motion-reduce:transform-none motion-reduce:transition-none"
            >
              <CategoryItem text={category.name} image={category.icon} />
            </div>
          ))}
        </div>
      </div>
    </GeneralLayout>
  )
}

interface CatProps {
  text: string
  image: any
}

const CategoryItem = ({ text, image }: CatProps) => {
  return (
    <div className="m-1 grid w-full content-center items-center justify-center rounded bg-white p-2 shadow">
      <div className="relative h-48 w-48 content-center items-center justify-center p-4">
        <Image
          layout="fill"
          objectFit="contain"
          src={image}
          alt=""
          className="h-24"
        />
      </div>
      <p className="text-center">{text}</p>
    </div>
  )
}

export default Categories
