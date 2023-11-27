import {
  Button,
  useDisclosure,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import DeleteModal from '../../../components/Modals/DeleteModal'
import { Store } from '../../../Context/Store'
import AdminDashboard from '../../../layouts/AdminDashboard'
import DashboardLayout from '../../../layouts/DashboardLayout'
import { apiUrl } from '../../../utils/apiUrl'

function Index() {
  const [reviews, setReviews] = useState<any>()
  const [loading, setLoading] = useState(false)
  const { state } = useContext(Store)
  const { userInfo } = state
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [id, setId] = useState('')
  console.log(userInfo, 'sss')

  // get all reviews
  const get_reviews = async () => {
    const { data } = await axios.get(`${apiUrl}/api/v2/reviews`, {
      headers: {
        authorization: userInfo.token,
        'Content-Type': 'application/json',
      },
    })
    setReviews(data.data.reviews)
  }

  useEffect(() => {
    get_reviews()
  }, [])

  const delete_review = async (id: string) => {
    setLoading(true)
    await axios.delete(`${apiUrl}/api/v2/reviews/${id}`, {
      headers: {
        authorization: userInfo.token,
        'Content-Type': 'application/json',
      },
    })
    setLoading(false)
    get_reviews()
  }

  const approve_review = async (id: string) => {
    setLoading(true)
    await axios.put(
      `${apiUrl}/api/v2/reviews/${id}`,
      { status: 'approved' },
      {
        headers: {
          authorization: userInfo.token,
          'Content-Type': 'application/json',
        },
      }
    )
    setLoading(false)
    get_reviews()
  }

  console.log(reviews, 'reviews')

  return (
    <AdminDashboard>
      <Table variant="simple" width="full">
        <Thead>
          <Tr>
            <Th>Rating</Th>
            <Th>Comment</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {reviews?.map((review: any) => (
            <Tr key={review._id}>
              <Td>{review.rating}</Td>
              <Td>{review.review}</Td>
              <Td>
                <Button
                  colorScheme="green"
                  onClick={() => approve_review(review._id)}
                >
                  Approve
                </Button>
                <DeleteModal
                  onClick={() => delete_review(review._id)}
                  isOpen={isOpen}
                  onClose={onClose}
                  loading={loading}
                  product_name={'review'}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </AdminDashboard>
  )
}

export default Index
