import React from 'react'
import StoreLayout from '../../../layouts/StoreLayout'
import Store from '../../../models/Store'
import { connect, disconnect } from '../../../utils/mongo'

function StoreAbout(props: any) {
    console.log(props.store)
    return (
        <StoreLayout store_info={props.store}>
            some stuff goes here
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

export default StoreAbout
