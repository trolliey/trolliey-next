import React from 'react'
import StoreLayout from '../../../layouts/StoreLayout'
import { connect, disconnect } from '../../../utils/mongo'
import Store from '../../../models/Store'
import RatingComponent from '../../../components/Rating/RatingComponent'
import { Avatar, Divider, Progress, Stack, Text } from '@chakra-ui/react'
import Review from '../../../components/Review/Review'

interface RatingProps {
  color: string
  rating: number
  label: string
}

function Reviews(props: any) {
  return (
    <StoreLayout store_info={props.store}>
      <div className="flex w-full flex-col rounded bg-white shadow p-4">
        <p className="pb-4 text-center text-2xl font-semibold text-gray-800">
          4.0
        </p>
        <div className="flex flex-col items-center pb-4">
          <RatingComponent
            ratings={Math.floor(
              props?.store?.averageRating ? props?.store?.averageRating : 4
            )}
          />
          <p className="text-gray-700">based on 23 Reviews</p>
        </div>
        <div className="mx-auto mb-4 w-full flex-col space-y-5 md:mb-8 md:w-1/2">
          <AverageRating label={'Excellent'} rating={10} color={'teal'} />
          <AverageRating label={'Good'} rating={40} color={'green'} />
          <AverageRating label={'Average'} rating={20} color={'yellow'} />
          <AverageRating label={'Poor'} rating={15} color={'orange'} />
          <AverageRating label={'Very Poor'} rating={15} color={'red'} />
        </div>
        <Divider className="" />
        <div className="mx-auto flex w-full flex-col md:w-2/3 mt-4">
          {[1, 2, 4, 5].map((review, index) => (
            <div key={index} className="fl">
              <Review
                rating={
                  props?.store?.averageRating ? props?.store?.averageRating : 3
                }
                name="Tatenda Bako"
                photo={''}
                createdAt={'1 day ago'}
                review={
                  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam libero nam praesentium alias, sapiente neque suscipit magnam. Debitis, quo ratione? Voluptatibus itaque quam quasi aperiam iste impedit blanditiis repellat quo?'
                }
              />
            </div>
          ))}
        </div>
      </div>
    </StoreLayout>
  )
}

const AverageRating = ({ color, rating, label }: RatingProps) => {
  return (
    <div className="grid w-full grid-cols-4 items-center">
      <div className="col-span-1 capitalize text-gray-500">{label}</div>
      <div className="col-span-3">
        <Progress
          colorScheme={color}
          rounded={'sm'}
          size="sm"
          value={Math.floor(rating)}
        />
      </div>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const { params } = context
  const { id } = params
  await connect()
  const store = await Store.findOne({ _id: id }).lean()
  await disconnect()
  return {
    props: {
      //@ts-ignore
      store: JSON.parse(JSON.stringify(store)),
    },
  }
}

export default Reviews
