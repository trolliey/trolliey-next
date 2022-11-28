import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react'

function PaymentModal({isOpen, onClose, body, heading, action_button}) {
  return (
    <>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{heading}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           {body}
          </ModalBody>

          <ModalFooter>
            <Button variant={'ghost'} mr={3} onClick={onClose}>
              Close
            </Button>
            {action_button}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default PaymentModal
