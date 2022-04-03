import React from 'react'
import AdminDashboard from '../../../layouts/AdminDashboard'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { Disclosure } from '@headlessui/react'
import { data } from '../../../utils/data'
import SubCategoryComponent from '../../../components/SubCategoryComponent/SubCategoryComponent'
import slugify from '../../../utils/slugify'

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}


function ManageCategories() {
    return (
        <AdminDashboard>
            <p className="text-gray-900 font-semibold text-center m-4">Expand to see sub-categories</p>
            <div className="mx-4">
                <dl className="space-y-6 divide-y divide-gray-200">
                    {data?.categories?.map((category:any, index:number) => (
                        <Disclosure as="div" key={index} className="pt-6">
                            {({ open }) => (
                                <>
                                    <dt className="text-lg">
                                        <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400" >

                                            <div className="flex flex-row items-center">
                                                <p className='mr-1 text-gray-700'>{index+1}.</p>
                                                <img src={category.icon} alt={category.name} className='h-6 w-6 mr-2' />
                                                <span className="font-medium text-gray-900">{category.name}</span>
                                            </div>
                                            <span className="ml-6 h-7 flex items-center">
                                                <ChevronDownIcon
                                                    className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                                                    aria-hidden="true"
                                                />
                                            </span>
                                        </Disclosure.Button>
                                    </dt>
                                    <div className='bg-white'>
                                        <SubCategoryComponent category_slug={slugify(category.name)} />
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
