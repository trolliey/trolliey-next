import React, { useState } from 'react'
import Image from 'next/image'
import logo from '../../public/img/full_logo.png'
import NavSearch from '../../Components/Search/NavSearch'
import { ShoppingCartIcon, BellIcon } from '@heroicons/react/outline'
import { Tooltip } from '@chakra-ui/react'
import NotificationMenu from '../Menus/NotificationMenu'
import UserDropdown from '../Dropdowns/UserDropdown'
import CartSidebar from '../Drawers/CartSidebar'
import MobileNavDrawer from '../Drawers/MobileNavDrawer'

function Navbar() {
  const [notifications_menu, setOpenNotificationMenu] = useState(false)
  const [open_cart, setOpenCart] = useState(false)
  const notifications = []
  const basket = []
  const toggle_cart = () => {
    !open_cart ? setOpenCart(true) : setOpenCart(false)
  }
  return (
    <div className="bg-white shadow ">
      <div className="md:flex hidden flex-row items-center  h-16 lg:px-0 md:16 md:px-4 px-2 space-x-4 max-w-7xl mx-auto justify-between">
        <div className="uppercase cursor-pointer font-bold text-sm text-gray-700 flex flex-row items-center">
          <Image src={logo} alt="logo representing the website icon" height={'30px'} width={'120px'} className="h-8 ml-2" />
        </div>
        <p className='font-semibold text-gray-700 pr-4 border-r border-gray-300 capitalize cursor-pointer'>Help</p>
        
            <div className='font-semibold text-gray-700 capitalize cursor-pointer'>Sell on trolliey</div>
        
        <div className="flex-1"></div>
        <>
          <NavSearch />
        </>
        <Tooltip label={'Notifications'} bg='gray.100' color="gray.700" rounded="lg" size="xs">

          <div onClick={() => !notifications_menu ? setOpenNotificationMenu(true) : setOpenNotificationMenu(false)} className="relative flex p-2 hover:bg-gray-200 cursor-pointer rounded-full">
            <BellIcon height={20} width={20} className="text-gray-700" />
            {
              notifications?.length >= 1 && (
                <span className="absolute right-0 top-0 rounded-full bg-blue-primary w-4 h-4 top right p-0 m-0 text-white text-xs font-semibold text-center">
                  {0}
                </span>
              )
            }
          </div>
        </Tooltip>

        <>
          <NotificationMenu show={notifications_menu} setShow={setOpenNotificationMenu} />
        </>


        {/* //dropdown when suer icon has been presses */}
        <div className="md:flex hidden">
          <UserDropdown />
        </div>

        <div onClick={toggle_cart} className="relative flex p-2 hover:bg-gray-200 cursor-pointer rounded-full">
          <ShoppingCartIcon height={20} width={20} className="text-gray-700" />
          {
            basket?.length >= 1 && (
              <span className="absolute right-0 top-0 rounded-full bg-blue-primary w-4 h-4 top right p-0 m-0 text-white text-xs font-semibold text-center">
                {basket?.length}
              </span>
            )
          }
        </div>

        {/* //sidebar when cart is open */}
        <div className='flex'>
          <CartSidebar open={open_cart} setOpen={setOpenCart} cart={basket} />
        </div>
      </div>

      {/* // navbar for mobile view */}

      <div className="md:hidden flex flex-row items-center h-16 max-w-7xl mx-auto justify-between">
        <div className="flex flex-row items-center space-x-2">
          {/* //drawer when on moblie view */}
          <div className="md:hidden flex pl-4">
            <MobileNavDrawer  />
          </div>
          <div className="relative flex p-4"> </div>
        </div>
        <div className="flex">
          <div  className="uppercase cursor-pointer font-bold text-sm text-gray-700 flex flex-row items-center">
            <Image src={logo} alt="logo representing the website icon" height={'30px'} width={'120px'} className="h-8" />
          </div>
        </div>

        <div className="flex space-x-2 pr-2">

          <div>
            <NavSearch />
          </div>
          <div onClick={toggle_cart} className="relative flex p-2 hover:bg-gray-200 cursor-pointer rounded-full">
            <ShoppingCartIcon height={20} width={20} className="text-gray-700" />
            <span className="absolute right-0 top-0 rounded-full bg-blue-primary w-4 h-4 top right p-0 m-0 text-white text-xs font-semibold text-center">
              {basket?.length}
            </span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Navbar