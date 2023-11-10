/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment, useContext, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
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
  useToast,
} from '@chakra-ui/react'
import axios from 'axios'
import { Store } from '../../Context/Store'
import { getError } from '../../utils/error'
import { apiUrl } from '../../utils/apiUrl'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

interface Props {
  id: string
  verified: any
}

function StoresDropdown({ id, verified }: Props) {
  const toast = useToast()
  const history = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [modal_body, setModalBody] = useState('')
  const [modal_heading, setModalHeading] = useState('')
  const [modal_button, setModalButton] = useState<any>()
  const [loading, setLoading] = useState(false)
  const { state } = useContext(Store)
  const { userInfo } = state

  // actions to verify and block store
  const handle_verify_store = async () => {
    try {
      setLoading(true)
      await axios.put(
        `/api/store`,
        { store_id: id, action: 'verify' },
        {
          headers: {
            Authorization: userInfo?.token,
          },
        }
      )
      setLoading(false)
      toast({
        title: 'Succeeded.',
        description: 'Store Verified Successfully',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      })
      onClose()
    } catch (error) {
      console.log(getError(error))
      toast({
        title: 'Failed to verify.',
        description: getError(error),
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      })
      setLoading(false)
    }
  }

  // handle api calls to approve store
  const handle_approve_store = async () => {
    try {
      setLoading(true)
      await axios.put(
        `${apiUrl}/api/store/action`,
        { store_id: id, action: 'approve' },
        {
          headers: {
            Authorization: userInfo?.token,
          },
        }
      )
      setLoading(false)
      toast({
        title: 'Success.',
        description: 'Store Approved Successfully',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      })
      onClose()
    } catch (error) {
      toast({
        title: 'Failed to approve.',
        description: 'Failed to approve store. Contact Support Team!',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      })
      setLoading(false)
    }
    // console.log('the store has been approved and can start selling now')
  }
  const handle_activate_store = async () => {
    try {
      setLoading(true)
      await axios.put(
        `${apiUrl}/api/store/action`,
        { store_id: id, action: 'activate' },
        {
          headers: {
            Authorization: userInfo?.token,
          },
        }
      )
      setLoading(false)
      toast({
        title: 'Success.',
        description: 'Store Activated Successfully',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      })
      onClose()
    } catch (error) {
      toast({
        title: 'Failed to approve.',
        description: 'Failed to activate store. Contact Support Team!',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      })
      setLoading(false)
    }
    // console.log('the store has been approved and can start selling now')
  }
  const handle_deactivate_store = async () => {
    try {
      setLoading(true)
      await axios.put(
        `${apiUrl}/api/store/action`,
        { store_id: id, action: 'deactivate' },
        {
          headers: {
            Authorization: userInfo?.token,
          },
        }
      )
      setLoading(false)
      toast({
        title: 'Success.',
        description: 'Store Deactivated Successfully',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      })
      onClose()
    } catch (error) {
      toast({
        title: 'Failed to approve.',
        description: 'Failed to deactivate store. Contact Support Team!',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      })
      setLoading(false)
    }
    // console.log('the store has been approved and can start selling now')
  }

  //modal to approve store
  const approve_store = () => {
    onOpen()
    setModalBody(
      'By approving. You are allowing certain store to start selling on Trolliey. An email will be sent to them informing them that they can now start selling'
    )
    setModalHeading('Approve Store')
    setModalButton(() => (
      <Button
        onClick={handle_approve_store}
        variant="solid"
        isLoading={loading}
        colorScheme={'blue'}
      >
        Approve Store
      </Button>
    ))
  }

  // modal to activate store
  const activate_store = () => {
    onOpen()
    setModalBody('Are you sure you want to activate the store?')
    setModalHeading('Activate Store')
    setModalButton(() => (
      <Button
        onClick={handle_activate_store}
        variant="solid"
        isLoading={loading}
        colorScheme={'green'}
      >
        Activate Store
      </Button>
    ))
  }

  // modal to deactivate store
  const deactivate_store = () => {
    onOpen()
    setModalBody('Are you sure you want to deactivate the store?')
    setModalHeading('Deactivate Store')
    setModalButton(() => (
      <Button
        onClick={handle_deactivate_store}
        variant="solid"
        isLoading={loading}
        colorScheme={'red'}
      >
        Deactivate Store
      </Button>
    ))
  }

  const block_store = () => {
    onOpen()
    setModalBody('Are you sure you want to block the store?')
    setModalHeading('Block Store')
    setModalButton(() => (
      <Button
        onClick={() => console.log('store blocked')}
        variant="solid"
        isLoading={loading}
        colorScheme={'red'}
      >
        Block Store
      </Button>
    ))
  }

  if (loading) {
    return (
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="z-10 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none">
            Loading...
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
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Loading ...
                  </div>
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
    )
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="z-10 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none">
          Options
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
                  onClick={() => history.push(`/store/${id}/products`)}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  View Store
                </div>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={approve_store}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block cursor-pointer px-4 py-2 text-sm'
                  )}
                >
                  Approve Store
                </div>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={activate_store}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block cursor-pointer px-4 py-2 text-sm'
                  )}
                >
                  Activate Store
                </div>
              )}
            </Menu.Item>
          </div>

          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={block_store}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block cursor-pointer px-4 py-2 text-sm'
                  )}
                >
                  Block Store
                </div>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={deactivate_store}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block cursor-pointer px-4 py-2 text-sm'
                  )}
                >
                  Deactivate Store
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
                  Delete User
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
  )
}

interface ModalProps {
  isOpen?: any
  onOpen?: any
  body_text: string
  heading: string
  onClose: any
  ActionButton: any
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

export default StoresDropdown
