import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { Store } from '../../../Context/Store'
import AdminDashboard from '../../../layouts/AdminDashboard'
import { apiUrl } from '../../../utils/apiUrl'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline'

function ExhangeRate() {
  interface ShippingMethod {
    id: string
    name: string
    price: string
    description: string
    duration: string
    pricing_method: string
    active: number
  }

  const { state, dispatch } = useContext(Store)
  const { userInfo, cart, currency } = state

  const [rate, setRate] = React.useState('')

  const [loading, setLoading] = React.useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure()
  const toast = useToast()

  const getExchangeRate = () => {
    axios
      .get(`${apiUrl}/api/v2/settings`, {
        headers: {
          authorization: `${userInfo.token}`,
        },
      })
      .then(({ data }) => {
        setRate(data?.data?.rate)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const addExchangeRate = () => {
    setLoading(true)
    axios
      .patch(
        `${apiUrl}/api/v2/settings`,
        {
          exchange_rate: rate,
        },
        {
          headers: {
            authorization: `${userInfo.token}`,
          },
        }
      )
      .then(({ data }) => {
        toast({
          title: 'Shipping Method Added',
          description: 'Shipping Method Added Successfully',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        })
        setRate(data?.data?.rate)
        onClose()
        console.log(data)
      })
      .catch((err) => {
        toast({
          title: 'Error',
          description: 'Error Updating Rating',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        })
        console.log(err)
      })
  }

  useEffect(() => {
    getExchangeRate()
  }, [rate])

  const editShippingMethod = (id: string) => {
    axios
      .put(
        `${apiUrl}/api/v2/settings`,
        {
          exchange_rate: rate,
        },
        {
          headers: {
            authorization: `${userInfo.token}`,
          },
        }
      )
      .then(({ data }) => {
        toast({
          title: 'Rating Updated',
          description: 'Rating Updated Successfully',
          status: 'success',

          duration: 5000,
          isClosable: true,
          position: 'top-right',
        })
        setRate(data?.data?.rate)
      })
      .catch((err) => {
        toast({
          title: 'Error',
          description: 'Error Updating Rating',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        })

        console.log(err)
      })
  }

  return (
    <AdminDashboard>
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-between">
          <p className="my-4 text-center text-lg font-semibold capitalize text-gray-700">
            Exchange Rate
          </p>
        </div>
        <div className="min-h-screen">
          <div className="flex flex-col">
            <div className="flex flex-col items-center justify-between">
              <p className="my-4 text-center text-lg font-semibold capitalize text-gray-700">
                Today's Rate is {rate}
              </p>
              <button
                onClick={onOpen}
                className="rounded bg-blue-500 px-4 py-2 text-white"
              >
                Change Rate
              </button>
            </div>
          </div>
        </div>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Exchange Rate</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700">
                  Exhange Rate
                </label>
                <input
                  onChange={(e) => setRate(e.target.value)}
                  className="mt-2 rounded border border-gray-300 px-3 py-2"
                  type="number"
                  placeholder="7000"
                />

                <button
                  onClick={addExchangeRate}
                  className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
                >
                  {loading ? 'Adding Exchange Rate...' : 'Add Exchange Rate'}
                </button>
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </AdminDashboard>
  )
}

export default ExhangeRate
