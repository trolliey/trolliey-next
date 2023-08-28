import { Avatar, Text } from '@chakra-ui/react'
import React from 'react'
import RatingComponent from '../Rating/RatingComponent'

interface ReviewProps {
  rating: number
  name: string
  photo?: string
  store?: string
  createdAt: any
  review: string
  id: string
}

function Review({
  rating,
  name,
  photo,
  id,
  store,
  createdAt,
  review,
}: ReviewProps) {
  return (
    <>
      <div className="my-2 flex cursor-pointer flex-col md:my-4">
        <div className="heading flex flex-row gap-2 md:gap-4">
          <Avatar name={name} src={photo} />
          <div className="flex flex-col">
            <p className="font-semibold text-gray-800">{name}</p>
            <RatingComponent id={id} ratings={Math.floor(rating)} />
          </div>
          <div className="ml-auto text-sm text-gray-500">{createdAt}</div>
        </div>
        <div className="flex pt-2">
          <Text noOfLines={3} className="text-sm text-gray-500 md:text-sm">
            {review}
          </Text>
        </div>
      </div>
    </>
  )
}

export default Review
