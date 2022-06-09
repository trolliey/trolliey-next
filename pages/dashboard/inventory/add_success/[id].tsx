import { useRouter } from 'next/router'
import React from 'react'
import BlueButton from '../../../../components/Buttons/BlueButton'
import DashboardLayout from '../../../../layouts/DashboardLayout'
import { Alert, AlertIcon } from '@chakra-ui/react'

function AddSuccess() {
  const router = useRouter()
  const { id } = router.query
  return (
    <DashboardLayout>
      <div className="grid min-h-screen w-full content-center items-center justify-center space-y-16">
        <div className="flex">
          <Alert status="success">
            <AlertIcon />
            Product added sucessfully!. Fire on!
          </Alert>
        </div>
        <div className="flex flex-col space-y-2">
          <BlueButton
            text={'Add Another Product'}
            onClick={() => router.push('/dashboard/inventory/create')}
          />
          <BlueButton
            text={'Go To Dashboard Home'}
            outline
            onClick={() => router.push('/dashboard')}
          />
          <BlueButton
            text={'Go To Shopping'}
            onClick={() => router.push('/explore')}
          />
          <BlueButton
            text={'Show Product'}
            outline
            onClick={() => router.push(`/product/description/${id}`)}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default AddSuccess
