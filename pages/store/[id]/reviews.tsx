import React, { useContext, useEffect, useState } from 'react'
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
  Spinner,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import Review from '../../../components/Review/Review'
import { Store as StateStore } from '../../../Context/Store'
import axios from 'axios'
import { useRouter } from 'next/router'
import { getError } from '../../../utils/error'
import moment from 'moment'

interface RatingProps {
  color: string
  rating: number
  label: string
}

function Reviews(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [rating, setRating] = useState<any>(0)
  const [store_review, setReview] = useState<string>('')
  const [create_loading, setCreateLoading] = useState<boolean>(false)
  const [page_loading, setPageLoading] = useState<boolean>(false)
  const toast = useToast()
  const { state } = useContext(StateStore)
  const { userInfo } = state
  const [all_reviews_doc, setAllReviewsDoc] = useState<any>()

  const history = useRouter()
  const { id } = history.query

  //get all reviews for the store
  useEffect(() => {
    const getReviews = async () => {
      setPageLoading(true)
      try {
        const { data } = await axios.get(`/api/review/${id}`)
        setAllReviewsDoc(data)
        setPageLoading(false)
      } catch (error) {
        setPageLoading(false)
      }
    }
    getReviews()
  }, [])

  console.log(all_reviews_doc)

  const setReviewHandler = async () => {
    try {
      setCreateLoading(true)
      await axios.post(
        '/api/review',
        {
          review: store_review,
          rating: rating,
          store_id: id,
          user_id: userInfo?._id,
        },
        {
          headers: {
            authorization: userInfo?.token,
          },
        }
      )
      setCreateLoading(false)
      setRating(0)
      setReview('')
      onClose()
      toast({
        title: 'Review added.',
        description: 'Thank you for giving us your honest review.',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      })
    } catch (error) {
      setCreateLoading(false)
      toast({
        title: 'Error.',
        description: getError(error),
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      })
    }
  }

  if (page_loading) {
    return (
      <StoreLayout store_info={props.store}>
        <div className="grid h-96 w-full content-center items-center justify-center bg-white">
          <Spinner />
        </div>
      </StoreLayout>
    )
  }

  if(all_reviews_doc?.length < 1){
    return(
      <StoreLayout store_info={props.store}>
        <div className="flex h-96">
          <p className="text-gray-700 font-semibold text-center">Store had no reviews yet</p>
        </div>
      </StoreLayout>
    )
  }

  return (
    <StoreLayout store_info={props.store}>
      <div className="flex w-full flex-col rounded bg-white p-4 shadow">
        <p className="pb-4 text-center text-2xl font-semibold text-gray-800">
          {all_reviews_doc?.average_rating}
        </p>
        <div className="flex flex-col items-center pb-4">
          <RatingComponent
            ratings={Math.floor(all_reviews_doc?.average_rating)}
          />
          <p className="text-gray-700">
            based on{' '}
            {all_reviews_doc?.reviews_length > 1 ? (
              <span>{all_reviews_doc?.reviews_length} reviews</span>
            ) : (
              <span>{all_reviews_doc?.reviews_length} review</span>
            )}
          </p>
        </div>
        <div className="mx-auto mb-4 w-full flex-col space-y-5 md:mb-8 md:w-1/2">
          <AverageRating label={'Excellent'} rating={all_reviews_doc?.five_stars_percent } color={'teal'} />
          <AverageRating label={'Good'} rating={all_reviews_doc?.four_stars_percent } color={'green'} />
          <AverageRating label={'Average'} rating={all_reviews_doc?.three_stars_percent } color={'yellow'} />
          <AverageRating label={'Poor'} rating={all_reviews_doc?.two_stars_percent } color={'orange'} />
          <AverageRating label={'Very Poor'} rating={all_reviews_doc?.one_stars_percent } color={'red'} />
        </div>
        <Divider className="" />
        <div className="mx-auto mt-4 flex w-full flex-col md:w-2/3">
          {all_reviews_doc?.reviews.map((review:any, index:number) => (
            <div key={index} className="fl">
              <Review
                rating={review.rating}
                name={review.name}
                photo={''}
                createdAt={moment(review.createdAt).fromNow()}
                review={review.review}
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
              <Select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                placeholder="Rating Out of 5"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </Select>
              <div className="flex flex-col pt-4">
                <p className="ml-1 text-sm text-gray-600">Review</p>
                <textarea
                  rows={5}
                  onChange={(e) => setReview(e.target.value)}
                  className="w-full rounded border border-gray-300 bg-gray-50 p-2"
                  placeholder="What do you think about the store"
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button
                isLoading={create_loading}
                onClick={setReviewHandler}
                colorScheme="blue"
              >
                Send
              </Button>
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
