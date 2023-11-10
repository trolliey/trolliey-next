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
  ExclamationCircleIcon,
  CheckCircleIcon,
} from '@heroicons/react/outline'
import { Avatar } from '@chakra-ui/react'
import BlueButton from '../../components/Buttons/BlueButton'
import { useAuthFetch } from '../../hooks/useAuthFetch'
import { apiUrl } from '../../utils/apiUrl'
import GeneralLayout from '../../layouts/GeneralLayout'

export default function Dashboard() {
  const [showMessage, setShowMessage] = useState(false)
  const { state: store_state } = useContext(Store)
  const { userInfo } = store_state
  const history = useRouter()
  var today = new Date()
  var curHr = today.getHours()
  const url = `${apiUrl}/api/store/details`
  const state = useAuthFetch(url, userInfo?.token)

  useEffect(() => {
    if (userInfo.role !== 'seller') {
      setShowMessage(true)
      // history.push('/login')
    }
  }, [userInfo])

  return (
    <>
      {showMessage ? (
        <GeneralLayout
          title="Unauthorized"
          description="You are not authorized to view this page"
        >
          <div className="flex h-[70vh] flex-col items-center justify-center lg:m-auto lg:w-[50%] lg:text-center">
            <ExclamationCircleIcon className="h-20 w-20 text-yellow-500" />
            <p className="text-2xl font-semibold text-gray-700">
              You are not authorized to view this page. You must be a seller to
              view this page.
            </p>
            <BlueButton
              text="Login as a seller"
              onClick={() => history.push('/login')}
              className="mt-4"
            />
          </div>
        </GeneralLayout>
      ) : (
        <DashboardLayout>
          <main className="relative z-0 flex-1 overflow-y-auto pb-8">
            {/* Page header */}
            <div className="w-full flex-1 bg-white shadow lg:border-t lg:border-gray-200">
              <div className="w-full px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
                <div className="py-12 md:flex md:items-center md:justify-between ">
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
                          <div className="ml-3 flex flex-col">
                            <h1 className=" text-xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9 md:text-2xl">
                              Good{' '}
                              {curHr < 12
                                ? ' Morning'
                                : curHr < 18
                                ? ' Afternoon '
                                : 'Evening'}
                              , {userInfo?.name}
                            </h1>
                            <dl className=" flex flex-col sm:flex-row sm:flex-wrap">
                              <dt className="sr-only">Account status</dt>
                              {userInfo?.verified ? (
                                <dd className=" flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6 sm:mt-0">
                                  <CheckCircleIcon
                                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-blue-400"
                                    aria-hidden="true"
                                  />
                                  Verified account
                                </dd>
                              ) : (
                                <dd className=" flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6 sm:mt-0">
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
                    amount={state?.data?.store_info?.amount_to_be_paid}
                    loading={state.status === 'fetching'}
                    bg_color={'bg-red-200'}
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
                    amount={state?.data?.number_of_products}
                    loading={state.status === 'fetching'}
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
                    loading={state.status === 'fetching'}
                    bg_color="bg-indigo-200"
                  />
                  {/* <DashboardCard
                icon={
                  <ShoppingBagIcon
                    className="h-6 w-6 text-cyan-600"
                    aria-hidden="true"
                  />
                }
                name="Orders"
                location="/dashboard/orders"
                amount={state?.data?.store_info?.orders.length}
                loading={state.status === 'fetching'}
                bg_color="bg-cyan-200"
              /> */}
                  {/* <DashboardCard
                icon={
                  <CogIcon
                    className="h-6 w-6 text-gray-600"
                    aria-hidden="true"
                  />
                }
                name="Settings"
                location="/dashboard/settings"
                amount={'store settings'}
                loading={state.status === 'fetching'}
                bg_color="bg-gray-200"
              /> */}
                </div>
              </div>
            </div>
          </main>
        </DashboardLayout>
      )}
    </>
  )
}
