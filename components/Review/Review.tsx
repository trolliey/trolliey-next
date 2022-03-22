import { Avatar, Text } from '@chakra-ui/react'
import React from 'react'
import RatingComponent from '../Rating/RatingComponent'

interface ReviewProps{
    rating: number,
    name: string,
    photo?:string,
    store?:string,
    createdAt:any,
    review:string
}

function Review({rating, name, photo, store, createdAt, review}:ReviewProps) {
    return (
        <>
         <div className="flex flex-col md:my-4 my-2 cursor-pointer">
            <div className="heading flex flex-row md:gap-4 gap-2">
              <Avatar name={name} src={photo} />
              <div className="flex flex-col">
                <p className="text-gray-800 font-semibold">{name}</p>
                <RatingComponent
                  ratings={Math.floor(rating)}
                />
              </div>
              <div className="ml-auto text-gray-500 text-sm">
                  {createdAt}
              </div>
            </div>
            <div className="flex pt-2">
                <Text noOfLines={3} className="text-gray-500 md:text-sm text-sm">
                    {review}
                </Text>
            </div>
          </div>   
        </>
    )
}

export default Review
