import React, { ReactElement, useState } from 'react'
import { TrashIcon, PencilIcon } from '@heroicons/react/outline'
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

interface Props {
  products?: any
}

export default function ProductsTable({ products }: Props): ReactElement {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [product_name, setProductName] = useState('')
  const [product_id, setProductId] = useState('')

  const set_delete_item = (id: string, name: string) => {
    setProductId(id)
    setProductName(name)
    onOpen()
  }

  const delele_item = () => {
    console.log('item deleted')
    setProductId('')
    setProductName('')
  }

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Price/Unit
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    discount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    quantity
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Status
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {products && (
                  <>
                    {products?.map((product: any) => (
                      <tr key={product._id}>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-100">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={product.pictures[0]}
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {product.title}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm text-gray-500">
                            {product.category}
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm text-gray-500">
                            {product.price}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm text-gray-500">
                            {product.discount_price}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm text-gray-500">
                            {product.countInStock}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <span className="inline-flex rounded-full bg-green-700 px-2 text-xs font-semibold leading-5 text-white">
                            Active
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                          <div className="flex flex-row items-center space-x-2">
                            <span
                              onClick={() =>
                                set_delete_item(product.id, product.title)
                              }
                              className="cursor-pointer"
                            >
                              <TrashIcon
                                height={20}
                                width={20}
                                className="text-red-400 "
                              />
                            </span>
                            <span className="cursor-pointer">
                              <PencilIcon
                                height={20}
                                width={20}
                                className="cursor-pointer text-gray-500"
                              />
                            </span>
                          </div>
                        </td>
                        <Modal isOpen={isOpen} onClose={onClose} isCentered>
                          <ModalOverlay />
                          <ModalContent>
                            <ModalBody className="flex w-full  flex-col items-center ">
                              <TrashIcon
                                height={80}
                                width={80}
                                className="text-blue-primary "
                              />
                              <p className="my-4 text-center text-lg font-semibold text-gray-800">
                                Delete
                              </p>
                              <p className="text-center">
                                Are you sure you want to delete product with
                                name {product_name}?
                              </p>
                            </ModalBody>

                            <ModalFooter>
                              <Button
                                colorScheme="blue"
                                mr={3}
                                onClick={onClose}
                              >
                                Close
                              </Button>
                              <Button onClick={delele_item} colorScheme="red">
                                Delete
                              </Button>
                            </ModalFooter>
                          </ModalContent>
                        </Modal>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
