import React from 'react'
import ExploreLayout from '../../layouts/ExploreLayout'
import AllProducts from '../../components/HomeSections/AllProducts'
import { connect, disconnect, convertDocToObj } from '../../utils/mongo'
import Products from '../../models/Product'

export default function Explore(props: any) {
    const { products } = props
    return (
        <ExploreLayout>
            <>
                <AllProducts products={products} cols="lg:grid-cols-4 md:grid-cols-4 grid-cols-2 " no_text />
            </>
        </ExploreLayout>
    )
}

export async function getServerSideProps(context: any) {
    await connect()
    const products = await Products.find({}).lean()
    await disconnect()
    return {
      props: {
        //@ts-ignore
        products: products?.map(convertDocToObj)
      }
    }
  }