import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { Store } from '../../Context/Store'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { apiUrl } from '../../utils/apiUrl'
import { getError } from '../../utils/error'

type Props = {
  product_name: string

  product_id: string
  setProductId?: any
}

export default function CouponModal({ product_id, setProductId }: Props) {
  const [coupon_code, setCouponCode] = useState('')
  const [discount, setDiscount] = useState('')
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const { state } = useContext(Store)
  const { userInfo } = state

  const { isOpen, onOpen, onClose } = useDisclosure()
  useEffect(() => {
    setProductId(product_id)
  }, [])

  const handleCouponUpload = async () => {
    try {
      setLoading(true)
      const { data } = await axios.post(
        `${apiUrl}/api/coupon/create`,
        {
          name: coupon_code,
          percentOff: discount,
          productIds: product_id,
        },
        {
          headers: {
            Authorization: userInfo?.token,
          },
        }
      )
      if (data.success) {
        toast({
          title: 'Coupon created successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        setLoading(false)
        onClose()
      }
    } catch (error) {
      setLoading(false)
      toast({
        title: 'Error',
        description: getError(error),
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      <div onClick={onOpen}>Make Coupon</div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody className="flex w-full  flex-col  ">
            <p className="my-4 text-center text-lg font-semibold text-gray-800">
              Create a discount coupon
            </p>
            <p className="text-left">Coupon Code</p>
            <input
              onChange={(e) => {
                setCouponCode(e.target.value)
              }}
              className="w-full rounded-md border border-gray-300 p-2"
              type="text"
              placeholder="Enter coupon code"
            />
            <p className="mt-4 text-left">Discount</p>
            <input
              onChange={(e) => {
                setDiscount(e.target.value)
              }}
              className="w-full rounded-md border border-gray-300 p-2"
              type="text"
              placeholder="Enter discount"
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              onClick={() => {
                handleCouponUpload()
                onClose()
              }}
              colorScheme="blue"
              isLoading={loading}
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
