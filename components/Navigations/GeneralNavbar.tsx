import React, { useContext, useState } from 'react'
import { ShoppingCartIcon, BellIcon, XIcon } from '@heroicons/react/outline'
import { Container, Tooltip } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
const NotificationMenu = dynamic(() => import('../Menus/NotificationMenu'))
const UserDropdown = dynamic(() => import('../Dropdowns/UserDropdown'))
const MobileNavDrawers = dynamic(() => import('../Drawers/MobileNavDrawers'))
const CurrencyDropdown = dynamic(() => import('../Dropdowns/CurrencyDropdown'))
import NavSearch from '../NavSearch/NavSearch'
import Image from 'next/image'
import logo from '../../public/img/full_logo.png'
import CartSidebar from '../Sidebars/CartSidebar'
import { Store } from '../../Context/Store'
import Link from 'next/link'
import particles from '../../public/img/circle-scatter-haikei.svg'

interface Props {
  component_above_navbar?: any
  scrollY?: any,
  close_message?:any,
  setCloseMessage?:any
}

function GeneralNavbar({ component_above_navbar, scrollY, setCloseMessage, close_message }: Props) {
  const { state } = useContext(Store)
  const { cart, userInfo } = state
  const basket: any[] = []
  const [open_cart, setOpenCart] = useState<boolean>(false)

  const toggle_cart = () => {
    !open_cart ? setOpenCart(true) : setOpenCart(false)
  }

  return (
    <div className="fixed top-0 z-50 w-full bg-white shadow">
      {component_above_navbar && (
        <>
          {scrollY < 110 && (
            <>
              {!close_message && (
                <div
                  className="bg-blue-superlight"
                  style={{
                    backgroundImage: `url(${particles.src})`,
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <Container
                    maxW="container.xl"
                    className="mx-auto flex flex-row items-center justify-between py-4"
                  >
                    <p className="font-bold text-blue-dark sm:text-xs md:text-base">
                      Free delivery for total above $50
                    </p>
                    <div className="flex flex-row items-center space-x-2 md:space-x-4">
                      <Link href={'/explore'} passHref>
                        <a>
                          <div className="rounded-full bg-blue-dark px-2 py-1 text-xs font-semibold text-white md:text-base">
                            View more
                          </div>
                        </a>
                      </Link>
                      <div
                        className="flex"
                        onClick={() => setCloseMessage(true)}
                      >
                        <XIcon
                          height={20}
                          width={20}
                          className="text-blue-dark"
                        />
                      </div>
                    </div>
                  </Container>
                </div>
              )}
            </>
          )}
        </>
      )}
      <div className="md:16 mx-auto hidden h-16  max-w-7xl flex-row items-center justify-between space-x-4 py-4 px-2 md:flex md:px-4 lg:px-0">
        <Link href={'/'}>
          <a className="flex cursor-pointer flex-row items-center text-sm font-bold uppercase text-gray-700">
            <Image
              width={100}
              objectFit="contain"
              src={logo}
              alt="logo representing the website icon"
              className="ml-2 h-8"
            />
          </a>
        </Link>
        {/* <div onClick={() => history.push('/help')} className='font-semibold text-gray-700 pr-4 border-r border-gray-300 capitalize cursor-pointer'>Help</div> */}
        <CurrencyDropdown />

        {userInfo?.role === 'seller' ? (
          <Link href={'/dashboard'}>
            <a className="cursor-pointer font-semibold capitalize text-gray-700">
              My Store Dashboard
            </a>
          </Link>
        ) : (
          <Link href={'/applytosell'}>
            <a className="cursor-pointer font-semibold capitalize text-gray-700">
              Sell on trolliey
            </a>
          </Link>
        )}
        {/* <div className="flex-1"></div> */}
        <div className='flex flex-1 flex-col'>
          <NavSearch />
        </div>

        <div
          onClick={toggle_cart}
          className="relative flex cursor-pointer rounded-full p-2 hover:bg-gray-200"
        >
          <ShoppingCartIcon height={20} width={20} className="text-gray-700" />
          {cart?.cartItems?.length > 0 && (
            <span className="top right absolute right-0 top-0 m-0 h-4 w-4 rounded-full bg-blue-primary p-0 text-center text-xs font-semibold text-white">
              {cart?.cartItems?.length}
            </span>
          )}
        </div>

        {/* //dropdown when suer icon has been presses */}
        <div className="hidden md:flex">
          <UserDropdown />
        </div>

        {/* //drawer when on moblie view */}
        <div className="flex md:hidden">
          <MobileNavDrawers user={userInfo} />
        </div>

        {/* //sidebar when cart is open */}
        <div>
          <CartSidebar open={open_cart} setOpen={setOpenCart} cart={basket} />
        </div>
      </div>

      <div className="mx-auto flex h-16 max-w-7xl flex-row items-center justify-between md:hidden">
        <div className="flex flex-row items-center space-x-2">
          {/* //drawer when on moblie view */}
          <div className="flex pl-4 md:hidden">
            <MobileNavDrawers user={userInfo} />
          </div>
          <div className="relative flex p-4"> </div>
        </div>
        <div className="flex">
          <Link href={'/'}>
            <a className="flex cursor-pointer flex-row items-center text-sm font-bold uppercase text-gray-700">
              <Image
                height={30}
                objectFit="contain"
                src={logo}
                alt="logo representing the website icon"
                className="h-8"
              />
            </a>
          </Link>
        </div>

        <div className="flex space-x-2 pr-2">
          <div>
            <NavSearch />
          </div>
          <div
            onClick={toggle_cart}
            className="relative flex cursor-pointer rounded-full p-2 hover:bg-gray-200"
          >
            <ShoppingCartIcon
              height={20}
              width={20}
              className="text-gray-700"
            />
            {cart?.cartItems?.length > 0 && (
              <span className="top right absolute right-0 top-0 m-0 h-4 w-4 rounded-full bg-blue-primary p-0 text-center text-xs font-semibold text-white">
                {cart?.cartItems?.length}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GeneralNavbar
