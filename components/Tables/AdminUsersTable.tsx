import React, { ReactElement, useState } from 'react'
import { TrashIcon, PencilIcon } from '@heroicons/react/outline'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Button,
} from '@chakra-ui/react'
import moment from 'moment'

interface Props {
  users?: any
}
function AdminUsersTable({ users }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [user_name, setuserName] = useState('')
  const [user_id, setuserId] = useState('')

  const set_delete_item = (id: string, name: string) => {
    setuserId(id)
    setuserName(name)
    onOpen()
  }

  const delele_item = () => {
    console.log('item deleted')
    setuserId('')
    setuserName('')
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
                    email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    createdAt
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
                {users && (
                  <>
                    {users?.map((user: any) => (
                      <tr key={user._id}>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-100">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={user.photoURL}
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {user.name}
                              </div>
                            </div>
                          </div>
                        </td>
                     

                        <td className=" px-6 py-4">
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm text-gray-500">
                            {user.role}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm text-gray-500">
                            {moment(user.createdAt).fromNow()}
                          </div>
                        </td>
                       
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                          <div className="flex flex-row items-center space-x-2">
                            <span
                              onClick={() =>
                                set_delete_item(user.id, user.title)
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
                                Are you sure you want to delete user
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

export default AdminUsersTable
