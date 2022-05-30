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
      name: 'Electronics & Wearable',
      value: 'electronics-and-wearable',
      icon: cellphone,
      sub_categories: [
        { name: 'Accessories and supply', description: '' },
        { name: 'Camera and photo', description: '' },
        { name: 'Car & vehicle electronics', description: '' },
        { name: 'GPS & Navigation', description: '' },
        { name: 'Headphones', description: '' },
        { name: 'Home Audio', description: '' },
        { name: 'Office Electronics', description: '' },
        { name: 'Portable Audio & Video', description: '' },
        { name: 'Security & Surveillance', description: '' },
        { name: 'Service Plans', description: '' },
        { name: 'Video Game Consoles & Accessories', description: '' },
        { name: 'Video Projectors', description: '' },
        { name: 'Wearable Technology', description: '' },
        { name: 'Television & Video', description: '' },
        { name: 'eBook Readers & Accessories', description: '' },



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
        { name: 'Computer Accessories & Peripherals', description: '' },
        { name: 'Computer Components', description: '' },
        { name: 'Computers & Tablets', description: '' },
        { name: 'Data Storage', description: '' },
        { name: 'Laptop Accessories', description: '' },
        { name: 'Monitors', description: '' },
        { name: 'Networking Products', description: '' },
        { name: 'Power Strips & Surge Protectors', description: '' },
        { name: 'Printers', description: '' },
        { name: 'Scanners', description: '' },
        { name: 'Servers', description: '' },
        { name: 'Tablet Accessories', description: '' },
        { name: 'Tablet Replacement Parts', description: '' },
        { name: 'Warranties & Services', description: '' },

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
      name: 'Smart Home',
      value: 'smart-home',
      icon: beauty,
      sub_categories: [
        { name: 'Smart Home Lightings', description: '' },
        { name: 'Smart Locks and Entry', description: '' },
        { name: 'Security Cameras and Systems', description: '' },
        { name: 'Heating and Cooling', description: '' },
        { name: 'Detectors and Sensors', description: '' },
        { name: 'Home Entertainment', description: '' },
        { name: 'Pet', description: '' },
        { name: 'Voice Assistants and Hubs', description: '' },
        { name: 'Kitchen', description: '' },
        { name: 'Vacuums and Mops', description: '' },
        { name: 'Lawn and Garden', description: '' },
        { name: 'WIFI and Networking', description: '' },

      ],
      id: 7,
    },
    {
      name: 'Agriculture',
      value: 'agriculture',
      icon: homeware,
      id: 8,
      sub_categories: [
        { name: 'Seeds and Seedlings', description: '' },
        { name: 'Fertilizers', description: '' },
        { name: 'Herbicides and Pesticides', description: '' },
        { name: 'Fencing', description: '' },
        { name: 'Poultry', description: '' },
        { name: 'Piggery', description: '' },
        { name: 'Fishery', description: '' },
        { name: 'Beef', description: '' },
        { name: 'Dairy', description: '' },
        { name: 'Solar', description: '' },
        { name: 'Goat and Sheep', description: '' },
        { name: 'Tools and machinery', description: '' },

      ],
      
    },
    {
      name: 'Toys And Games',
      value: 'toys-and-games',
      icon: office,
      sub_categories: [
        { name: 'Action Figures & Statues', description: '' },
        { name: 'Arts & Crafts', description: '' },
        { name: 'Baby & Toddler Toys', description: '' },
        { name: 'Building Toys', description: '' },
        { name: 'Dolls & Accessories', description: '' },
        { name: 'Dress Up & Pretend Play', description: '' },
        { name: "Kids' Electronics", description: '' },
        { name: 'Games', description: '' },
        { name: 'Grown-Up Toys', description: '' },
        { name: 'Hobbies', description: '' },
        { name: "Kids' Furniture, Décor & Storage", description: '' },
        { name: 'Novelty & Gag Toys', description: '' },
        { name: 'Party Supplies', description: '' },
        { name: 'Puppets', description: '' },
        { name: 'Puzzles', description: '' },
        { name: 'Sports & Outdoor Play', description: '' },
        { name: 'Stuffed Animals & Plush Toys', description: '' },


      ],
      id: 10,
    },
    {
      name: 'Arts & Crafts  ',
      value: 'arts-and-rafts',
      icon: automotive,
      sub_categories: [
        { name: 'Painting, Drawing & Art Supplies', description: '' },
        { name: 'Beading & Jewelry Making', description: '' },
        { name: 'Crafting', description: '' },
        { name: 'Fabric', description: '' },
        { name: 'Fabric Decorating', description: '' },
        { name: 'Knitting & Crochet', description: '' },
        { name: "Needlework", description: '' },
        { name: 'Organization, Storage & Transport', description: '' },
        { name: 'Printmaking', description: '' },
        { name: 'Scrapbooking & Stamping', description: '' },
        { name: "Sewing", description: '' },
        { name: 'Party Decorations & Supplies', description: '' },
        { name: 'Gift Wrapping Supplies', description: '' },
      ],
      id: 12,
    },
    {
      name: 'Automotive',
      value: 'agriculture',
      icon: automotive,
      sub_categories: [
        { name: 'Car Care', description: '' },
        { name: 'Car Electronics & Accessories', description: '' },
        { name: 'Exterior Accessories', description: '' },
        { name: 'Interior Accessories', description: '' },
        { name: 'Lights & Lighting Accessories', description: '' },
        { name: 'Motorcycle & Powersports', description: '' },
        { name: "Oils & Fluids", description: '' },
        { name: 'Paint & Paint Supplies', description: '' },
        { name: 'Performance Parts & Accessories', description: '' },
        { name: 'Replacement Parts', description: '' },
        { name: "RV Parts & Accessories", description: '' },
        { name: 'Tires & Wheels', description: '' },
        { name: 'Tools & Equipment', description: '' },
        { name: 'Automotive Enthusiast Merchandise', description: '' },
        { name: 'Heavy Duty & Commercial Vehicle Equipment', description: '' },

      ],
      id: 167,
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
