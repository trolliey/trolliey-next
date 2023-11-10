import React, { useContext } from 'react'
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  CogIcon,
  CreditCardIcon,
  XIcon,
  ClipboardListIcon,
  UserIcon,
  ShoppingBagIcon,
  ClockIcon,
  TemplateIcon,
  TrendingUpIcon,
  UserGroupIcon,
} from '@heroicons/react/outline'
import logo from '../../public/img/full logo white.png'
import { Store } from '../../Context/Store'
import { useRouter } from 'next/router'
import Image from 'next/image'

const navigation = [
  { name: 'Home', href: '/admin/home', icon: TemplateIcon, current: false },
  {
    name: 'Manage Stores',
    href: '/admin/stores',
    icon: ClipboardListIcon,
    current: false,
  },
  {
    name: 'Manage Users',
    href: '/admin/users',
    icon: UserGroupIcon,
    current: false,
  },
  {
    name: 'Manage Orders',
    href: '/admin/orders',
    icon: ShoppingBagIcon,
    current: false,
  },
  // { name: 'History', href: '/dashboard/history', icon: ClockIcon, current: false },
  // { name: 'Balances', href: '/dashboard/balances', icon: ScaleIcon, current: false },
  {
    name: 'Manage Products',
    href: '/admin/products',
    icon: CreditCardIcon,
    current: false,
  },
  {
    name: 'Categories',
    href: '/admin/categories',
    icon: TrendingUpIcon,
    current: false,
  },
  // { name: 'Recipients', href: '/dashboard/receipts', icon: UserGroupIcon, current: false },
  // { name: 'Admin Settings', href: '/dashboard/settings', icon: CogIcon },
  // { name: 'Site Management ', href: '/dashboard/settings', icon: CogIcon },
]

const buyer_navigation = [
  {
    name: 'Home',
    href: '/dashboard/buyer-home',
    icon: TemplateIcon,
    current: false,
  },
  { name: 'My Orders', href: '/orders', icon: ShoppingBagIcon, current: false },
  {
    name: 'Purchase History',
    href: '/dashboard/buyer-products',
    icon: ClockIcon,
    current: false,
  },
  // { name: 'User Settings', href: '/dashboard/usersettings', icon: UserIcon },
]

interface Props {
  sidebarOpen: any
  setSidebarOpen: any
}

function AdminSidebar({ sidebarOpen, setSidebarOpen }: Props) {
  const { state } = useContext(Store)
  const { userInfo } = state
  const { pathname } = useRouter()
  const router = useRouter()

  console.log(userInfo?.role)

  return (
    <div className="h-screen bg-black">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-40 flex lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex w-full max-w-xs flex-1 flex-col bg-black pt-5 pb-4">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div
                onClick={() => router.push('/')}
                className="cursor pointer flex flex-shrink-0  px-4"
              >
                <div className="s  relative my-4 h-24">
                  <Image
                    layout="fill"
                    src={logo}
                    alt="dashboard indicator of site name"
                  />
                </div>
              </div>
              {userInfo?.role === 'user' ? (
                <nav
                  className="mt-5 h-full flex-shrink-0 divide-y divide-blue-dark overflow-y-auto"
                  aria-label="Sidebar"
                >
                  <div className="space-y-1 px-2">
                    {buyer_navigation.map((item) => (
                      <div
                        onClick={() => router.push(item.href)}
                        key={item.name}
                        className={`${
                          pathname === item.href ? 'bg-gray-800' : 'bg-black'
                        } group flex cursor-pointer items-center rounded-md px-2 py-2 text-sm font-medium leading-6 text-white`}
                      >
                        <item.icon
                          className="mr-4 h-6 w-6 flex-shrink-0 text-white"
                          aria-hidden="true"
                        />
                        {item.name}
                      </div>
                    ))}
                  </div>
                </nav>
              ) : (
                <nav
                  className="mt-5 h-full flex-shrink-0 divide-y divide-blue-dark overflow-y-auto"
                  aria-label="Sidebar"
                >
                  <div className="space-y-1 px-2">
                    {navigation.map((item) => (
                      <div
                        onClick={() => router.push(item.href)}
                        key={item.name}
                        className={`${
                          pathname === item.href ? 'bg-gray-800' : 'bg-black'
                        } group flex cursor-pointer items-center rounded-md px-2 py-2 text-sm font-medium leading-6 text-white`}
                      >
                        <item.icon
                          className="mr-4 h-6 w-6 flex-shrink-0 text-white"
                          aria-hidden="true"
                        />
                        {item.name}
                      </div>
                    ))}
                  </div>
                </nav>
              )}
            </div>
          </Transition.Child>
          <div className="w-14 flex-shrink-0" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex w-64 flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-grow flex-col overflow-y-auto bg-black pt-5 pb-4">
            <div
              onClick={() => router.push('/')}
              className="flex flex-shrink-0 items-center"
            >
              <div className="relative mx-auto h-40 self-center py-2">
                <Image
                  height={140}
                  width={140}
                  objectFit="contain"
                  src={logo}
                  alt="dashboard indicator of site name"
                />
              </div>
            </div>
            {userInfo?.role === 'user' ? (
              <nav
                className="mt-5 flex flex-1 flex-col divide-y divide-blue-dark overflow-y-auto"
                aria-label="Sidebar"
              >
                <div className="space-y-1 px-2">
                  {buyer_navigation.map((item) => (
                    <div
                      onClick={() => router.push(item.href)}
                      key={item.name}
                      className={`${
                        pathname === item.href
                          ? 'bg-gray-800'
                          : 'bg-black hover:bg-gray-800 '
                      } group flex cursor-pointer items-center rounded-md px-2 py-2 text-sm font-medium leading-6 text-white`}
                    >
                      <item.icon
                        className="mr-4 h-6 w-6 flex-shrink-0 text-white"
                        aria-hidden="true"
                      />
                      {item.name}
                    </div>
                  ))}
                </div>
              </nav>
            ) : (
              <nav
                className="mt-5 flex flex-1 flex-col divide-y divide-blue-dark overflow-y-auto"
                aria-label="Sidebar"
              >
                <div className="space-y-1 px-2">
                  {navigation.map((item) => (
                    <div
                      onClick={() => router.push(item.href)}
                      key={item.name}
                      className={`${
                        pathname === item.href
                          ? 'bg-gray-800'
                          : 'bg-black hover:bg-gray-800 '
                      } group flex cursor-pointer items-center rounded-md px-2 py-2 text-sm font-medium leading-6 text-white`}
                    >
                      <item.icon
                        className="mr-4 h-6 w-6 flex-shrink-0 text-white"
                        aria-hidden="true"
                      />
                      {item.name}
                    </div>
                  ))}
                </div>
              </nav>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminSidebar
