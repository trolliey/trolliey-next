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
     <main className="flex h-screen w-full flex-col">
        <div className="flex w-full flex-1 overflow-hidden bg-gray-100">
          <div className="flex">
          <AdminSidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          </div>
          <div className="flex w-full flex-1 flex-col">
            <div className="flex w-full flex-col">
              <DashboardNavbar setSidebarOpen={setSidebarOpen} />
            </div>
            <div className="flex flex-col max-w-7xl mx-auto w-full overflow-y-auto bg-blue-300 px-4">
              {children}
            </div>
          </div>
        </div>
      </main>
     
    </>
  )
}

export default AdminDashboard
