import React from 'react'
import AdminDashboard from '../../../layouts/AdminDashboard'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { Disclosure } from '@headlessui/react'
import { data } from '../../../utils/data'
import SubCategoryComponent from '../../../components/SubCategoryComponent/SubCategoryComponent'
import slugify from '../../../utils/slugify'
import Image from 'next/image'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

function ManageCategories() {
  console.log(data.categories)

  return (
    <AdminDashboard>
      <p className="m-4 text-center font-semibold text-gray-900">
        Expand to see sub-categories
      </p>
      <div className="mx-4">
        <dl className="space-y-6 divide-y divide-gray-200">
          {data?.categories?.map((category: any, index: number) => (
            <Disclosure as="div" key={index} className="pt-6">
              {({ open }) => (
                <>
                  <dt className="text-lg">
                    <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-400">
                      <div className="flex flex-row items-center">
                        <p className="mr-1 text-gray-700">{index + 1}.</p>
                        {/* <div className="relative mx-2">
                          <Image
                            width={20}
                            height={20}
                            src={category.icon}
                            objectFit="contain"
                            alt="category representation on category component"
                          />
                        </div> */}
                        <span className="font-medium text-gray-900">
                          {category.name}
                        </span>
                      </div>
                      <span className="ml-6 flex h-7 items-center">
                        <ChevronDownIcon
                          className={classNames(
                            open ? '-rotate-180' : 'rotate-0',
                            'h-6 w-6 transform'
                          )}
                          aria-hidden="true"
                        />
                      </span>
                    </Disclosure.Button>
                  </dt>
                  <div className="bg-white">
                    <SubCategoryComponent
                      category_slug={slugify(category.name)}
                    />
                  </div>
                </>
              )}
            </Disclosure>
          ))}
        </dl>
      </div>
    </AdminDashboard>
  )
}

export default ManageCategories
