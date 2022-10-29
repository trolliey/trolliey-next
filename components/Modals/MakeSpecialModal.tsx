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
import React from 'react'

type Props = {
  product_name: string
  loading: boolean
  onClick: any
  product_id: string
}

export default function MakeSpecialModal({
  product_name,
  loading,
  onClick,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
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
              Are you sure you want to make product with name {product_name}{' '}
              specaial?
            </p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={onClick} colorScheme="red" isLoading={loading}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
