import Head from 'next/head'
import React, { ReactElement } from 'react'
import GeneralNavbar from '../components/Navigations/GeneralNavbar'
import { Container } from '@chakra-ui/react'

interface Props {
    title: string,
    description: string,
    icon?: any,
    children?: any,
    no_text?: any
}

function GeneralLayout({ children, no_text, title, description }: Props): ReactElement {
    return (
        <div className='bg-gray-100 overflow-scroll' style={{ backgroundColor: 'rgb(243 244 246)' }}>
            <Head>
                <title>{title ? `Trolliey -  ${title}` : 'Trolliey'}</title>
                <meta name="description" content={description ? description : "Trolliey is a modern ecommerce platform. You can become a seller or become a buyer and trade your items from anywhere you like. You can manage you inventory and customers using our intuitive dashboard"} />
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
                iam a footer
            </footer>
        </div>
    )
}

export default GeneralLayout