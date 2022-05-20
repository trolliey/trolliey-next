import { Modal, ModalBody, ModalContent, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { SearchIcon } from '@heroicons/react/outline'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { ReactElement, useState, useContext, useEffect } from 'react'
import { Store } from '../../Context/Store'

function NavSearch():ReactElement {
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
    
    useEffect(()=>{
        const getData = async () =>{
            const {data} = await axios.post('/api/products',{
                query: search_query
            })
            setSearchedProducts(data)
        }
        getData()
    },[search_query])

    console.log(searched_products)

    return (
        <>

            <div onClick={onOpen} className="flex p-2 hover:bg-gray-200 cursor-pointer rounded-full">
                <SearchIcon height={20} width={20} className="text-gray-700" />
            </div>

            <Modal isOpen={isOpen} onClose={onClose} size={'lg'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody>
                        <div className="flex flex-row items-center">
                            <input
                                type="text"
                                onChange={e => setSearchQuery(e.target.value)}
                                className='md:p-4 p-2 rounded outline-none border-none w-full '
                                placeholder='Search product, store, category...' />
                            <div onClick={search_handler} className='cursor-pointer'>
                                <SearchIcon height={20} width={20} className="text-gray-500" />
                            </div>
                        </div>
                        <div className="bg-white border-t border-gray-200">
              {/* <p className="text-center font-semibold capitalize">
                search results
              </p> */}
              {search_query === "" ? (
                <p className="text-center text-gray-400 py-3">
                  Nothing has been searched
                </p>
              ) : (
                <div className="flex flex-col">
                  {searched_products?.length < 1 ? (
                    <p className="text-center text-gray-400 py-3">
                      No results found
                    </p>
                  ) : (
                    <>
                      {searched_products?.map((item:any, index:number) => (
                        <div
                        onClick={() => history.push(`/product/description/${item._id}`)}
                          key={index}
                          className="flex cursor-pointer flex-row items-center p-2  hover:bg-gray-100"
                        >
                          {/* <Avatar src={item.picture}   rounded={"md"} /> */}
                          <div className="relative h-16 rounded w-16 bg-gray-50 overflow-hidden">
                            {/* <Image
                              src={item.pictures[0]}
                              layout="fill"
                              objectFit="contain"
                            /> */}
                          </div>
                          <div className="flex flex-col pl-4">
                            <Text
                              noOfLines={1}
                              className="text-gray-800 font-semibold"
                            >
                              {item.title}
                            </Text>
                            <Text noOfLines={1} className="text-gray-400 text-sm">
                              {item.category}
                            </Text>
                            <Text noOfLines={1} className="text-gray-400 text-sm">
                              {item.price}{" "}{item.currency_type}
                            </Text>
                          </div>
                        </div>
                      ))}
                      <div className="my-1"></div>
                      {searched_products?.length > 8 && (
                        <div className="flex flex-col text-center capitalize text-gray-500 pt-2 border-t border-gray-300 cursor-pointer">
                          <p className="text-center">View all results</p>
                        </div>
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