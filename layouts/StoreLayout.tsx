import React, { ReactElement, useContext, useEffect, useState } from 'react'
import GeneralLayout from './GeneralLayout'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Store } from '../Context/Store'

interface Props {
  children?: any
  store_info: any
}

export default function StoreLayout({
  children,
  store_info,
}: Props): ReactElement {
  const history = useRouter()
  const { id } = history.query
  const { asPath } = useRouter()
  const { state } = useContext(Store)
  const { userInfo } = state

  const page_links = [
    { name: 'Products', location: `/store/${id}/products` },
    // { name: 'About', location: `/store/${id}/info` },
    { name: 'Reviews', location: `/store/${id}/reviews` },
  ]

  useEffect(() => {
    if (!userInfo) {
      history.push(`/login?redirect=store/${id}/products`)
    }
    const visitPage = async () => {
      await axios.post(
        '/api/store/visit',
        {
          id: id,
        },
        {
          headers: {
            authorization: userInfo?.token,
          },
        }
      )
    }
    visitPage()
  }, [])

  return (
    <GeneralLayout
      title={`${store_info?.company_name} ${'Products / Reviews / About'}`}
      description={`${store_info?.about} all products being sold by ${store_info?.company_name} store`}
      no_text
    >
      <div className="flex w-full flex-col py-8">
        <h1 className="text-center text-2xl font-extrabold text-black">
          {store_info?.company_name}
        </h1>
        <div className="mx-auto mt-8 flex w-full flex-row items-center justify-center space-x-8 border-t border-gray-300 px-2 text-center md:mt-20">
          {page_links?.map((link, index) => (
            <div
              onClick={() => {
                history.push(`${link.location}`)
              }}
              key={index}
              className={`${
                asPath === link.location
                  ? 'border-t-4 border-blue-700 text-blue-dark '
                  : ' border-none '
              } mr-4 cursor-pointer pb-4 pt-4 font-semibold text-gray-700`}
            >
              {link.name}
            </div>
          ))}
        </div>
        <div className="flex w-full">{children}</div>
      </div>
    </GeneralLayout>
  )
}
