const { SitemapStream, streamToPromise } = require('sitemap')
const { Readable } = require('stream')
import Products from '../../models/Product'

export default async (req, res) => {
  try {
    const links = []

    // crawling dynamic pages
    const products = await Products.find({})
    products.map((product) => {
      links.push({
        url: `/product/description/${product._id}`,
        changefreq: 'daily',
        priority: 0.9,
      })
    })

    // crawling static pages
    const pages = ['/applytosell', '/about', '/contact', '/faq']

    pages.map((url) => {
      links.push({
        url,
        changefreq: 'daily',
        priority: 0.9,
      })
    })

    // Create a stream to write to
    const stream = new SitemapStream({
      hostname: `https://${req.headers.host}`,
      CacheTime: 600000,
    })

    res.writeHead(200, {
      'Content-Type': 'application/xml',
    })

    const xmlString = await streamToPromise(
      Readable.from(links).pipe(stream)
    ).then((data) => data.toString())

    res.end(xmlString)
  } catch (error) {
    console.log(error)
    res.send(JSON.stringify(error))
  }
}
