/* This example requires Tailwind CSS v2.0+ */
import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import axios from 'axios'
import {
  Button,
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
import { getError } from '../../utils/error'
import { apiUrl } from '../../utils/apiUrl'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

interface Props {
  id: string
  user: any
}

interface ModalProps {
  isOpen?: any
  onOpen?: any
  body_text: string
  heading: string
  onClose: any
  ActionButton: any
}

function OrdersDropdown({ id, user }: Props) {
  const history = useRouter()
  const [loading, setLoading] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [modal_body, setModalBody] = useState('')
  const [modal_heading, setModalHeading] = useState('')
  const [modal_button, setModalButton] = useState<any>()
  const [orderStatus, setOrderStatus] = useState('pending')
  const toast = useToast()

  const handle_order_status = async (orderStatus: string) => {
    try {
      setLoading(true)
      await axios.patch(
        `${apiUrl}/api/v2/orders/${id}`,
        {
          status: orderStatus,
        },
        {
          headers: {
            authorization: user?.token,
          },
        }
      )
      setLoading(false)
      // reload the page
      history.push(`/admin/orders/`)
      toast({
        title: 'Order Status.',
        description: `The Current Order has been market as ${orderStatus} `,
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      })
    } catch (error) {
      setLoading(false)
      toast({
        title: 'Failed to deliver.',
        description: getError(error),
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      })
      console.log(error)
    }
  }

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="z-10 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none">
            Actions
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-40 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => history.push(`/order/${id}`)}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    View Order
                  </div>
                )}
              </Menu.Item>
            </div>
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => handle_order_status('completed')}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block cursor-pointer px-4 py-2 text-sm'
                    )}
                  >
                    Mark as delivered
                  </div>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => handle_order_status('intransit')}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block cursor-pointer px-4 py-2 text-sm'
                    )}
                  >
                    Mark as in transit
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => handle_order_status('declined')}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block cursor-pointer px-4 py-2 text-sm'
                    )}
                  >
                    Mark as cancelled
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => handle_order_status('pending')}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Mark as pending
                  </div>
                )}
              </Menu.Item>
            </div>
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="/"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Delete Order
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
        <>
          <StoreModal
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            body_text={modal_body}
            heading={modal_heading}
            ActionButton={modal_button}
          />
        </>
      </Menu>
    </>
  )
}

const StoreModal = ({
  isOpen,
  body_text,
  heading,
  ActionButton,
  onClose,
}: ModalProps) => {
  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{heading}</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="text-center">{body_text}</ModalBody>

          <ModalFooter>
            <Button variant={'ghost'} mr={3} onClick={onClose}>
              Close
            </Button>
            {ActionButton}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default OrdersDropdown
