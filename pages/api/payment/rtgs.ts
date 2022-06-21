import auth_handler from '../cards'
import { NextApiRequest, NextApiResponse } from 'next'
import { connect, disconnect } from '../../../utils/mongo'
import Orders from '../../../models/Order'
import Store from '../../../models/Store'
import Products from '../../../models/Product'
import Report from '../../../models/Reports'
//@ts-ignore
import { Paynow } from 'paynow'

// Create instance of Paynow class
let paynow = new Paynow(
  process.env.PAYNOW_INTEGRATION_ID,
  process.env.PAYNOW_INTEGRATION_KEY
)

// Set return and result urls
paynow.resultUrl = 'http://localhost:3000/api/webhooks/paynow'
paynow.returnUrl = 'http://localhost:3000/payment/return'

// create an order
// post request
// /api/orders
auth_handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connect()
    const { collect_my_order, method, paying_number } = req.body

    // steps to follow
    // - process payment .. if available
    // - descrement quantity of product
    // - increment number of times the product was bought
    // - create an array of all stores involved
    // - edit reports if order has been payed
    // - save new order
    // - edit store orders

    if (!method) {
      return res
        .status(500)
        .send({ message: 'Please select a required method' })
    } else {
      const all_involved_stores = []

      const newOrder = new Orders({
        ...req.body,
        // @ts-ignore
        user: req.user._id,
        collect_my_order: collect_my_order,
        stores_involved: [],
        method: method,
      })
      //@ts-ignore
      const the_store = await Store.findOne({ user_id: req.user._id })
      if (!the_store) {
        return res.status(500).send({
          message:
            'Store cannot receive orders at the moment. We Apologise for any inconviniences',
        })
      } else {
        // // decrement quantity of product
        // for (let i = 0; i < newOrder.orderItems.length; i++) {
        //   await Products.findOneAndUpdate(
        //     { _id: newOrder.orderItems[i]._id },
        //     { $inc: { countInStock: -1 } }
        //   )
        // }

        // // create an array of all involved stores
        // for (let i = 0; i < newOrder.orderItems.length; i++) {
        //   if (
        //     all_involved_stores.indexOf(newOrder.orderItems[i].store_id) == -1
        //   ) {
        //     all_involved_stores.push(newOrder.orderItems[i].store_id)
        //   }
        // }

        // // increment number of times product was bought
        // for (let i = 0; i < newOrder.orderItems.length; i++) {
        //   await Products.findOneAndUpdate(
        //     { _id: newOrder.orderItems[i]._id },
        //     { $inc: { times_bought: 1 } }
        //   )
        // }

        // // editing the store schema to increse its orders
        // for (let i = 0; i < newOrder.orderItems.length; i++) {
        //   await Store.findOneAndUpdate(
        //     { _id: newOrder.orderItems[i].store_id },
        //     {
        //       $push: {
        //         orders: {
        //           order_id: newOrder._id,
        //           items: newOrder.orderItems.filter(
        //             (item: any) =>
        //               item.store_id === newOrder.orderItems[i].store_id
        //           ),
        //           status: 'pending',
        //           createdAt: Date.now(),
        //         },
        //       },
        //     }
        //   )
        // }

        // try {
        //   // save the order
        //   newOrder.stores_involved = all_involved_stores
        //   const order = await newOrder.save()
        //   //editing the reports schema
        //   for (let i = 0; i < all_involved_stores.length; i++) {
        //     await Report.findOneAndUpdate(
        //       { store: all_involved_stores[i] },
        //       { $push: { pending_orders: order._id } }
        //     )
        //   }

        //   await disconnect()
        //   return res
        //     .status(200)
        //     .send({ order: order._id, message: 'order created successfully' })
        // } catch (error) {
        //   return res.status(500).send({ message: error })
        // }

        let payment = paynow.createPayment(
          'Invoice from trolliey',
          // @ts-ignore
          req.user.email
        )
        newOrder.orderItems.forEach((item: any) => {
          payment.add(item.title, item.price)
        })

        // const response = await paynow.sendMobile(payment, paying_number, method)

        // if (response && response.success) {
        //   let instructions = response.instructions
        //   let pollUrl = response.pollUrl

        //   console.log('PollUrl', pollUrl)
        //   console.log('Instructions', instructions)
        //   let status = await paynow.pollTransaction(pollUrl)
        //   console.log('Status ---- ', status)

        //   switch(status.status){
        //       case 'sent':
        //           return res.send({message: 'Transaction in process. Check your phone'})
        //       case 'paid':
        //           return res.send({message: 'Transaction done. Payed in full'})
        //       case 'cancelled':
        //           return res.status(500).send({message: 'Transaction was pain in full'})
        //       default:
        //           return res.status(500).send({message: 'Error making payment. You can try paying on delivery'})

        //   }
        // }
        paynow.send(payment)
          .then(function (response: any) {
            if (response.success) {
              // These are the instructions to show the user.
              // Instruction for how the user can make payment
              let instructions = response.instructions // Get Payment instructions for the selected mobile money method

              // Get poll url for the transaction. This is the url used to check the status of the transaction.
              // You might want to save this, we recommend you do it
              let pollUrl = response.pollUrl
              return res.status(200).send({message: 'Transaction in process ', url: response.redirectUrl})
            } else {
              console.log(response.error)
            }
          })
          .catch((ex:any) => {
            // Ahhhhhhhhhhhhhhh
            // *freak out*
            console.log('Your application has broken an axle', ex)
          })
      }
    }
  } catch (error) {
    return res.status(500).send({ message: error })
  }
})

export default auth_handler
