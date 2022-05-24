import React, { ReactElement, useContext, useState } from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Divider,
  DrawerFooter,
  DrawerHeader,
  Avatar,
} from '@chakra-ui/react'
import {
  MenuIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
} from '@heroicons/react/outline'
import { UserCircleIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import Username from '../Username/Username'
import { data } from '../../utils/data'
import logo from '../../public/img/full_logo.png'
import Image from 'next/image'
import { Store } from '../../Context/Store'
import Cookies from 'js-cookie'

interface Props {
  user?: any
}

function MobileNavDrawers({ user }: Props): ReactElement {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [show_category, setShowCotegory] = useState(false)
  const [show_currencies, serShowCurrencies] = useState(false)
  const history = useRouter()
  const { state, dispatch } = useContext(Store)

  return (
    <>
      <div onClick={onOpen}>
        <MenuIcon height={20} width={20} className="text-gray-700" />
      </div>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader bg={'white'}>
            {/* <p className="text-lg font-semibold text-gray-700 uppercase mx-auto text-center my-4">logo</p> */}
            <div className="font-myriad-pro flex py-2 font-extrabold text-black">
              <Image
                height={20}
                objectFit="contain"
                src={logo}
                alt="logo for mobile drawer"
              />
            </div>
          </DrawerHeader>
          {show_currencies ? (
            <DrawerBody bg={'white'} p={0}>
              <Divider />
              <div className="flex flex-row items-center gap-8 bg-white py-4 px-4">
                <Avatar size="sm" name={user?.name} />
                {user ? (
                  <Username username={user?.name} />
                ) : (
                  <Username username={'Guest User'} />
                )}
              </div>
              <Divider />
              <div className="flex flex-row items-center">
                <span onClick={() => serShowCurrencies(false)} className="ml-2">
                  <ArrowLeftIcon height={20} width={20} />
                </span>
                <p className="my-4 mx-auto text-center font-semibold capitalize text-gray-700 ">
                  Change Default Currency
                </p>
              </div>
              <div className="flex w-full flex-col items-center">
                <div
                  onClick={() => {
                    dispatch({ type: 'CHANGE_CURRENCY', payload: 'ZWL' })
                  }}
                  className="zwl py-2"
                >
                  ZWL
                </div>
                <div
                  onClick={() => {
                    dispatch({ type: 'CHANGE_CURRENCY', payload: 'USD' })
                  }}
                  className="usd py-2 "
                >
                  USD
                </div>
              </div>
            </DrawerBody>
          ) : (
            <>
              {show_category ? (
                <DrawerBody bg={'white'} p={0}>
                  <Divider />
                  <div className="flex flex-row items-center gap-8 bg-white py-4 px-4">
                    <Avatar size="sm" name={user?.name} />
                    {user ? (
                      <Username username={user?.name} />
                    ) : (
                      <Username username={'Guest User'} />
                    )}
                  </div>
                  <Divider />
                  <div className="flex flex-row items-center">
                    <span
                      onClick={() => setShowCotegory(false)}
                      className="ml-2"
                    >
                      <ArrowLeftIcon height={20} width={20} />
                    </span>
                    <p className="my-4 mx-auto text-center font-semibold capitalize text-gray-700 ">
                      a list of categories
                    </p>
                  </div>
                  <div className="px-4">
                    {data?.categories.map((category, index) => (
                      <div
                        key={index}
                        className="flex cursor-pointer flex-row items-center justify-between gap-2 py-2 px-4 text-sm hover:bg-gray-100"
                      >
                        <div
                          onClick={() => console.log(category.name)}
                          className="flex flex-row items-center"
                        >
                          <div className="relative mr-2    h-6 w-6">
                            <Image
                              src={category.icon}
                              layout="fill"
                              alt={category.name}
                            />
                          </div>
                          <p className="capitalize">{category.name}</p>
                        </div>
                        <ChevronRightIcon
                          height={16}
                          width={16}
                          className="text-gray-400"
                        />
                      </div>
                    ))}
                  </div>
                  show_category{' '}
                </DrawerBody>
              ) : (
                <DrawerBody bg={'gray.200'} p={0}>
                  <Divider />
                  <div className="mt-4 mb-4 flex flex-row items-center space-x-2 bg-white py-4 px-4">
                    <Avatar size="sm" name={user?.name} />
                    {user ? (
                      <Username username={user?.name} />
                    ) : (
                      <Username username={'Guest User'} />
                    )}
                  </div>
                  <Divider />
                  {user?.role === 'seller' ? (
                    <div
                      onClick={() => history.push('/dashboard')}
                      className="flex flex-row items-center justify-between bg-white py-4 px-4 text-sm font-semibold capitalize text-gray-700"
                    >
                      <p>Sell on trolliey</p>
                      <ChevronRightIcon height={20} width={20} />
                    </div>
                  ) : (
                    <div
                      onClick={() => history.push('/become-a-seller')}
                      className="flex flex-row items-center justify-between bg-white py-4 px-4 text-sm font-semibold capitalize text-gray-700"
                    >
                      <p>Sell on trolliey</p>
                      <ChevronRightIcon height={20} width={20} />
                    </div>
                  )}
                  <Divider />
                  <div
                    onClick={() => history.push('/explore')}
                    className="flex flex-row items-center justify-between bg-white py-4 px-4 text-sm font-semibold capitalize text-gray-700"
                  >
                    <p>explore products</p>
                    <ChevronRightIcon height={20} width={20} />
                  </div>
                  <Divider />
                  <div
                    onClick={() => setShowCotegory(true)}
                    className="flex flex-row items-center justify-between bg-white py-4 px-4 text-sm font-semibold capitalize text-gray-700"
                  >
                    <p>shop by categories</p>
                    <ChevronRightIcon height={20} width={20} />
                  </div>
                  <Divider />

                  <div
                    onClick={() => serShowCurrencies(true)}
                    className="flex flex-row items-center justify-between bg-white py-4 px-4 text-sm font-semibold capitalize text-gray-700"
                  >
                    <p>Preferred Currecy</p>
                    <ChevronRightIcon height={20} width={20} />
                  </div>
                  <Divider />

                  <div
                    onClick={() => history.push('/help')}
                    className="flex flex-row items-center justify-between bg-white py-4 px-4 text-sm font-semibold capitalize text-gray-700"
                  >
                    <p>Help</p>
                    <ChevronRightIcon height={20} width={20} />
                  </div>
                  <Divider />

                  <Divider />
                </DrawerBody>
              )}
            </>
          )}
          <Divider />
          <DrawerFooter width={'full'} borderTopColor={'gray.200'}>
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center rounded-full border border-gray-300">
                <UserCircleIcon
                  height={28}
                  width={28}
                  className="text-gray-700"
                />
                <div className="pr-2 font-semibold ">
                  {user ? (
                    <div
                      className="flex"
                      onClick={() => history.push('/dashboard')}
                    >
                      <Username username={user.name} />
                    </div>
                  ) : (
                    <Username username={'Register'} />
                  )}
                </div>
              </div>
              <div className="flex-1"></div>
              {user ? (
                <p
                  onClick={() => history.push('/login')}
                  className="ml-8 font-bold text-gray-700"
                >
                  Logout
                </p>
              ) : (
                <p
                  onClick={() => history.push('/login')}
                  className="ml-8 font-bold text-gray-700"
                >
                  Join/Login
                </p>
              )}
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default MobileNavDrawers
