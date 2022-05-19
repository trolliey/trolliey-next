import React, { useContext, useEffect, useState } from 'react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import Cookies from 'js-cookie'
import { Store } from '../../Context/Store'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

function CurrencyDropdown() {
  const [new_currency, setNewCurrency] = useState<any>('')
  const { state, dispatch } = useContext(Store)
  const { currency } = state

  useEffect(() => {
    setNewCurrency(currency)
  }, [new_currency, currency])

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            {new_currency ? new_currency : 'Select Currency'}
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 flex w-24 origin-top-right flex-col items-center rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => {
                      Cookies.set('trolliey_currency', 'USD')
                      dispatch({ type: 'CHANGE_CURRENCY', payload: 'USD' })
                      setNewCurrency('USD')
                    }}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block cursor-pointer px-4 py-2 text-sm'
                    )}
                  >
                    USD
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => {
                      Cookies.set('trolliey_currency', 'ZWL')
                      dispatch({ type: 'CHANGE_CURRENCY', payload: 'ZWL' })
                      setNewCurrency('ZWL')
                    }}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block cursor-pointer px-4 py-2 text-sm'
                    )}
                  >
                    ZWL
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => {
                      Cookies.set('trolliey_currency', 'ANY')
                      dispatch({ type: 'CHANGE_CURRENCY', payload: 'ANY' })
                      setNewCurrency('ANY')
                    }}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block cursor-pointer px-4 py-2 text-sm'
                    )}
                  >
                    ANY
                  </div>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  )
}

export default CurrencyDropdown
