import React, { useState } from 'react'
import CreditCard from '../../../components/DashboardCard/CreditCard'
import DashboardLayout from '../../../layouts/DashboardLayout'
import ecocash from '../../../public/img/eco_cash.svg'
import telecash from '../../../public/img/telecash1.png'

function Cards() {
  const [ecocash_method, setEcocash] = useState<any>('')
  const [telecash_method, setTelecash] = useState<any>('')
  return (
    <DashboardLayout>
      <p className="my-8 text-center text-2xl font-bold text-black">
        These are the accounts that will receive payment
      </p>
      <div className="m-2 flex flex-1 flex-col rounded bg-white p-4 md:m-4 ">
        <p className="mb-4 text-center font-semibold capitalize text-gray-700">
          Click on a card to change details
        </p>
        <div className="flex flex-col">
          <div className="col-span-1 w-full">
            <div className="flex">
              <p className="mb-4 font-semibold text-gray-800">
                Card for all RTGS payments
              </p>
            </div>
            <div className="w-1/3 flex flex-row">
              <CreditCard
                type={'RTGS'}
                number={'+2637 7144 5411'}
                picture={ecocash}
                user_name={'Tatenda Bako'}
                date={Date.now()}
                bg_color={'bg-gradient-to-r from-black to-gray-800 h-full'}
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Cards
