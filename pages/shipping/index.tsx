import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { Store } from '../../Context/Store'
import GeneralLayout from '../../layouts/GeneralLayout'


function Shipping() {
  const router = useRouter()

  const { state } = useContext(Store)
  const { userInfo } = state

  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=/shipping')
    }
  }, [])

  return (
    <GeneralLayout title='shipping screen' description='describe how you want trolliey to handle yout equipmwnt'>Shipping</GeneralLayout>
  )
}

export default Shipping