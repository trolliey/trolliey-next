import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import GeneralLayout from '../layouts/GeneralLayout'
import page_not_found from '../public/svg/page_not_found.svg'

type Props = {}

function NotFound({}: Props) {
  return (
    <GeneralLayout
      title="Page Not Found"
      description="We could not find the page you where looking for"
      no_text
    >
      <div className="mx-auto grid h-screen w-full max-w-7xl content-center items-center justify-center">
        <div className="flex flex-col  items-center font-semibold uppercase">
          <div className="flex h-96 ">
            <Image height={90}  src={page_not_found} alt=" page not found" />
          </div>
          <p className="mt-8 text-2xl text-gray-700">Sorry There's</p>
          <p className="text-2xl text-[#0E75BC]">Nothing here</p>
          <Link href="/explore">
            <p className="mt-8 flex cursor-pointer rounded bg-[#0E75BC] p-2 text-white">
              Explore Products
            </p>
          </Link>
        </div>
      </div>
    </GeneralLayout>
  )
}

export default NotFound
