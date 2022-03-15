import React, {
  ReactElement,
  FunctionComponent,
} from 'react'
import BlueButton from '../Buttons/BlueButton'
import ShipmentLayout from '../../layouts/ShipmentLayout'
import truck from '../../public/img/delivery-truck.png'
import Image from 'next/image'

interface Props {
  nextStep?: any
  values?: any
  step: number
  handleChange: any
  prevStep?: any
}

const Address: FunctionComponent<Props> = ({
  nextStep,
  values,
  step,
  handleChange,
  prevStep,
}: Props): ReactElement => {
  return (
    <ShipmentLayout heading="Delivery Info" step={step}>
      <div className="flex w-full flex-col">
        <p className="text-center font-semibold text-gray-700 mb-4">
          How do you want us to handle your order?
        </p>
        <div className="mx-auto flex w-full flex-row items-center justify-between border border-gray-200 bg-white p-2 shadow md:p-4">
          <div className="flex flex-row items-center gap-4 overflow-hidden md:gap-8">
            <div className="picture relative grid h-16 w-16 content-center items-center justify-center rounded-full bg-blue-500">
              <Image
                layout="fill"
                objectFit="contain"
                src={truck}
                alt="truck representation"
                className="h-12 w-12"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-gray-700">
                Bring to my doorstep
              </p>
              <p className="text-xs text-gray-400">
                We will bring to your location.You choose to pay online or pay
                on delivery
              </p>
            </div>
          </div>
          <BlueButton
            text={'Deliver My Order'}
            outline
            onClick={console.log('deliver for me')}
          />
        </div>
        <div className="mx-auto mt-2 flex w-full flex-row items-center justify-between border border-gray-200 bg-white p-2 shadow md:p-4">
          <div className="flex flex-row items-center gap-4 overflow-hidden md:gap-8">
            <div className="picture relative grid h-16 w-16 content-center items-center justify-center rounded-full bg-green-500">
              <Image
                layout="fill"
                objectFit="contain"
                src={truck}
                alt="truck representation"
                className="h-12 w-12"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-gray-700">Collect</p>
              <p className="text-xs text-gray-400">
                Collect at our pickup point.
              </p>
            </div>
          </div>
          <BlueButton
            text={'Collect My Order'}
            onClick={() => console.log('collect my order')}
            outline
          />
        </div>
      </div>

      <form className="flex w-full flex-col p-4">
        <p className="mt-8 mb-4 text-center font-semibold text-gray-700">
          Delivery Info
        </p>
        <div className="mb-6">
          <label
            htmlFor="fullname"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Full Name
          </label>
          <input
            type="fullname"
            id="fullname"
            value={values.full_name}
            onChange={handleChange('full_name')}
            className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900 focus:border-blue-primary focus:ring-blue-primary "
            placeholder="full name"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="fullname"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Contact Phone number
          </label>
          <input
            type="text"
            id="phone_number"
            value={values.contact_number}
            onChange={handleChange('contact_number')}
            className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900 focus:border-blue-primary focus:ring-blue-primary "
            placeholder="phone number"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="fullname"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Physical Address
          </label>
          <input
            type="text"
            id="address"
            value={values.address}
            onChange={handleChange('address')}
            className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900 focus:border-blue-primary focus:ring-blue-primary "
            placeholder="physical address"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="province"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Province
          </label>
          <input
            type="province"
            id="province"
            value={values.province}
            onChange={handleChange('province')}
            className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900 focus:border-blue-primary focus:ring-blue-primary "
            placeholder="Province"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="city"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            City
          </label>
          <input
            type="city"
            id="city"
            placeholder="city"
            value={values.city}
            onChange={handleChange('city')}
            className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900 focus:border-blue-primary focus:ring-blue-primary "
            required
          />
        </div>

        <div className="mt-4 w-full justify-between space-x-4 border-t border-gray-200 pt-4">
          <BlueButton text="Previous" onClick={() => prevStep(values)} />
          <BlueButton text="Next" onClick={() => nextStep(values)} />
        </div>
      </form>
    </ShipmentLayout>
  )
}

export default Address
