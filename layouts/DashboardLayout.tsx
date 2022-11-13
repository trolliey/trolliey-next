import Head from 'next/head'
import { useState, ReactElement } from 'react'
import DashboardNavbar from '../components/Navigations/DashboardNavbar'
import DashboardSidebar from '../components/Navigations/DashboardSidebar'
import { data } from '../utils/data'

const OG_IMAGE =
  'https://res.cloudinary.com/trolliey/image/upload/v1656413519/trolliey%20static%20images/home_og_image_rwubje.jpg'

interface Props {
  children: any
}

function DashboardLayout({ children }: Props): ReactElement {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  return (
    <>
     <Head>
        <title>{`Dashboard | Trolliey`}</title>
        <meta name="description" content={data.site_description} />
        <meta property="og:type" content="website" />
        <meta
          name="og:title"
          property="og:title"
          content={`Dashboard | Trolliey Online Retail`}
        />
        <meta
          name="og:description"
          property="og:description"
          content={data.site_description}
        />
        <meta property="og:site_name" content={'Trolliey Retail'} />
        <meta property="og:url" content={`${data.site_url}/`} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content={`Trolliey | Zim's leading online store`}
        />
        <meta name="twitter:description" content={data.site_description} />
        <meta name="twitter:site" content="" />
        <meta name="twitter:creator" content="" />
        {/* <link rel=”shortcut icon” href=”/icon.png" type=”image/x-icon” /> */}
        <link rel="shortcut icon" href="/images/icon.png" type="image/x-icon" />
        <link rel="icon" type="image/png" href="/images/icon.png" />
        <link rel="apple-touch-icon" href="/images/icon.png" />
        <meta name="twitter:image" content={OG_IMAGE} />
        <link rel="canonical" href={`${data.site_url}/`} />
      </Head>
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
            <div className="flex flex-col mx-auto w-full overflow-y-auto bg-blue-300">
              {children}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default DashboardLayout
