import React, { useContext } from 'react'
import { Store } from '../../Context/Store'

interface Props {
  amount: any
  className?: string
  currency_type?: any
}

function Amount({ amount, className, currency_type }: Props) {
  const { state } = useContext(Store)
  const { currency } = state
  return (
    <>
      {currency_type ? (
        <div className={`${className} flex flex-row items-center`}>
          {currency_type === 'USD' && '$'}
          {amount} {currency_type === 'ZWL' && 'ZWL'}
        </div>
      ) : (
        <div className={`${className} flex flex-row items-center`}>
          {currency === 'USD' && '$'}
          {amount} {currency === 'ZWL' && 'ZWL'}
        </div>
      )}
    </>
  )
}

export default Amount
