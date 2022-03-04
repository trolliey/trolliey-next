import React, { useContext, useEffect, ReactElement } from 'react'
import BlueButton from '../Buttons/BlueButton'
import { Store } from '../../Context/Store'
import { useRouter } from 'next/router'
import ShipmentLayout from '../../layouts/ShipmentLayout'

interface Props {
    steps?: number,
    nextStep?: any,
    values?: any,
    step: number
}

function ShipmentLogin({ nextStep, values, step }: Props): ReactElement {
    const router = useRouter()
    const { state } = useContext(Store)
    const { userInfo } = state
    useEffect(() => {
        if (userInfo) {
            nextStep(values)
        }
    }, [])
    return (
        <ShipmentLayout heading="Login" step={step}>
            <div className="min-h-96 grid items-center justify-center content-center">
                <BlueButton onClick={() => router.push('/login?redirect=/shipping')} text="Login to continue to shipment" />
            </div>
            <div className="flex border-t pt-4 mt-4 border-gray-200 ">

            </div>
        </ShipmentLayout>
    )
}

export default ShipmentLogin
