import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import { BriefcaseIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { Store } from '../../Context/Store'
import GeneralLayout from '../../layouts/GeneralLayout'
import BlueButton from '../../components/Buttons/BlueButton'
import {runFireWorks} from '../../utils/utils'

function SucessStore() {
  const { state, dispatch } = useContext(Store)
  const [order, setOrder] = useState(null)

  useEffect(()=>{
    dispatch({type: 'CLEAR_CART'})
    runFireWorks()
  },[])

  return (
    <GeneralLayout
      title="Store Created Sucessfully"
      description="You have applied for a store successfully"
      no_text
    >
      <div className="grid h-screen w-full  content-center items-center justify-center">
        <div className="flex flex-col space-y-2 text-center items-center rounded-lg bg-white p-16">
          <p className="icon self-center">
            <BriefcaseIcon
              height={40}
              width={40}
              className={'text-green-700'}
            />
          </p>
          <h2 className='text-blue-dark text-lg pb-8 font-semibold'>
            Thank you for applying for a store.
          </h2>
          <p className='text-gray-700 font-semibold'>We will send you an email as
            soon as we approve your application. Check your email inbox for acceptance</p>
          <p className="text-gray-700 font-semibold pb-8">If you have any questions please email {" "}

              <a className='text-red-600 font-semibold' href="mailto:mytrolliey@gmail.com">mytrolliey@gmail.com</a>
          </p>
          <div className="flex">
              <BlueButton text={'Continue Shopping'} />
          </div>
        </div>
      </div>
    </GeneralLayout>
  )
}

export default SucessStore
