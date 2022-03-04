import React, { ReactElement, Dispatch, SetStateAction, FunctionComponent } from 'react'
import BlueButton from '../Buttons/BlueButton'
import ShipmentLayout from '../../layouts/ShipmentLayout'

interface Props {
    nextStep?: any,
    values?: any,
    step: number,
    handleChange: any,
    prevStep?:any
}

const Address: FunctionComponent<Props> = ({ nextStep, values, step, handleChange, prevStep }: Props): ReactElement => {

    return (
        <ShipmentLayout heading="Delivery Info" step={step}>
            <form className="flex flex-col w-full p-4">
                <div className="mb-6">
                    <label htmlFor="fullname" className="block mb-2 text-sm font-medium text-gray-900">Full Name</label>
                    <input
                        type="fullname"
                        id="fullname"
                        value={values.full_name}
                        onChange={handleChange('full_name')}
                        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-primary focus:border-blue-primary block w-full p-2.5 "
                        placeholder="full name"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="fullname" className="block mb-2 text-sm font-medium text-gray-900">Contact Phone number</label>
                    <input
                        type="text"
                        id="phone_number"
                        value={values.contact_number}
                        onChange={handleChange('contact_number')}
                        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-primary focus:border-blue-primary block w-full p-2.5 "
                        placeholder="phone number"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="fullname" className="block mb-2 text-sm font-medium text-gray-900">Physical Address</label>
                    <input
                        type="text"
                        id="address"
                        value={values.address}
                        onChange={handleChange('address')}
                        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-primary focus:border-blue-primary block w-full p-2.5 "
                        placeholder="physical address"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="province" className="block mb-2 text-sm font-medium text-gray-900">Province</label>
                    <input
                        type="province"
                        id="province"
                        value={values.province}
                        onChange={handleChange('province')}
                        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-primary focus:border-blue-primary block w-full p-2.5 "
                        placeholder="Province"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="city"
                        className="block mb-2 text-sm font-medium text-gray-900">City</label>
                    <input
                        type="city"
                        id="city"
                        placeholder='city'
                        value={values.city}
                        onChange={handleChange('city')}
                        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-primary focus:border-blue-primary block w-full p-2.5 "
                        required />
                </div>

                <div className="w-full justify-between space-x-4 border-t pt-4 mt-4 border-gray-200">
                    <BlueButton
                        text="Previous"
                        onClick={()=> prevStep(values)}
                    />
                    <BlueButton
                        text="Next"
                        onClick={() => nextStep(values)}
                    />
                </div>
            </form>
        </ShipmentLayout>
    )
}

export default Address