import React, { ReactElement, FunctionComponent } from 'react'
import BlueButton from '../Buttons/BlueButton'
import ShipmentLayout from '../../layouts/ShipmentLayout'
import { Radio, RadioGroup, Stack } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'

interface Props {
  nextStep?: any
  values?: any
  step: number
  handleChange: any
  prevStep?: any
  setCollectMyOrder?: any
  collect_my_order?: any
  setPaymentMethod?: any
  payment_method?: any
}

const Address: FunctionComponent<Props> = ({
  nextStep,
  values,
  step,
  handleChange,
  prevStep,
  setCollectMyOrder,
  collect_my_order,
  setPaymentMethod,
  payment_method,
}: Props): ReactElement => {
  const toast = useToast()

  const Proceed_Step = () => {
    if (!values.full_name) {
      toast({
        title: 'Missing Info.',
        description: 'Enter full name.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      })
    } else if (!values.contact_number) {
      toast({
        title: 'Missing Info.',
        description: 'Enter your contact number.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      })
    } else if (!values.address) {
      toast({
        title: 'Missing Info.',
        description: 'Enter your address.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      })
    } else if (!values.city) {
      toast({
        title: 'Missing Info.',
        description: 'Enter your city.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      })
    } else {
      nextStep(values)
    }
  }
  return (
    <ShipmentLayout heading="Delivery Info" step={step}>
      <div className="flex w-full flex-col">
        <p className="mb-4 text-center font-semibold text-gray-700">
          How do you want us to handle your order?
        </p>
        <div className="flex rounded bg-gray-100 p-2 md:p-4">
          <RadioGroup onChange={setCollectMyOrder} value={collect_my_order}>
            <Stack direction="column">
              <Radio value="collect_my_order">
                Collect at our pickup point.
              </Radio>
              <Radio value="bring_to_doorstep">Bring to my doorstep</Radio>
              {collect_my_order === 'bring_to_doorstep' && (
                <div className="rounded bg-gray-100 p-4 ">
                  <RadioGroup
                    onChange={setPaymentMethod}
                    value={payment_method}
                  >
                    <Stack direction="column">
                      <Radio colorScheme="green" value="pay_on_delivery">
                        Pay On Delivery
                      </Radio>
                      <Radio colorScheme="green" value="pay_online">
                        Pay Online
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </div>
              )}
            </Stack>
          </RadioGroup>
        </div>
      </div>

      <form className="flex w-full flex-col p-4">
        <p className="mt-8 mb-4 text-center font-semibold text-gray-700">
          Contact Info
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
          <BlueButton text="Next" onClick={Proceed_Step} />
        </div>
      </form>
    </ShipmentLayout>
  )
}

export default Address
