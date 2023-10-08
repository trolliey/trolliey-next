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
    <Modal isOpen={isOpen} onClose={onClose}>
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
            <FormLabel>Items Price</FormLabel>
            <Input
              name="itemsPrice"
              value={values?.itemsPrice}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Shipping Price</FormLabel>
            <Input
              name="shippingPrice"
              value={values?.shippingPrice}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Total Price</FormLabel>
            <Input
              name="total_price"
              value={values?.total_price}
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
            <FormLabel>Collect My Order</FormLabel>
            <Input
              name="collect_my_order"
              value={values?.collect_my_order}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Method</FormLabel>
            <Input
              name="method"
              value={values?.method}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Is Paid</FormLabel>
            <Input
              name="isPaid"
              value={values?.isPaid}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Pay On Delivery</FormLabel>
            <Input
              name="pay_on_delivery"
              value={values?.pay_on_delivery}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Weight</FormLabel>
            <Input
              name="weight"
              value={values?.weight}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Paying Number</FormLabel>
            <Input
              name="paying_number"
              value={values?.paying_number}
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
          <FormControl>
            <FormLabel>Number of Items Bought</FormLabel>
            <Input
              name="number_of_items_bought"
              value={values?.number_of_items_bought}
              onChange={handleChange}
            />
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
