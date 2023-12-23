import React from 'react'
import AdminDashboard from '../../../layouts/AdminDashboard'
import {
  UserGroupIcon,
  ClipboardListIcon,
  DatabaseIcon,
  ShoppingCartIcon,
  CurrencyDollarIcon,
  StarIcon,
  PaperClipIcon,
} from '@heroicons/react/outline'
import { useRouter } from 'next/router'

interface HomeItemProps {
  heading?: string
  icon?: any
  description?: any
  location?: any
}

const home_links = [
  {
    heading: 'Products',
    description: 'All products in the platform show here and you can manage',
    icon: <DatabaseIcon height={28} width={28} className="text-gray-700" />,
    location: '/admin/products',
  },
  {
    heading: 'Ads',
    description: 'Add and remove ads from explore page',
    icon: (
      <ClipboardListIcon height={28} width={28} className="text-gray-700" />
    ),
    location: '/admin/ads',
  },
  {
    heading: 'Users',
    description: 'Manage users and their roles',
    icon: <UserGroupIcon height={28} width={28} className="text-gray-700" />,
    location: '/admin/users',
  },
  {
    heading: 'Stores',
    description: 'Manage individual stores and how they behave',
    icon: <ShoppingCartIcon height={28} width={28} className="text-gray-700" />,
    location: '/admin/stores',
  },
  {
    heading: 'Shipping Methods',
    description: 'Manage shipping methods and their rates',
    icon: <ShoppingCartIcon height={28} width={28} className="text-gray-700" />,
    location: '/admin/shipping-methods',
  },
  {
    heading: 'Rate',
    description: 'Manage exchange rates',
    icon: (
      <CurrencyDollarIcon height={28} width={28} className="text-gray-700" />
    ),
    location: '/admin/rates',
  },
  {
    heading: 'Reviews',
    description: 'Manage reviews and ratings',
    icon: <StarIcon height={28} width={28} className="text-gray-700" />,
    location: '/admin/reviews',
  },
  {
    heading: 'Legal',
    description: 'Manage legal documents',
    icon: <PaperClipIcon height={28} width={28} className="text-gray-700" />,
    location: '/admin/legal',
  },
]

function AdminHome() {
  return (
    <AdminDashboard>
      <p className="mt-8 text-center text-xl font-semibold text-gray-700">
        Welcome to the admin dashboard
      </p>
      <p className="mb-8 text-center text-sm text-gray-400">
        What do you want to manage today?
      </p>
      <div className="grid w-full grid-cols-1 gap-8 px-4 md:grid-cols-4">
        {home_links?.map((link: any, index: number) => (
          <HomeItem
            location={link.location}
            key={index}
            icon={link.icon}
            heading={link.heading}
            description={link.description}
          />
        ))}
      </div>
    </AdminDashboard>
  )
}

const HomeItem = ({ heading, icon, description, location }: HomeItemProps) => {
  const history = useRouter()
  return (
    <div
      onClick={() => history.push(location)}
      className="col-span-1 flex cursor-pointer gap-4 rounded bg-white p-4"
    >
      <div className="flex flex-col">
        <div className="flex flex-col rounded-full bg-gray-100 p-2">{icon}</div>
      </div>
      <div className="flex flex-col">
        <p className="text-lg font-semibold capitalize text-gray-900">
          {heading}
        </p>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  )
}

export default AdminHome
