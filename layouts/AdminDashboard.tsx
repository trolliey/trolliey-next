import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import AdminSidebar from '../components/Navigations/AdminSidebar'
import DashboardNavbar from '../components/Navigations/DashboardNavbar'
import { Store } from '../Context/Store'

interface Props {
  children?: any
}

function AdminDashboard({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const history = useRouter()
  const { state, dispatch } = useContext(Store)
  const { userInfo } = state

  useEffect(() => {
    if (userInfo?.role !== 'admin') {
      history.push('/admin')
    }
  }, [])

  return (
    <>
      <div className="relative flex h-screen overflow-hidden bg-gray-100">
        <div className="h-full">
          <AdminSidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        </div>

        {/* // the body of the dashboard */}

        <div className="flex-1 overflow-auto focus:outline-none">
          <main className="relative z-0 flex-1 overflow-y-auto pb-8">
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
