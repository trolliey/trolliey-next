import {
  EmojiHappyIcon,
  CreditCardIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/outline'
import sport from '../public/img/sports.svg'
import books from '../public/img/books.svg'
import groceries from '../public/img/groceries.svg'
import gaming from '../public/img/gaming.svg'
import computers from '../public/img/copmuters.svg'
import camping from '../public/img/camping.svg'
import fashion from '../public/img/fashion.svg'
import homeware from '../public/img/homeware.svg'
import kitchen from '../public/img/kitchen.svg'
import baby from '../public/img/baby.svg'
import office from '../public/img/office.svg'
import outdoor from '../public/img/outdoor.svg'
import tv from '../public/img/tv.svg'
import cellphone from '../public/img/cellphone.svg'
import automotive from '../public/img/automotive.svg'
import beauty from '../public/img/beauty.svg'
import bcrypt from 'bcryptjs'
import promo_1 from '../public/img/promo_1.png'
import promo_2 from '../public/img/fregrance_sale.png'

export const data = {
  original_title: 'Trolliey',
  site_description:
    'Trolliey is a modern ecommerce platform. You can become a seller or become a buyer and trade your items from anywhere you like. You can manage you inventory and customers using our intuitive dashboard, Buy and sell goods and items online',
  site_url: 'www.trolliey.com',
  site_top_message: 'Free Shipping On All Order Over $100 Code',
  banner_images: [
    { body: '', image: promo_1 },
    { body: '', image: promo_2 },
    { body: '', image: promo_1 },
  ],
  users: [
    {
      name: 'tatenda',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      role: 'admin',
    },
    {
      name: 'seller',
      email: 'seller@example.com',
      password: bcrypt.hashSync('123456'),
      role: 'seller',
    },
    {
      name: 'user',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      role: 'user',
    },
  ],
  categories: [
    {
      name: 'Sports and training',
      value: 'sports-&-training',
      icon: sport,
      sub_categories: [
        { name: 'Fitness and body building', description: '' },
        { name: 'Cycling', description: '' },
        { name: 'Football', description: '' },
        { name: 'Tennis', description: '' },
        { name: 'Basketball', description: '' },
      ],
      id: 1,
    },
    // { name: 'Books & courses', value: 'sooks-&-courses', icon: books },
    // { name: 'Groceries', value: 'groceries', icon: groceries, id: 2 },
    {
      name: 'Computer & electronics',
      value: 'computer-&-electronics',
      icon: computers,
      sub_categories: [
        { name: 'Camera, photos and Accessories', description: '' },
        { name: 'Computer hardware & software', description: '' },
        { name: 'Chargers, batteries and power supplies', description: '' },
        { name: 'Laptops', description: '' },
        { name: 'Earphones , headphoes & Accessories', description: '' },
      ],
      id: 3,
    },
    // { name: 'Camping & outdoors', value: 'camping-&-outdoors', icon: camping, id: 4 },
    {
      name: 'Fashion & luggage',
      value: 'fashion-&-luggage',
      icon: fashion,
      id: 5,
      sub_categories: [
        { name: 'Bath clothing', description: '' },
        { name: "Men's clothing", description: '' },
        { name: "Women's clothing", description: '' },
        { name: 'Ethinc Clothing', description: '' },
        { name: 'Garments', description: '' },
        { name: 'Formal wear', description: '' },
        { name: 'Winter wear', description: '' },
      ],
    },
    {
      name: 'Beauty & personal care',
      value: 'beauty-and-personal-care',
      icon: beauty,
      sub_categories: [
        { name: 'Bath supplies', description: '' },
        { name: 'Baby care', description: '' },
        { name: 'Body art', description: '' },
        { name: 'Fragrance & Deodorants', description: '' },
        { name: 'Beauty equipment', description: '' },
      ],
      id: 7,
    },
    {
      name: 'Home & appliances',
      value: 'home-&-appliances',
      icon: homeware,
      id: 8,
      sub_categories: [
        { name: 'Kitchen', description: '' },
        { name: 'Bathroom and toiletries', description: '' },
        { name: 'Garden supplies', description: '' },
        { name: 'Furniture', description: '' },
        { name: 'Beds and sleeping', description: '' },
        { name: 'General decoration', description: '' },
      ],
      
    },
    {
      name: 'Office & Stationery',
      value: 'office-and-stationery',
      icon: office,
      id: 10,
    },
    {
      name: 'Automitive & D.I.Y ',
      value: 'automitive-&-D.I.Y',
      icon: automotive,
      id: 12,
    },
    {
      name: 'Agriculture ',
      value: 'agriculture',
      icon: automotive,
      id: 12,
    },
    {
      name: 'Packaging and printing ',
      value: 'agriculture',
      icon: automotive,
      id: 12,
    },
  ],
  benefits: [
    {
      heading: 'Free shipment',
      details: 'Free shipment for bulk goods',
      icon: ShoppingBagIcon,
    },
    {
      heading: 'Anyplace anytime',
      details: 'Many methods',
      icon: CreditCardIcon,
    },
    {
      heading: '100% Satisfaction',
      details: 'great customer care',
      icon: EmojiHappyIcon,
    },
    {
      heading: 'Save money',
      details: 'frequent discounts',
      icon: CurrencyDollarIcon,
    },
  ],
  products: [
    {
      title: 'my hodies',
      slug: 'my-hoodies',
      description:
        'iam a a product iam a description of a product iam a description of a productiam a a product iam a description of a product iam a description of a product',
      averageRating: 4.5,
      price: 242,
      discount_price: 20,
      pictures: ['/img/clothes.jpg', '/img/cat-travel.jpg'],
      id: 1,
      brand: 'Nike',
      numReviews: 14,
      countInStock: 20,
      category: 'Fashion and fragrance',
      category_slug: 'fashion-and-fragrance',
      variants: [
        {
          variant: 'xs',
          price: 200,
          countInStock: 2,
          discount_price: 10,
        },
        {
          variant: 's',
          price: 220,
          countInStock: 1,
          discount_price: 11,
        },
        {
          variant: 'xl',
          price: 250,
          countInStock: 2,
          discount_price: 5,
        },
        {
          variant: 'xxl',
          price: 270,
          countInStock: 3,
          discount_price: 7,
        },
      ],
      store_id: 'aoiuyoiuyasd',
      store_name: 'Trolliey',
      ratings: 'asjf;lja;slkdjf;lajsf',
    },
    {
      title: 'another item',
      slug: 'another-item',
      description:
        'iam a a product iam a description of a product iam a description of a productiam a a product iam a description of a product iam a description of a product',
      averageRating: 4.5,
      price: 242,
      discount_price: 20,
      pictures: ['/img/tech_stuff.jpg', '/img/cat-travel.jpg'],
      id: 2,
      brand: 'Item',
      numReviews: 14,
      countInStock: 20,
      category: 'Another Item',
      category_slug: 'another-item',
      variants: [],
      store_id: 'aoiuyoiuyasd',
      store_name: 'Trolliey',
      ratings: 'fashphoiuahodsfkjhljkhasf',
    },
    {
      title: 'another item',
      slug: 'another-item',
      description:
        'iam a a product iam a description of a product iam a description of a productiam a a product iam a description of a product iam a description of a product',
      averageRating: 4.5,
      price: 242,
      discount_price: 20,
      pictures: ['/img/tech_stuff.jpg', '/img/cat-travel.jpg'],
      id: 3,
      brand: 'Item',
      numReviews: 14,
      countInStock: 20,
      category: 'Another Item',
      category_slug: 'another-item',
      variants: [],
      store_id: 'aoiuyoiuyasd',
      store_name: 'Trolliey',
      ratings: 'fashphoiuahodsfkjhljkhasf',
    },
  ],
}
