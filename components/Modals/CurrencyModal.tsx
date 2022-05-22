import React, { useContext } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react'
import { Store } from '../../Context/Store'

interface Props {
  isOpen?: any
  onOpen?: any
  onClose?: any
}

function CurrencyModal({ isOpen, onClose, onOpen }: Props) {
    const { dispatch } = useContext(Store)
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select Preferred Currency</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="flex w-full flex-col items-center">
            <div
              onClick={() => {
                dispatch({ type: 'CHANGE_CURRENCY', payload: 'USD' })
                onClose()
              }}
              className="w-full cursor-pointer rounded border-y border-gray-200 p-2 text-center hover:bg-gray-100"
            >
              USD
            </div>
            <div
              onClick={() => {
                dispatch({ type: 'CHANGE_CURRENCY', payload: 'ZWL' })
                onClose()
              }}
              className="w-full cursor-pointer rounded border-y border-gray-200 bg-gray-100 p-2 text-center hover:bg-gray-200"
            >
              ZWL
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button onClick={onClose} variant="ghost">
            Proceed
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CurrencyModal
