import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Store } from '../../Context/Store'
import Address from '../../components/Shipping/Address'
import ShipmentLogin from '../../components/Shipping/ShipmentLogin'
import PaymentMethod from '../../components/Shipping/PaymentMethod'

function Shipping() {
  const router = useRouter()
  const { state } = useContext(Store)
  const { userInfo, cart } = state
  const [step, setActiveStep] = useState(1);

  const [states, setState] = useState<any>({
    full_name: '',
    address: '',
    city: '',
    province: '',
    contact_number: '',
    paying_number: '',
    cvv: '',
    card_type: '',
    card_number: '',
    expiry_date: '',
    method: '',
  })

  // go back to previous page
  const prevStep = (new_values: any) => {
    setState({ ...states, ...new_values });
    setActiveStep(step - 1)
  }

  // proceed to the next step
  const nextStep = (new_values: any) => {
    setState({ ...states, ...new_values });
    setActiveStep(step + 1)
  }

  // handle field change
  const handleChange = (input: any) => (e: { target: { value: any } }) => {
    setState((prev: any) => ({ ...prev, [input]: e.target.value }));
  }

  const {
    full_name,
    address,
    city,
    province,
    contact_number,
    paying_number,
    cvv,
    card_type,
    card_number,
    expiry_date,
    method,
  } = states;

  const values = {
    full_name,
    address,
    city,
    province,
    contact_number,
    paying_number,
    cvv,
    card_type,
    card_number,
    expiry_date,
    method,
  };



  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=/shipping')
    }
  }, [])

  switch (step) {
    case 1:
      return (
        <ShipmentLogin
          nextStep={nextStep}
          values={values}
          step={step}
        />
      )
    case 2:
      return (
        <Address
          nextStep={nextStep}
          handleChange={handleChange}
          prevStep={prevStep}
          values={values}
          step={step}
        />
      )
    case 3:
      return (
        <PaymentMethod
          nextStep={nextStep}
          handleChange={handleChange}
          prevStep={prevStep}
          values={values}
          step={step}
        />
      )
  }
}

export default Shipping