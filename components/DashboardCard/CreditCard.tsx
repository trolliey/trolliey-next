import React, { ReactElement } from 'react'
import { CreditCardIcon } from '@heroicons/react/solid'
import moment from 'moment'
import Image from 'next/image'

interface Props {
  date?: any
  number?: any
  type?: any
  user_name?: string
  picture?: any
  bg_color?: string,
  onClick: any
}

function CreditCard({
  date,
  number,
  type,
  picture,
  user_name,
  bg_color,
  onClick
}: Props): ReactElement {
  return (
    <div
      onClick={onClick}
      className={`${
        bg_color ? bg_color : 'bg-gradient-to-r from-blue-dark to-blue-primary '
      } flex w-full flex-col justify-between space-y-4 rounded-lg py-4 px-8 cursor-pointer`}
    >
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-1">
          <CreditCardIcon height={28} width={28} className="text-yellow-300" />
        </div>
        <div className="ml-auto flex">
          <Image
            src={picture}
            objectFit="contain"
            height={32}
            alt="ecocash logo on credit card"
          />
        </div>
      </div>
      <div className="flex w-full text-center font-mono text-xl font-semibold text-white">
        <p className="mx-auto text-center">{number}</p>
      </div>
      <div className="flex justify-between text-center font-mono text-lg text-white">
        <div className="flex flex-col text-left">
          <p className="text-xs uppercase">Name on {type}</p>
          <p className="font-medium">{user_name}</p>
        </div>
        <div className="flex flex-col text-left">
          <p className="text-xs uppercase">Date</p>
          <p className="font-bold">{moment(date).format('MM/DD/YYYY')}</p>
        </div>
      </div>
    </div>
  )
}

export default CreditCard
