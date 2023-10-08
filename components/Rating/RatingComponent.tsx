import React, { ReactElement, useContext, useState } from 'react'
import { StarIcon } from '@heroicons/react/solid'
import axios from 'axios'
import { apiUrl } from '../../utils/apiUrl'
import { Store } from '../../Context/Store'
import { useToast } from '@chakra-ui/react'
import Router from 'next/router'

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
      .put(
        `${apiUrl}/api/product/rate/${id}`,
        {
          rating: starsNum,
          review: review,
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
        console.log(res.data)
      })
      .catch((err) => {
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
            className="mt-5 w-full rounded border border-gray-300 p-2"
            placeholder="Enter your review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <button
            className="mt-2 rounded bg-[#0F75BC] py-1 px-2 text-xs font-bold text-white hover:bg-blue-700
"
            type="button"
            onClick={() => add_review(starsNum)}
          >
            Submit
          </button>
        </>
      ) : (
        <div className="star-rating gap-2">
          <button
            className="rounded bg-[#0F75BC] py-1 px-2 text-xs font-bold text-white hover:bg-blue-700"
            type="button"
            onClick={toggleRatingVisibility}
          >
            {loading ? 'Loading...' : 'Rate Product'}
          </button>
          <span className="ml-2 mt-2 flex items-center text-sm font-medium text-yellow-600">
            4.9 rating
          </span>
        </div>
      )}
    </div>
  )
}

export default RatingComponent
