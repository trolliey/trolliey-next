import React, { ReactElement, useState, useContext, useEffect } from 'react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import {
  useDisclosure,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Spinner,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import { Store } from '../../Context/Store'
import Pagination from '../../components/Pagination/Pagination'
import DeleteModal from '../Modals/DeleteModal'
import { apiUrl } from '../../utils/apiUrl'
import MakeSpecialModal from '../Modals/MakeSpecialModal'
import { getError } from '../../utils/error'
import CouponModal from '../Modals/CouponModal'

interface Props {
  products?: any
  delete_item_from_table?: any
  setPage?: any
  page?: any
  data_info: any
  PER_PAGE: number
  table_loading: boolean
}

export default function AdminProductsTable({
  products,
  delete_item_from_table,
  setPage,
  page,
  data_info,
  PER_PAGE,
  table_loading,
}: Props): ReactElement {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [product_name, setProductName] = useState('')
  const [product_id, setProductId] = useState('')
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  // user info from cookies
  const { state } = useContext(Store)
  const { userInfo } = state

  const confirm_delete_item = async (product_id: string) => {
    try {
      setLoading(true)
      const { data } = await axios.delete(
        `${apiUrl}/api/product/delete/${product_id}`,
        {
          headers: {
            authorization: userInfo?.token,
          },
        }
      )
      delete_item_from_table(product_id)
      setLoading(false)
      onClose()
      toast({
        title: 'Sucesfully deleted.',
        description: 'Product successfully deleted!',
        status: 'success',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })
    } catch (error) {
      console.log(error)
      onClose()
      toast({
        title: 'Error Deleting item.',
        description: 'There was an error deleting the item!',
        status: 'error',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })
      setLoading(false)
    }
  }

  const set_delete_item = (id: string, name: string) => {
    onOpen()
    setProductId(id)
    setProductName(name)
  }

  const toggle_featured = async () => {
    try {
      setLoading(true)
      const { data } = await axios.put(
        `${apiUrl}/api/product/special/${product_id}?toggle_special=${true}`,
        {},
        {
          headers: {
            Authorization: userInfo?.token,
          },
        }
      )
      console.log(data)
      toast({
        title: 'Sucesfully changed!.',
        status: 'success',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast({
        title: getError(error),
        status: 'error',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })
      console.log(getError(error))
    }
  }

  if (table_loading) {
    return (
      <div className="item-center grid h-96 w-full content-center justify-center">
        <Spinner size={'xl'} />
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="w-full overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
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
                <>
                  {products?.map((product: any, index: number) => (
                    <>
                      <tr key={index}>
                        <td
                          className=" px-6 py-4"
                          onClick={() =>
                            router.push(`/product/d/${product?._id}`)
                          }
                        >
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-100">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={product.pictures[0]}
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="max-w-xs overflow-hidden text-sm font-medium text-gray-900">
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
                            <Menu>
                              <MenuButton
                                as={Button}
                                rightIcon={<ChevronDownIcon />}
                              >
                                Actions
                              </MenuButton>
                              <MenuList>
                                <MenuItem
                                  onClick={() =>
                                    router.push(`/product/d/${product?._id}`)
                                  }
                                >
                                  View Product
                                </MenuItem>
                                <MenuItem>
                                  <MakeSpecialModal
                                    product_id={product?._id}
                                    onClick={toggle_featured}
                                    setProductId={setProductId}
                                    product_name={product?.title}
                                    loading={loading}
                                  />
                                </MenuItem>
                                {/* make a menu itoem to open coupon modal */}
                                <MenuItem>
                                  <CouponModal
                                    product_id={product?._id}
                                    setProductId={setProductId}
                                    product_name={product?.title}
                                  />
                                </MenuItem>
                                <MenuDivider />
                                <MenuItem
                                  onClick={() =>
                                    set_delete_item(product._id, product.title)
                                  }
                                >
                                  Delete
                                </MenuItem>
                              </MenuList>
                            </Menu>
                          </div>
                        </td>
                      </tr>
                    </>
                  ))}
                </>
              </tbody>
            </table>

            <DeleteModal
              isOpen={isOpen}
              onClose={onClose}
              onClick={() => confirm_delete_item(product_id)}
              product_name={product_name}
              loading={loading}
            />
          </div>
        </div>
      </div>
      <>
        <Pagination
          className="flex self-center pt-8"
          onPageChange={(page: number) => setPage(page)}
          pageSize={PER_PAGE}
          totalCount={data_info?.total}
          currentPage={page}
        />
      </>
    </div>
  )
}
