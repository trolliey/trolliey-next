import React from 'react'
import DashboardLayout from '../../../layouts/DashboardLayout'

function Reports() {
    return (
        <DashboardLayout>
            <div className="flex flex-col w-full">
                <p className="text-center text-gray-900 font-semibold my-8 text-xl">You dont have any completed orders so far</p>
            </div>
        </DashboardLayout>
    )
}

export default Reports
