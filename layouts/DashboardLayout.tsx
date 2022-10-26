import { useState, ReactElement } from 'react'
import DashboardNavbar from '../components/Navigations/DashboardNavbar'
import DashboardSidebar from '../components/Navigations/DashboardSidebar'

interface Props {
  children: any
}

function DashboardLayout({ children }: Props): ReactElement {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  return (
    <>
      <main className="flex h-screen w-full flex-col">
        <div className="flex w-full flex-1 overflow-hidden bg-gray-100">
          <div className="flex">
            <DashboardSidebar
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

export default DashboardLayout
