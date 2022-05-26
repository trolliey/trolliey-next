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

  function currencyFormat(num: any) {
    if (currency === 'USD') {
      return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    } else {
      return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' ZWL'
    }
  }

  function anotherCurrencyFormatter(num: any) {
    if (currency_type === 'USD') {
      return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    } else {
      return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' ZWL'
    }
  }

  return (
    <>
      {currency_type ? (
        <div className={`${className} flex flex-row items-center`}>
          {anotherCurrencyFormatter(amount)}
        </div>
      ) : (
        <div className={`${className} flex flex-row items-center`}>
          {currencyFormat(amount)}
        </div>
      )}
    </>
  )
}

export default Amount
