import Head from 'next/head'
import React, { ReactElement, ReactFragment } from 'react'
import { Toolbar, AppBar, Typography, Container } from '@mui/material'

interface Props {
    title: string,
    description: string,
    icon?: any,
    children?: any,
    no_text?: any
}

function Layout({ children, no_text, title, description }: Props): ReactElement {
    return (
        <div className='bg-gray-100 overflow-scroll'>
            <Head>
                <title>{title ? `Trolliey -  ${title}` : 'Trolliey'}</title>
                <meta name="description" content={description ? description : "Trolliey is a modern ecommerce platform. You can become a seller or become a buyer and trade your items from anywhere you like. You can manage you inventory and customers using our intuitive dashboard"} />
            </Head>
            <nav>
                <AppBar position='static'>
                    <Toolbar>
                        <Typography>
                            trolliei
                        </Typography>
                    </Toolbar>
                </AppBar>
            </nav>
            <main >
                    <div className="flex my-8 bg-green-200 ">
                        {
                            !no_text && (<p className="flex text-gray-700 text-sm my-4 font-semibold ">Free Shipping On All Order Over $100 Code</p>)
                        }
                    </div>
                <Container>
                    {children}
                </Container>
            </main>
            <footer className="text-gray-700">
                iam a footer
            </footer>
        </div>
    )
}

export default Layout