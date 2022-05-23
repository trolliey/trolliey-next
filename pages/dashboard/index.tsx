import React, { useContext, useEffect, useState } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import { Store } from '../../Context/Store'
import { useRouter } from 'next/router'
import DashboardCard from '../../components/DashboardCard/DashboardCard'
import {
  ScaleIcon,
  PencilIcon,
  ArchiveIcon,
  CreditCardIcon,
  ShoppingBagIcon,
  CogIcon,
  CheckCircleIcon,
} from '@heroicons/react/outline'
import { Avatar } from '@chakra-ui/react'
import BlueButton from '../../components/Buttons/BlueButton'
import axios from 'axios'
import { getError } from '../../utils/error'

export default function Dashboard() {
  const { state } = useContext(Store)
  const { userInfo } = state
  const [loading, setLoading] = useState<boolean>(false)
  const [store_data, setStore_Data] = useState<any>()
  const history = useRouter()

  useEffect(() => {
    setLoading(true)
    const getStoreDAta = async () => {
      try {
        const { data } = await axios.get(`/api/store/dashboard`, {
          headers: {
            authorization: userInfo?.token,
          },
        })
        setStore_Data(data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log(getError(error))
      }
    }
    getStoreDAta()
  }, [])

  return (
    <DashboardLayout>
      <main className="relative z-0 flex-1 overflow-y-auto pb-8">
        {/* Page header */}
        <div className="bg-white shadow">
          <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
            <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
              <div className="min-w-0 flex-1">
                {/* Profile */}
                <div className="flex items-center">
                  <div className="hidden rounded-full sm:block">
                    <Avatar
                      size="lg"
                      src={userInfo?.photoURL}
                      name={userInfo?.name}
                    />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <div className="rounded-full sm:hidden">
                        <Avatar
                          size="lg"
                          src={userInfo?.photoURL}
                          name={userInfo?.name}
                        />
                      </div>
                      <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                        Good morning, {userInfo?.name}
                      </h1>
                    </div>
                    <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                      <dt className="sr-only">Account status</dt>
                      {userInfo?.verified ? (
                        <dd className="mt-3 flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6 sm:mt-0">
                          <CheckCircleIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-blue-400"
                            aria-hidden="true"
                          />
                          Verified account
                        </dd>
                      ) : (
                        <dd className="mt-3 flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6 sm:mt-0">
                          <CheckCircleIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          Account not verified
                        </dd>
                      )}
                    </dl>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                <div className="mr-2 flex">
                  {userInfo?.role === 'user' ? (
                    <BlueButton
                      text="Add Product"
                      outline
                      onClick={() =>
                        history.push(
                          '/login?redirect=/dashboard/inventory/create'
                        )
                      }
                    />
                  ) : (
                    <BlueButton
                      text="Add Product"
                      outline
                      onClick={() =>
                        history.push('/dashboard/inventory/create')
                      }
                    />
                  )}
                </div>
                <div className="flex">
                  <BlueButton
                    text="Manage Account"
                    onClick={() => history.push('/dashboard/settings')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg font-medium leading-6 text-gray-900">
              Overview
            </h2>
            <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {/* Card */}
              <DashboardCard
                name="Account balance"
                icon={
                  <ScaleIcon
                    className="h-6 w-6 text-red-600"
                    aria-hidden="true"
                  />
                }
                location="dashboard/reports"
                amount={0}
                loading={loading}
                bg_color={'bg-red-200'}
              />
              <DashboardCard
                name="Page visits"
                icon={
                  <PencilIcon
                    className="h-6 w-6 text-green-600"
                    aria-hidden="true"
                  />
                }
                location="/dashboard/reports"
                amount={0}
                loading={loading}
                bg_color={'bg-green-200'}
              />
              <DashboardCard
                icon={
                  <ArchiveIcon
                    className="h-6 w-6 text-blue-600"
                    aria-hidden="true"
                  />
                }
                name="Total products"
                location="/dashboard/inventory"
                amount={store_data?.store_products?.length}
                loading={loading}
                bg_color="bg-blue-200"
              />
              <DashboardCard
                icon={
                  <CreditCardIcon
                    className="h-6 w-6 text-indigo-600"
                    aria-hidden="true"
                  />
                }
                name="Cards & Payments"
                location="/dashboard/cards"
                amount={0}
                loading={loading}
                bg_color="bg-indigo-200"
              />
              <DashboardCard
                icon={
                  <ShoppingBagIcon
                    className="h-6 w-6 text-cyan-600"
                    aria-hidden="true"
                  />
                }
                name="Orders"
                location="/dashboard/orders"
                amount={store_data?.store?.orders.length}
                loading={loading}
                bg_color="bg-cyan-200"
              />
              <DashboardCard
                icon={
                  <CogIcon
                    className="h-6 w-6 text-gray-600"
                    aria-hidden="true"
                  />
                }
                name="Settings"
                location="/dashboard/settings"
                amount={'store settings'}
                loading={loading}
                bg_color="bg-gray-200"
              />
            </div>
          </div>
        </div>
      </main>
    </DashboardLayout>
  )
}
