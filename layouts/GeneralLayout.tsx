import Head from 'next/head'
import React, { ReactElement } from 'react'
import GeneralNavbar from '../components/Navigations/GeneralNavbar'
import { Container } from '@chakra-ui/react'
import Footer from '../components/Navigations/Footer'

interface Props {
    title: string,
    description: string,
    icon?: any,
    children?: any,
    no_text?: any,
    twitter_title?: string
    twitter_description?: string
    canonical_url?: string
}

function GeneralLayout({ children, no_text, title, description, twitter_title, twitter_description, canonical_url }: Props): ReactElement {
    const desc = 'Trolliey is a modern ecommerce platform. You can become a seller or become a buyer and trade your items from anywhere you like. You can manage you inventory and customers using our intuitive dashboard, Buy and sell items online'
    const original_title = 'Trolliey'
    const url = 'www.trolliey.com'
    return (
        <div className='bg-gray-100 overflow-scroll' style={{ backgroundColor: 'rgb(243 244 246)' }}>
            <Head>
                <title>{title ? `${title} | Trolliey ` : { original_title }}</title>
                <meta name="description" content={description ? description : desc} />
                <meta property="og:type" content="website" />
                <meta name="og:title" property="og:title" content="" />
                <meta
                    name="og:description"
                    property="og:description"
                    content={description ? description : desc}
                />
                <meta property="og:site_name" content="www.trolliey.com" />
                <meta property="og:url" content="" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={twitter_title} />
                <meta name="twitter:description" content={twitter_description} />
                <meta name="twitter:site" content="" />
                <meta name="twitter:creator" content="" />
                <link rel="icon" type="image/png" href="/static/images/favicon.ico" />
                <link rel="apple-touch-icon" href="/static/images/favicon.ico" />
                <link rel="stylesheet" href="" />
                <meta property="og:image" content="" />
                <meta name="twitter:image" content="" />
                <link
                    rel="canonical"
                    href={canonical_url ? canonical_url : url}
                />
            </Head>
            <nav>
                <GeneralNavbar />
            </nav>
            <main >
                <Container maxW='container.xl' className='mx-auto'>
                    {
                        !no_text && (<h1 className="flex text-gray-700 text-sm font-semibold " style={{ marginTop: '25px', marginBottom: '25px' }}>Free Shipping On All Order Over $100 Code</h1>)
                    }
                    {children}
                </Container>
            </main>
            <footer className="text-gray-700">
                <Footer/>
            </footer>
        </div>
    )
}

export default GeneralLayout