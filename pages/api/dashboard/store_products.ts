import { NextApiRequest, NextApiResponse } from 'next'
import Products from '../../../models/Product'
import { connect, disconnect } from '../../../utils/mongo'
import auth_handler from '../../../utils/auth_handler'
import Store from '../../../models/Store'

// get all user products
// get request
// /api/dashboard/products
auth_handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connect()
    //@ts-ignore
    const _user = req.user
    const store = await Store.findOne({ user: _user._id })

    if (store) {
      // handling store schema
      let query = [
        {
          $lookup: {
            from: 'stores',
            let: { store: 'store' },
            pipeline: [{ $limit: 1 }],
            as: 'creator',
          },
        },
        { $unwind: '$creator' },
      ]

      // handling search queries
      if (req.query.keyword && req.query.keyword != '') {
        query.push({
          //@ts-ignore
          $match: {
            $or: [
              { title: { $regex: req.query.keyword, $options: 'i' } },
              { description: { $regex: req.query.keyword, $options: 'i' } },
              {
                'creator.company_name': {
                  $regex: req.query.keyword,
                  $options: 'i',
                },
              },
              { category: { $regex: req.query.keyword, $options: 'i' } },
            ],
          },
        })
      }

      // category wise filtration // should send slug
      if (req.query.category) {
        query.push({
          //@ts-ignore
          $match: {
            category_slug: req.query.category,
          },
        })
      }

      let total = await Products.countDocuments(query)
      //@ts-ignore
      let page = req.query.page ? parseInt(req.query.page) : 1
      //@ts-ignore
      let perPage = req.query.perPage ? parseInt(req.query.perPage) : 8
      let skip = (page - 1) * perPage

      query.push({
        //@ts-ignore
        $skip: skip,
      })
      query.push({
        //@ts-ignore
        $limit: perPage,
      })

      // exclude some fields
      query.push({
        //@ts-ignore
        $project: {
          'creator.orders': 0,
          'creator.stock_handle': 0,
          'creator.store_address': 0,
          'creator.total_amount': 0,
          'creator.amount_to_be_paid': 0,
          'creator.is_paid': 0,
          'creator.next_payment_date': 0,
          'creator.notification_type': 0,
          'creator.facebook': 0,
          'creator.instagram': 0,
          'creator.twitter': 0,
        },
      })

      // handling sort
      if (req.query.sortBy && req.query.sortOrder) {
        var sort: any = {}
        //@ts-ignore
        sort[req.query.sortBy] = req.query.sortOrder == 'asc' ? 1 : -1
        query.push({
          //@ts-ignore
          $sort: sort,
        })
      } else {
        query.push({
          //@ts-ignore
          $sort: { createdAt: -1 },
        })
      }

      let products = await Products.aggregate(query)
      await disconnect()

      return res.status(200).send({
        message: 'Products fetched sucessfully',
        length: products.length,
        meta: {
          total: total,
          currentPage: page,
          perPage: perPage,
          totalPages: Math.ceil(total / perPage),
        },
        products: products,
      })
    } else {
      return res
        .status(500)
        .send({ message: 'Store not found. Please Re-Login to account' })
    }
  } catch (error) {
    return res.send(error)
  }
})

export default auth_handler
