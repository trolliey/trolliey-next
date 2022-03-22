import React, { useState } from 'react'
import StoreLayout from '../../../layouts/StoreLayout'
import { connect, disconnect } from '../../../utils/mongo'
import Store from '../../../models/Store'
import RatingComponent from '../../../components/Rating/RatingComponent'
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  Select,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import Review from '../../../components/Review/Review'

interface RatingProps {
  color: string
  rating: number
  label: string
}

function Reviews(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [rating, setRating] = useState<number>(0)
  const [store_review, setReview] = useState('')
  const toast = useToast()

  const setReviewHandler = () =>{
      console.log(store_review, rating)
      setRating(0)
      setReview('')
      onClose()
      toast({
        title: 'Review added.',
        description: "Thank you for giving us your honest review.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })

  }
  return (
    <StoreLayout store_info={props.store}>
      <div className="flex w-full flex-col rounded bg-white p-4 shadow">
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
        <div className="mx-auto mt-4 flex w-full flex-col md:w-2/3">
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
        <div
          onClick={onOpen}
          className="fixed inset-x-0 bottom-5 z-20 mx-auto w-10/12 cursor-pointer rounded border border-blue-dark bg-blue-dark p-2 text-center shadow-lg hover:bg-blue-primary md:w-1/2  md:p-4"
        >
          <span className="font-semibold text-white">Write A Review</span>
        </div>
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Write A Review</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Select placeholder="Rating Out of 5">
                <option value="option1">1</option>
                <option value="option2">2</option>
                <option value="option3">3</option>
                <option value="option3">4</option>
                <option value="option3">5</option>
              </Select>
              <div className="flex flex-col pt-4">
                <p className="ml-1 text-sm text-gray-600">Review</p>
                <textarea
                  rows={5}
                  className="w-full rounded border border-gray-300 bg-gray-50 p-2"
                  placeholder="What do you think about the store"
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={setReviewHandler} colorScheme="blue">Send</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
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
