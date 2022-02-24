import React from 'react'
import Footer from '../components/Navigation/Footer'
import Navbar from '../components/Navigation/Navbar'
import Head from 'next/head'

function GeneralLayout({ children, no_text, title, description }) {
  return (
    <div>
      <Head>
        <title>{title ? `Trolliey -  ${title}` : 'Trolliey'}</title>
        <meta name="description" content={description ? description : "Trolliey is a modern ecommerce platform. You can become a seller or become a buyer and trade your items from anywhere you like. You can manage you inventory and customers using our intuitive dashboard"} />
      </Head>
      <nav className="z-50 sticky top-0 w-full">
        <Navbar />
      </nav>
      <main className="z-40 lg:px-0 md:px-16 px-2 bg-gray-100 min-h-screen w-full pb-8">
        <div className="max-w-7xl mx-auto bg-gray-100 ">
          {
            !no_text && (<p className="flex text-gray-700 text-sm py-4 font-semibold lg:px-8 md:px-4 px-2 bg-gray-100">Free Shipping On All Order Over $100 Code</p>)
          }
          {children}
        </div>
      </main>
      <div className="footer">
        <Footer />
      </div>
    </div>
  )
}

export default GeneralLayout