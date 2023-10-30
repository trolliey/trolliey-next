import { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import React from 'react'

type OrderFormProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: any
  order: any
}

const OrderForm: React.FC<OrderFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  order,
}) => {
  const [values, setValues] = useState(order)

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  return (
    <Modal size={'xl'} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Order</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Full Name</FormLabel>
            <Input
              name="full_name"
              value={values?.full_name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input
              name="address"
              value={values?.address}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Province</FormLabel>
            <Input
              name="province"
              value={values?.province}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Contact Phone Number</FormLabel>
            <Input
              name="contact_phone_number"
              value={values?.contact_phone_number}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>City</FormLabel>
            <Input name="city" value={values?.city} onChange={handleChange} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            colorScheme="green"
            onClick={() => {
              onSubmit(values)
              onClose()
            }}
          >
            Create Order
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default OrderForm
