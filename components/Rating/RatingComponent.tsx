import React, { ReactElement, useContext, useState } from 'react'
import { StarIcon } from '@heroicons/react/solid'
import axios from 'axios'
import { apiUrl } from '../../utils/apiUrl'
import { Store } from '../../Context/Store'

interface Props {
  ratings: any
  id: string
}

function RatingComponent({ ratings, id }: Props): ReactElement {
  const [rating, setRating] = useState(0)
  const { state, dispatch } = useContext(Store)
  const { userInfo, cart, currency } = state
  const add_review = (index: number) => {
    setRating(index)
    // make an axios request to the backend to add the review
    axios
      .put(
        `${apiUrl}/api/product/rate/${id}`,
        { rating: index },
        {
          headers: {
            authorization: `${userInfo.token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      {rating ? (
        <div className="star-rating gap-2">
          {[...Array(5)].map((star, index) => {
            index += 1
            return (
              <button
                type="button"
                title="Rating Star"
                key={index}
                className={index <= rating ? 'on' : 'off'}
                onClick={() => add_review(index)}
              >
                <span className="star">
                  <StarIcon height={20} width={20} />
                </span>
              </button>
            )
          })}
        </div>
      ) : (
        <div className="star-rating gap-2">
          {[...Array(5)].map((star, index) => {
            index += 1
            return (
              <button
                type="button"
                title="Star Icon"
                key={index}
                className={index <= ratings ? 'on' : 'off'}
                onClick={() => add_review(index)}
              >
                <span className="star">
                  <StarIcon height={20} width={20} />
                </span>
              </button>
            )
          })}
        </div>
      )}
    </>
  )
}

export default RatingComponent
