import { NextApiRequest, NextApiResponse } from 'next'
import { connect, disconnect } from '../../../utils/mongo'
import Store from '../../../models/Store'
const moment = require('moment')
import auth_handler from '../../../utils/auth_handler'
import Users from '../../../models/User'

// create an order
// post request
// /api/orders
auth_handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await connect()

  //@ts-ignore
  const _user = req.user
  const {
    first_name,
    last_name,
    email,
    phone_number,
    mobile_number,
    company_name,
    business_category,
    company_website,
    about,
    facebook,
    instagram,
    twitter,
    busines_owner_name,
    business_owner_email,
    number_of_uniqe_products,
    stock_handle,
    physical_store,
    physical_store_address,
  } = req.body.values
  const agreed = req.body.agreed
  const brands = req.body.brands
  const store_exists = await Store.findOne({ user: _user._id })
  const name_exists = await Store.findOne({ company_name: company_name })

  if (!agreed) {
    return res.status(400).send({
      message: 'All applicants must agree to our terms and conditions',
    })
  }

  if (store_exists) {
    return res
      .status(422)
      .send({ message: 'One account can only have one store' })
  }
  if (name_exists) {
    return res.status(400).send({
      message:
        'Name already in use. If the name belongs to you contact our support team',
    })
  } else if (!company_name) {
    return res.status(400).send({ message: 'Your copmany needs a name' })
  } else if (!phone_number) {
    return res.status(400).send({ message: 'Your phone number is needed!' })
  } else {
    const newStore = new Store({
      first_name,
      last_name,
      email,
      phone_number,
      mobile_number,
      company_name,
      business_category,
      company_website,
      about,
      facebook,
      instagram,
      twitter,
      busines_owner_name,
      business_owner_email,
      number_of_uniqe_products,
      stock_handle,
      physical_store,
      physical_store_address,
      next_payment_date: moment().add(6, 'months').calendar(),
      brands,
      user: _user._id,
    })

    const user = await Users.findOne({ _id: _user._id })
    user.store = _user._id
    await user.save()
    const saved_store = await newStore.save()

    //     User.findOneAndUpdate({ _id: _user._id }, { store: _store._id, role: 'seller' }).then(response => {
    if (saved_store) {
      return res.status(201).json({ message: 'Store Created!' })
    }
    res.status(500).json({ error: 'Error creating store, Try again later!' })
    // console.log(response)
    // }).catch(err => {
    //     return res.status(500).json({ error: 'Error when uploading' })
    // })
    await disconnect()
  }
})

// verify - block - store
auth_handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  const { action, store_id } = req.body

  console.log('action selected is ------- ', action)

  if (!action) {
    return res.status(500).send('Please specify an action!')
  }

  if (action === 'approve') {
    await Store.findOneAndUpdate({ _id: store_id }, { approved: true })
    return res
      .status(200)
      .send('Store has been approved and can start selling now!')
  }

  if (action === 'verify') {
    await Store.findOneAndUpdate({ _id: store_id }, { verified: true })
    return res.status(200).send('Verification action complete')
  }
  if (action === 'un-verify') {
    await Store.findOneAndUpdate({ _id: store_id }, { verified: false })
    return res.status(200).send('Verification action complete')
  }
  if (action === 'block') {
    await Store.findOneAndUpdate({ id: store_id }, { blocked: true })
    return res.status(200).send('Blocking action complete')
  }
  if (action === 'un-block') {
    await Store.findOneAndUpdate({ id: store_id }, { blocked: false })
    return res.status(200).send('Blocking action complete')
  }
})

export default auth_handler
