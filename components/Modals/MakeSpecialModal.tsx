import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { TrashIcon } from '@heroicons/react/outline'
import React, { useEffect } from 'react'

type Props = {
  product_name: string
  loading: boolean
  onClick: any
  product_id: string
  setProductId?:any
}

export default function MakeSpecialModal({
  product_name,
  loading,
  onClick,
  product_id,
  setProductId
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  useEffect(()=>{
    setProductId(product_id)
  },[])
  return (
    <>
      <div onClick={onOpen}>Make Special</div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody className="flex w-full  flex-col items-center ">
            <p className="my-4 text-center text-lg font-semibold text-gray-800">
              Make Product Special
            </p>
            <p className="text-center">
              Are you sure you want to make product with name <span className='text-black font-semibold'>"{product_name}"</span>{' '}
              special?
            </p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={() =>{
              onClick()
              onClose()
            }} colorScheme="red" isLoading={loading}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
