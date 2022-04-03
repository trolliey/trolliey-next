import React, { useState } from 'react'
import AdminSidebar from '../components/Navigations/AdminSidebar'
import DashboardNavbar from '../components/Navigations/DashboardNavbar'

interface Props{
    children?:any
}

function AdminDashboard({children}:Props) {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
    return (
        <>

        <div className="relative h-screen flex overflow-hidden bg-gray-100">
            <div className="h-full">
                <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            </div>

            {/* // the body of the dashboard */}

            <div className="flex-1 overflow-auto focus:outline-none">
                <main className="flex-1 relative pb-8 z-0 overflow-y-auto">
                    {/* Page header */}
                    <DashboardNavbar setSidebarOpen={setSidebarOpen} />

                    {/* // the rest of the dashboard */}
                    {children}
                </main>
            </div>
        </div>
    </>
    )
}

export default AdminDashboard
