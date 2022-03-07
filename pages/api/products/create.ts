import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import Products from '../../../models/Product'
import { connect, disconnect } from '../../../utils/mongo'
import auth_handler from '../../../utils/auth_handler'
import slugify from '../../../utils/slugify'
import Store from '../../../models/Store'

// get all products
// get request
// /api/products
auth_handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await connect()
        //@ts-ignore
        const _user = req.user
        const store = await Store.findOne({ user: _user._id })

        const {
            pictures,
            description,
            title,
            category,
            price,
            discount_price,
            brand,
            countInStock,
            status,
            sku,
            variants,
        } = req.body

        const newProduct = new Products({
            title: title,
            slug: slugify(title),
            description: description,
            price: price,
            discount_price: discount_price,
            pictures: pictures,
            brand: brand,
            countInStock: countInStock,
            category: category,
            category_slug: slugify(category),
            variants: variants,
            store_id: store._id,
            sku: sku,
            status: status
        })

        const saved_product = await newProduct.save()

        console.log(saved_product)

        // console.log(newProduct)

        await disconnect()
        res.send({message: 'Product saved Successfully'})
    } catch (error) {
        return res.send(error)
    }
})

export default auth_handler