import { Text } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import Amount from '../Amount/Amount'

interface Props {
  picture?: string
  rating?: number
  description: string
  name: string
  discount_price?: number
  price?: number
  id: string
  category: string
  countInStock: number
  product?: any
  averageRating?: any
  currency?: any
  display?: any
}

function MobileProductItem({
  picture,
  rating,
  name,
  description,
  price,
  discount_price,
  id,
  category,
  product,
  averageRating,
  currency,
  display,
}: Props) {
  const history = useRouter()
  return (
    <div>
      <div className="flex flex-row space-x-4 pb-2 border-b border-gray-100">
        <div
          onClick={() => history.push(`/product/description/${id}`)}
          className="relative flex h-24 w-24 flex-col items-center overflow-hidden rounded-lg  bg-white"
        >
          <Image
            objectFit="cover"
            src={picture ? picture : ''}
            layout="fill"
            alt="product"
            className="h-full max-h-full w-auto flex-1 flex-shrink-0 rounded object-cover"
          />
        </div>
        <div className="flex flex-col">
          <Text noOfLines={2} className="font-semibold text-gray-700">{name}</Text>
          <Text className="text-xs font-semibold text-blue-dark">
            {category}
          </Text>
          <div className="flex-1"></div>
          <Text>
            {discount_price ? (
              <div
                onClick={() => history.push(`/product/description/${id}`)}
                className="flex flex-row items-center"
              >
                <div className="mr-2 font-bold text-gray-900">
                  <Amount
                    amount={
                      discount_price
                        ? (price ? price : 0) - discount_price
                        : price
                    }
                  />
                </div>
                {discount_price && (
                  <div className="text-xs text-gray-400 line-through">
                    <Amount amount={price} />
                  </div>
                )}
              </div>
            ) : (
              <div
                onClick={() => history.push(`/product/description/${id}`)}
                className="flex flex-row items-center"
              >
                <p className="mr-2 font-bold text-gray-900">
                  <Amount amount={price} />
                </p>
              </div>
            )}
          </Text>
        </div>
      </div>
    </div>
  )
}

export default MobileProductItem
