import { NextApiRequest, NextApiResponse } from 'next'
import { connect, disconnect } from '../../../utils/mongo'
import auth_handler from '../../../utils/auth_handler'
import Orders from '../../../models/Order'
import Store from '../../../models/Store'
//@ts-ignore
import { Paynow } from 'paynow'

// Create instance of Paynow class
let paynow = new Paynow(
  process.env.PAYNOW_INTEGRATION_ID,
  process.env.PAYNOW_INTEGRATION_KEY
)

// Set return and result urls
paynow.resultUrl = 'http://locahost:3000/api/payment/rtgs'
paynow.returnUrl = 'http://locahost:3000/api/payment/rtgs'

// regex for phone numbers
const phone_number_regex = /^(\\d{4}[- .]?)(\\d{3}[- .]?)(\\d{3})$/
const phone_number_regex_2 =
  /^(\\+?\\d{3}[- .]?)(\\d{3}[- .]?)(\\d{3}[- .]?)(\\d{3})$/

// create an order
// post request
// /api/payment/rgs
// validate phone numbers
auth_handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { collect_my_order, method, paying_number } = req.body
    await connect()
    if (!method) {
      return res
        .status(500)
        .send({ message: 'Please select a required method' })
    } else {
      // create a new order from items put into the order
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
        //validate phone numbers if they gave the correct format
        // if(!phone_number_regex.test(paying_number) || !phone_number_regex_2.test(paying_number)){
        //   return res.status(500).send({message: 'Please enter a valid phone number'})
        // }

        // create a payment with the name of trolliet
        let payment = paynow.createPayment(
          'Invoice from Trolliey Retail',
          // @ts-ignore
          req.user.email
        )
        // add items to payment
        // newOrder.orderItems.forEach((item: any) => {
        //   payment.add(item.title, item.price)
        // })
        payment.add('item name', 1)

        // initialise the payment
        paynow
          .sendMobile(payment, paying_number, method)
          .then(async function (response: any) {
            if (response.success) {
              // These are the instructions to show the user.
              // Instruction for how the user can make payment
              // let instructions = response.instructions // Get Payment instructions for the selected mobile money method
              let pollUrl = response.pollUrl

              // return instunction to user
              // res.status(200).send({
              //   message: 'Transaction in process ',
              //   response: response,
              // })

              var keepCalling = true
              setTimeout(function () {
                keepCalling = false
              }, 15000)

              while (keepCalling) {
                let status = await paynow.pollTransaction(pollUrl)
                console.log(status)
                // if (status.status) {
                //   console.log('we are here')
                //   return res.json({ message: 'Yay! Transaction was paid for' })
                // } else {
                //   console.log('error is here')
                //   return res.json({ error: 'Why you no pay?' })
                // }
              }

              // console.log(instructions)
            } else {
              // could not inititalise transaction
              console.log(response.error)
              return res.status(500).send({ message: response.error })
            }
          })
          .catch((ex: any) => {
            // send error message to client
            console.log('Your application has broken an axle', ex)
            return res
              .status(500)
              .send({ message: 'Could not instantiate transation.Try again' })
          })
      }
    }
    await disconnect()
  } catch (error) {
    return res.status(500).send({ message: error })
  }
})

auth_handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log('wwe are here now')
    return res.status(200).send({ message: 'the transaction has gone here' })
  } catch (error) {
    return res.status(500).send({ message: error })
  }
})

export default auth_handler
