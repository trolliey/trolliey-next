import React from 'react'
import StoreLayout from '../../../layouts/StoreLayout'
import { connect, disconnect } from '../../../utils/mongo'
import Store from '../../../models/Store'

function info(props: any) {
    console.log(props.store)
    return (
        <StoreLayout store_info={props.store}>
            iam a store waht whataasadsa
        </StoreLayout>
    )
}

export async function getServerSideProps(context: any) {
    const { params } = context
    const { id } = params
    await connect()
    const store = await Store.findOne({ _id: id }).lean()
    await disconnect()
    return {
        props: {
            //@ts-ignore
            store:  JSON.parse(JSON.stringify(store))
        }
    }
}

export default info
