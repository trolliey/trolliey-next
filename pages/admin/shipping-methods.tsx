import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { Store } from '../../Context/Store'
import AdminDashboard from '../../layouts/AdminDashboard'
import { apiUrl } from '../../utils/apiUrl'
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

function ShipingMethods() {
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
  const [shipingMethods, setShipingMethods] = React.useState<ShippingMethod[]>(
    []
  )
  const [shippingMethodName, setShippingMethodName] = React.useState('')
  const [price, setPrice] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [duration, setDuration] = React.useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure()
  const toast = useToast()

  const getShippingMethods = () => {
    axios
      .get(`${apiUrl}/api/v2/shipping`, {
        headers: {
          authorization: `${userInfo.token}`,
        },
      })
      .then(({ data }) => {
        setShipingMethods(data?.data?.shippings)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const addShippingMethod = () => {
    setLoading(true)
    axios
      .post(
        `${apiUrl}/api/v2/shipping`,
        {
          name: shippingMethodName,
          price: price,
          description: description,
          duration: '1-3 days',
          pricing_method: 'flat_rate',
          active: 1,
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
        setShipingMethods([...shipingMethods, data?.data?.shipping])
        onClose()
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getShippingMethods()
  }, [shippingMethodName])

  const deleteShippingMethod = (id: string) => {
    // ask for confirmation
    alert('Are you sure you want to delete this shipping method?')
    axios
      .delete(`${apiUrl}/api/v2/shipping/${id}`, {
        headers: {
          authorization: `${userInfo.token}`,
        },
      })
      .then(({ data }) => {
        toast({
          title: 'Shipping Method Deleted',
          description: 'Shipping Method Deleted Successfully',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        })
        setShipingMethods(shipingMethods.filter((item) => item.id !== id))
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const editShippingMethod = (id: string) => {
    axios
      .put(
        `${apiUrl}/api/v2/shipping/${id}`,
        {
          name: shippingMethodName,
          price: price,
          description: description,
          duration: '1-3 days',
          pricing_method: 'flat_rate',
          active: 1,
        },
        {
          headers: {
            authorization: `${userInfo.token}`,
          },
        }
      )
      .then(({ data }) => {
        toast({
          title: 'Shipping Method Updated',
          description: 'Shipping Method Updated Successfully',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        })
        setShipingMethods(shipingMethods.filter((item) => item.id !== id))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <AdminDashboard>
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-between">
          <p className="my-4 text-center text-lg font-semibold capitalize text-gray-700">
            Shipping Methods
          </p>
          <button
            onClick={onOpen}
            className="rounded bg-blue-500 px-4 py-2 text-white"
          >
            Add Shipping Method
          </button>
        </div>
        <div className="min-h-screen">
          <table className="w-full table-auto border-collapse text-left">
            <thead>
              <tr className="bg-[#222] text-sm text-white">
                <th className="py-2 px-3">Name</th>
                <th className="py-2 px-3">Price</th>
                <th className="py-2 px-3">Description</th>

                <th className="py-2 px-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {shipingMethods?.map((shipingMethod: any, index: number) => (
                <tr key={index} className="border-b text-sm">
                  <td className="truncate py-3 px-3">{shipingMethod.name}</td>
                  <td className="py-3 px-3">
                    {shipingMethod.price} {currency}
                  </td>
                  <td className="truncate py-3 px-3">
                    {shipingMethod.description}
                  </td>
                  <td className="mt-3 flex">
                    <button className="mr-5 rounded bg-red-500 px-4 py-2 text-white">
                      <TrashIcon
                        height={20}
                        width={20}
                        className="text-white"
                      />
                    </button>
                    <button
                      onClick={() => {
                        onOpenEdit()
                        setShippingMethodName(shipingMethod.name)
                        setPrice(shipingMethod.price)
                        setDescription(shipingMethod.description)
                      }}
                      className="rounded bg-orange-500 px-4 py-2 text-white"
                    >
                      <PencilAltIcon
                        height={20}
                        width={20}
                        className="text-white"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Shipping Method</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700">
                  Shipping Method Name
                </label>
                <input
                  onChange={(e) => setShippingMethodName(e.target.value)}
                  className="mt-2 rounded border border-gray-300 px-3 py-2"
                  type="text"
                  placeholder="Shipping Method Name"
                />

                <label className="mt-4 text-sm font-semibold text-gray-700">
                  Shipping Method Price
                </label>
                <input
                  onChange={(e) => setPrice(e.target.value)}
                  className="mt-2 rounded border border-gray-300 px-3 py-2"
                  type="number"
                  placeholder="Shipping Method Price"
                />
                <label className="mt-4 text-sm font-semibold text-gray-700">
                  Shipping Duration
                </label>
                <input
                  onChange={(e) => setDuration(e.target.value)}
                  className="mt-2 rounded border border-gray-300 px-3 py-2"
                  type="number"
                  placeholder="e.g 3 days"
                />

                <label className="mt-4 text-sm font-semibold text-gray-700">
                  Shipping Method Description
                </label>
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-2 rounded border border-gray-300 px-3 py-2"
                  placeholder="Shipping Method Description"
                ></textarea>

                <button
                  onClick={addShippingMethod}
                  className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
                >
                  {loading
                    ? 'Adding Shipping Method...'
                    : 'Add Shipping Method'}
                </button>
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
        <Modal isOpen={isOpenEdit} onClose={onCloseEdit}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Shipping Method</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700">
                  Shipping Method Name
                </label>
                <input
                  onChange={(e) => setShippingMethodName(e.target.value)}
                  className="mt-2 rounded border border-gray-300 px-3 py-2"
                  type="text"
                  placeholder="Shipping Method Name"
                />

                <label className="mt-4 text-sm font-semibold text-gray-700">
                  Shipping Method Price
                </label>
                <input
                  onChange={(e) => setPrice(e.target.value)}
                  className="mt-2 rounded border border-gray-300 px-3 py-2"
                  type="number"
                  placeholder="Shipping Method Price"
                />

                <label className="mt-4 text-sm font-semibold text-gray-700">
                  Shipping Method Description
                </label>
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-2 rounded border border-gray-300 px-3 py-2"
                  placeholder="Shipping Method Description"
                ></textarea>

                <button
                  // onClick={()=>updateShippingMethod(id)}
                  className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
                >
                  {loading ? 'Updating Shipping Method...' : 'Update'}
                </button>
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </AdminDashboard>
  )
}

export default ShipingMethods
