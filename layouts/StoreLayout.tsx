import React, { ReactElement, useEffect, useState } from 'react'
import GeneralLayout from './GeneralLayout'
import { useRouter } from 'next/router'

interface Props {
    children?: any,
    store_info: any
}

export default function StoreLayout({ children, store_info }: Props): ReactElement {
    const history = useRouter()
    const { id } = history.query
    const { asPath } = useRouter()

    const page_links = [
        { name: 'Products', location: `/store/${id}/products` },
        { name: 'About', location: `/store/${id}/about` },
        { name: 'Reviews', location: `/store/${id}/reviews` }
    ]

    return (
        <GeneralLayout
            title={ `${store_info?.company_name} ${'Products / Reviews / About'}`}
            description={`${store_info?.about} all products being sold by ${store_info?.company_name} store`}
            no_text
        >
            <div className="flex flex-col w-full py-8">
                <h1 className="text-center font-extrabold text-black text-2xl">{store_info?.company_name}</h1>
                <div className="flex flex-row items-center md:mt-20 mt-8 px-2 border-t border-gray-300 w-full mx-auto text-center justify-center space-x-8">
                    {
                        page_links?.map((link, index) => (
                            <div onClick={() => {
                                history.push(`${link.location}`)
                            }}
                                key={index}
                                className={`${asPath === link.location ? "border-t-4 border-blue-700 text-blue-dark " : " border-none "} mr-4 pb-4 text-gray-700 font-semibold cursor-pointer pt-4`}>{link.name}
                                </div>
                        ))
                    }
                </div>
                <div className="flex w-full">
                    {children}
                </div>
            </div>
        </GeneralLayout>
    )
}
