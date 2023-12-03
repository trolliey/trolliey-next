import { Modal, Select, Spinner, Text, useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import { Store } from '../../../Context/Store'
import DashboardLayout from '../../../layouts/DashboardLayout'
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react'
import Image from 'next/image'
import moment from 'moment'
import { apiUrl } from '../../../utils/apiUrl'
import { useAuthFetch } from '../../../hooks/useAuthFetch'
import BlueButton from '../../../components/Buttons/BlueButton'
import axios from 'axios'
import { getError } from '../../../utils/error'

function Orders() {
  const { state } = useContext(Store)
  const { userInfo } = state

  const url = `${apiUrl}/api/v2/invoices`
  const orders = useAuthFetch(url, userInfo?.token)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [paymentMethod, setPaymentMethod] = useState('')
  const [paymentPhoneNumber, setPaymentPhoneNumber] = useState('')
  const [isPaymentLoading, setPaymentLoading] = useState(false)
  const [filter, setFilter] = useState('') // Default filter is 'daily'

  const filteredOrders = orders?.data?.data?.filter((order: any) => {
    const orderDate = moment(order.createdAt)
    const currentDate = moment()

    if (filter === 'daily') {
      return orderDate.isSame(currentDate, 'day')
    } else if (filter === 'weekly') {
      return orderDate.isSame(currentDate, 'week')
    } else if (filter === 'monthly') {
      return orderDate.isSame(currentDate, 'month')
    } else if (filter === 'yearly') {
      return orderDate.isSame(currentDate, 'year')
    }

    return true // Show all orders if filter is not selected
  })

  const handleRenewPayment = async () => {
    try {
      setPaymentLoading(true)

      const paymentPayload = {
        currency: 'USD',
        payment_details: {
          phone: paymentPhoneNumber,
          method: paymentMethod,
        },
      }

      const response = await axios.post(
        `${url}/payments`, // Replace orderId with the actual order ID
        paymentPayload,
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      console.log('Payment success:', response.data)
      // Handle success, e.g., show a success message or update the UI
    } catch (error) {
      const errorMessage = await getError(error)
      console.error('Payment error:', errorMessage)
      // Handle error, e.g., show an error message to the user
    } finally {
      setPaymentLoading(false)
      onClose()
    }
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto my-8 px-4">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          Invoices
        </h1>

        <div className="flex w-full justify-between lg:w-1/2">
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="mt-4"
            size={'md'}
          >
            {/* option placeholder */}
            <option value="">Filter By</option>
            <option value="daily">Today</option>
            <option value="weekly">This Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </Select>
          <BlueButton
            text="Renew Subscription"
            onClick={onOpen}
            className="mt-4 ml-5 w-full"
          />
        </div>
        {orders?.status === 'fetching' ? (
          <div className="mt-8 text-center">
            <Spinner size="xl" />
          </div>
        ) : (
          <table className="mt-4 w-full border-collapse rounded border border-gray-300">
            <caption className="sr-only">Invoice history</caption>
            <thead className="rounded bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left">Invoice #</th>
                <th className="py-2 px-4 text-left">Amount</th>
                <th className="py-2 px-4 text-left">Balance</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-right">Due At</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders?.map((order: any) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="text-wrap max-w-lg whitespace-normal py-2 px-4 ">
                    {' '}
                    <div className="flex items-center">
                      <div className="ml-2">
                        <Text>{order.number}</Text>
                      </div>
                    </div>
                  </td>

                  <td className="py-2 px-4">
                    <Text>{order.amount}</Text>
                  </td>

                  <td className="py-2 px-4">
                    <Text>{order.amount}</Text>
                  </td>
                  <td className="py-2 px-4">
                    {order?.status === 'pending' ? (
                      <span className="inline-flex rounded-full bg-yellow-100 px-2 text-xs font-semibold leading-5 text-yellow-800">
                        Pending
                      </span>
                    ) : order?.status === 'paid' ? (
                      <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                        Paid
                      </span>
                    ) : order?.status === 'delivered' ? (
                      <span className="inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold leading-5 text-blue-800">
                        Delivered
                      </span>
                    ) : order?.status === 'expired' ? (
                      <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
                        Expired
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full bg-red-500 px-2 text-xs font-semibold leading-5 text-gray-800">
                        Expired
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-4 text-right">
                    {moment(order.createdAt).format('DD/MM/YYYY')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Renew Subscription</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              placeholder="Select Payment Method"
              className="mt-4"
              size={'md'}
            >
              <option value="ECOCASH">ECOCASH</option>
              {/* Add other payment methods as needed */}
            </Select>
            <input
              type="text"
              placeholder="Phone Number"
              value={paymentPhoneNumber}
              onChange={(e) => setPaymentPhoneNumber(e.target.value)}
              className="mt-4 w-full rounded-md border border-gray-300 p-2"
            />
          </ModalBody>

          <ModalFooter>
            <BlueButton
              text="Make Payment"
              onClick={handleRenewPayment}
              loading={isPaymentLoading}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </DashboardLayout>
  )
}

export default Orders
