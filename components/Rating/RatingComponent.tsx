import React, { ReactElement, useContext, useState } from 'react'
import { StarIcon } from '@heroicons/react/solid'
import axios from 'axios'
import { apiUrl } from '../../utils/apiUrl'
import { Store } from '../../Context/Store'
import { useToast } from '@chakra-ui/react'
import Router from 'next/router'
import BlueButton from '../Buttons/BlueButton'

interface Props {
  ratings: any
  id: string
}

function RatingComponent({ ratings, id }: Props): ReactElement {
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')
  const [isRatingVisible, setIsRatingVisible] = useState(false) // State to control visibility
  const [starsNum, setStarsNum] = useState(0)
  const { state, dispatch } = useContext(Store)
  const { userInfo, cart, currency } = state
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const toggleRatingVisibility = () => {
    if (!userInfo) {
      Router.push('/login')
      return
    }
    setIsRatingVisible(!isRatingVisible)
  }

  const add_review = (index: number) => {
    setLoading(true)
    setRating(index)
    // make an axios request to the backend to add the review
    axios
      .post(
        `${apiUrl}/api/v2/products/${id}/reviews`,
        {
          rating: starsNum,
          coment: review,
        },
        {
          headers: {
            authorization: `${userInfo.token}`,
          },
        }
      )
      .then((res) => {
        setLoading(false)
        toast({
          title: 'Review Added',
          description: 'Your review has been added successfully',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        })
        setReview('')
        setStarsNum(0)
        console.log(res.data)
      })
      .catch((err) => {
        setLoading(false)
        toast({
          title: 'Error',
          description: 'An error occurred while adding your review',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        })

        console.log(err)
      })
  }

  return (
    <div className="w-full">
      {isRatingVisible ? (
        <>
          <div className="star-rating gap-2">
            {[...Array(5)].map((star, index) => {
              index += 1
              return (
                <button
                  type="button"
                  title="Rating Star"
                  key={index}
                  className={index <= starsNum ? 'on' : 'off'}
                  onClick={() => setStarsNum(index)}
                >
                  <span className="star">
                    <StarIcon height={20} width={20} />
                  </span>
                </button>
              )
            })}
          </div>
          <textarea
            rows={6}
            className="mt-5 w-full rounded border border-gray-300 p-2"
            placeholder="Enter your review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <BlueButton
            loading={loading}
            text={
              <div className="mx-auto flex w-full flex-row content-center items-center justify-center space-x-1">
                <StarIcon height={12} width={12} />
                <p>Add Review </p>
              </div>
            }
            className="w-full "
            onClick={() => add_review(starsNum)}
          />
        </>
      ) : (
        <div className="star-rating flex justify-between gap-2">
          <BlueButton
            loading={loading}
            text={
              <div className="mx-auto flex w-full flex-row content-center items-center justify-center space-x-1">
                <StarIcon height={12} width={12} />
                <p>Add Review </p>
              </div>
            }
            className="w-full flex-1"
            onClick={toggleRatingVisibility}
          />

          <p className="ml-2 mt-2 flex items-center text-sm font-medium text-yellow-600">
            {rating === 0 ? (
              <span className="text-gray-300">No ratings available</span>
            ) : (
              <span>
                {rating} {rating === 1 ? 'Rating' : 'Ratings'}
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  )
}

export default RatingComponent
