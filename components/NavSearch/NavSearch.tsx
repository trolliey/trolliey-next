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
import { apiUrl } from '../../utils/apiUrl'

function NavSearch(): ReactElement {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [search_query, setSearchQuery] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const history = useRouter()
  const [searched_products, setSearchedProducts] = useState<any>()
  const { dispatch } = useContext(Store)
  const router = useRouter()

  const search_handler = () => {
    history.push(
      `/explore?q=${search_query}&sort_order=${
        router.query.sort_order ? router.query.sort_order : ''
      }&sort_value=${
        router.query.sort_value ? router.query.sort_value : ''
      }&category=${router.query.category ? router.query.category : ''}`
    )
    dispatch({ type: 'SET_SEARCH_QUERY', payload: search_query })
  }

  const getData = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await axios.get(
        `${apiUrl}/api/product/all?page=${1}&keyword=${
          search_query ? search_query : ''
        }`
      )
      console.log(data)
      setSearchedProducts(data?.products)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log('error on search', error)
      return
    }
  }

  return (
    <>
      <div
        onClick={onOpen}
        className="flex cursor-pointer flex-row items-center p-2 rounded-full hover:bg-gray-100"
      >
        <div className=" items-center ">
          <SearchIcon height={20} width={20} className="text-gray-700" />
        </div>
       
      </div>

      <Modal isOpen={isOpen} onClose={onClose} size={'lg'}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <form onSubmit={getData} className="flex flex-row items-center">
              <input
                type="text"
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded border-none p-2 outline-none md:p-4 "
                placeholder="Search product, store, category..."
              />
              <button
                type="submit"
                onClick={search_handler}
                className="cursor-pointer"
              >
                <SearchIcon height={20} width={20} className="text-gray-500" />
              </button>
            </form>

            <div className="border-t border-gray-200 bg-white">
              {/* <p className="text-center font-semibold capitalize">
              search results
            </p> */}
    
                <>
                  {loading ? (
                    <>
                      <p className="py-3 text-center text-gray-400">
                        Searching ...
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col">
                        {searched_products?.length < 1 ? (
                          <p className="py-3 text-center text-gray-400">
                            No results found
                          </p>
                        ) : (
                          <>
                            {searched_products?.map(
                              (item: any, index: number) => (
                                <div
                                  onClick={() =>
                                    history.push(`/product/d/${item._id}`)
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
                              )
                            )}
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
                    </>
                  )}
                </>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default NavSearch
