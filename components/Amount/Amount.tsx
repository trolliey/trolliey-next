import React, { useContext } from 'react'
import { Store } from '../../Context/Store'
import { data } from '../../utils/data'

interface Props {
  amount: any
  className?: string
  // currenxy from the product
  currency_type?: any
}

export  const convertAmounts = (value: number, currency:string, currency_type:string) => {
  if (currency === 'USD') {
    const money =
      currency_type === 'USD' ? value / data.current_rate.value : value
    return money
  } else if (currency === 'ZWL') {
    const money =
      currency_type === 'ZWL' ? value : value * data.current_rate.value
    return money
  } else {
    return value
  }
}

function Amount({ amount, className, currency_type }: Props) {
  const { state } = useContext(Store)
  // currency from the browser
  const { currency } = state

  function currencyFormat(num: number) {
    if (currency === 'USD') {
      return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    } else {
      return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' ZWL'
    }
  }

  function anotherCurrencyFormatter(num: number) {
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
          {anotherCurrencyFormatter(convertAmounts(amount, currency, currency_type))}
        </div>
      ) : (
        <div className={`${className} flex flex-row items-center`}>
          {currencyFormat(convertAmounts(amount, currency, currency_type))}
        </div>
      )}
    </>
  )
}

export default Amount
