import React, { useState } from 'react'
import ContactInfo from './ContactInfo';
import BusinessInfo from './BusinessInfo';
import ProductsInfo from './ProductsInfo';
import NoSSR from '../../layouts/NoSSR';

export default function CreateStore() {
    const [step, setActiveStep] = useState<number>(1);
    const [brands, setBrands] = useState<any>([])

    const [state, setState] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        mobile_number: '',
        company_name: '',
        business_category: '',
        company_website: '',
        about: '',
        facebook: '',
        instagram: '',
        twitter: '',
        vat_registered: false,
        busieness_registration_number: '',
        busines_owner_name: '',
        business_owner_email: '',
        number_of_uniqe_products: '',
        brands_products: [],
        stock: false,
        stock_handle: '',
        physical_store: false,
        physical_store_address: '',
        supplier_to_retailer: false,
        registered_account: false
    })

    // go back to previous page
    const prevStep = (new_values: any) => {
        setState({ ...state, ...new_values });
        setActiveStep(step - 1)
    }

    // proceed to the next step
    const nextStep = (new_values: any) => {
        setState({ ...state, ...new_values });
        setActiveStep(step + 1)
    }

    // handle field change
    const handleChange = (input: any) => (e: { target: { value: any; }; }) => {
        setState((prev) => ({ ...prev, [input]: e.target.value }));
    }

    const {
        first_name,
        last_name,
        email,
        phone_number,
        mobile_number,
        company_name,
        business_category,
        company_website,
        about,
        facebook,
        instagram,
        twitter,
        vat_registered,
        busieness_registration_number,
        busines_owner_name,
        business_owner_email,
        number_of_uniqe_products,
        brands_products,
        stock,
        stock_handle,
        physical_store,
        physical_store_address,
        supplier_to_retailer,
        registered_account
    } = state

    const values = {
        first_name,
        last_name,
        email,
        phone_number,
        mobile_number,
        company_name,
        business_category,
        company_website,
        about,
        facebook,
        instagram,
        twitter,
        vat_registered,
        busieness_registration_number,
        busines_owner_name,
        business_owner_email,
        number_of_uniqe_products,
        brands_products,
        stock,
        stock_handle,
        physical_store,
        physical_store_address,
        supplier_to_retailer,
        registered_account
    }


    switch (step) {
        case 1:
            return (
                <NoSSR>
                    <ContactInfo
                        nextStep={nextStep}
                        handleChange={handleChange}
                        values={values}
                    />
                </NoSSR>
            )
        case 2:
            return (
                <NoSSR>
                    <BusinessInfo
                        nextStep={nextStep}
                        handleChange={handleChange}
                        values={values}
                        prevStep={prevStep}
                    />
                </NoSSR>
            )
        case 3:
            return (
                <NoSSR>
                    <ProductsInfo
                        nextStep={nextStep}
                        handleChange={handleChange}
                        values={values}
                        prevStep={prevStep}
                        setBrands={setBrands}
                        brands={brands}
                    />
                </NoSSR>
            )
        default:
            return (
                <NoSSR>
                    <ContactInfo
                        nextStep={nextStep}
                        handleChange={handleChange}
                        values={values}
                    />
                </NoSSR>
            )
    }
}