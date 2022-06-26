import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { SearchIcon } from '@heroicons/react/outline'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactElement, useState, useContext, useEffect } from 'react'
import { Store } from '../../Context/Store'

function NavSearch(): ReactElement {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [search_query, setSearchQuery] = useState<string>('')
  const history = useRouter()
  const [searched_products, setSearchedProducts] = useState<any>()
  const { dispatch } = useContext(Store)

  const search_handler = () => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: search_query })
    history.push('/explore')
    onClose()
  }

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.post(
        `/api/products?page=${1}&keyword=${search_query ? search_query : ''}`,
        {
          query: search_query,
        }
      )
      setSearchedProducts(data?.products)
    }
    const delayDebounceFn = setTimeout(() => {
      // Send Axios request here
      getData()
    }, 3000)

    return () => clearTimeout(delayDebounceFn)
  }, [search_query])

  return (
    <>
      <div
        onClick={onOpen}
        className="flex cursor-pointer flex-row items-center p-2 md:p-0 "
      >
        <div className="hidden w-full flex-1 flex-row items-center rounded-full border border-gray-300 py-2 px-4 hover:bg-gray-200 md:flex">
          <div className="w-full"></div>
          <SearchIcon height={20} width={20} className="text-gray-500" />
        </div>
        <div className="flex md:hidden">
          <SearchIcon height={20} width={20} className="text-gray-700" />
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={onClose} size={'lg'}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <div className="flex flex-row items-center">
              <input
                type="text"
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded border-none p-2 outline-none md:p-4 "
                placeholder="Search product, store, category..."
              />
              <div onClick={search_handler} className="cursor-pointer">
                <SearchIcon height={20} width={20} className="text-gray-500" />
              </div>
            </div>
            <div className="border-t border-gray-200 bg-white">
              {/* <p className="text-center font-semibold capitalize">
                search results
              </p> */}
              {search_query === '' ? (
                <p className="py-3 text-center text-gray-400">
                  Nothing has been searched
                </p>
              ) : (
                <div className="flex flex-col">
                  {searched_products?.length < 1 ? (
                    <p className="py-3 text-center text-gray-400">
                      No results found
                    </p>
                  ) : (
                    <>
                      {searched_products?.map((item: any, index: number) => (
                        <div
                          onClick={() =>
                            history.push(`/product/description/${item._id}`)
                          }
                          key={index}
                          className="flex cursor-pointer flex-row items-center p-2  hover:bg-gray-100"
                        >
                          {/* <Avatar src={item.picture}   rounded={"md"} /> */}
                          <div className="flex">
                            <div className="relative h-16 w-16 overflow-hidden rounded bg-gray-50">
                              <Image
                                src={item.pictures[0]}
                                layout="fill"
                                objectFit="contain"
                              />
                            </div>
                          </div>
                          <div className="flex flex-col pl-4">
                            <Text
                              noOfLines={1}
                              className="font-semibold text-gray-800"
                            >
                              {item.title}
                            </Text>
                            <Text
                              noOfLines={1}
                              className="text-sm text-gray-400"
                            >
                              {item.category}
                            </Text>
                            <Text
                              noOfLines={1}
                              className="text-sm text-gray-400"
                            >
                              {item.price} {item.currency_type}
                            </Text>
                          </div>
                        </div>
                      ))}
                      <div className="my-1"></div>
                      {searched_products?.length > 8 && (
                        <Link href={'/eplore'}>
                          <a className="pt-2capitalize flex cursor-pointer flex-col border-t border-gray-300 text-center text-gray-500">
                            View all results
                          </a>
                        </Link>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default NavSearch
