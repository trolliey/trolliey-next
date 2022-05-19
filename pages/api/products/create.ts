import { NextApiRequest, NextApiResponse } from 'next'
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

        if(store){

            // coming from client request
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
                currency
            } = req.body
    
            // using mongoose schema
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
                status: status,
                currency_type: currency
            })
    
            // saving the new product
            await newProduct.save()
    
            await disconnect()
            return res.send({message: 'Product saved Successfully'})
        }else{
            return res.status(500).send({message: 'No store found'})
        }
    } catch (error) {
        return res.send({message: error})
    }
})

export default auth_handler