import {
  EmojiHappyIcon,
  CreditCardIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/outline'
import boys_fashion from "../public/img/boy's_fashion-min.png"
import grls_dashion from "../public/img/girl's_fashion-min.png"
import mens_fashion from "../public/img/men's_fashion-min.png"
import womans_ashion from "../public/img/Women's_Fashion-min.png"
import computers from '../public/img/Computers-min.png'
import electronics from '../public/img/Electronics_and_Wearables-min.png'
import agric from '../public/img/Agriculture-min.png'
import automotive from '../public/img/automotive-min.png'
import baby from '../public/img/baby-min.png'
import toys_and_games from '../public/img/toys_and_games-min.png'
import kitchen from '../public/img/home_and_kitchen-min.png'
import books from '../public//img/boooks_and_courses-min.png'
import beauty from '../public/img/beaty_and_personal_care-min.png'
import art from '../public/img/arts_and_craft-min.png'
import smart_home from '../public/img/smart_home-min.png'
import sport from '../public/img/sports_and_outdoor-min.png'
import tools from '../public/img/tools_and_home_improvement-min.png'
import pet_supplues from '../public/img/pet_supplies-min.png'
import software from '../public/img/software-min.png'
import health_house from '../public/img/health_and_household-min.png'
import kindle from '../public/img/kindle_and_ereaders-min.png'
import fashion from '../public/img/fashion.svg'
import samsung1 from '../public/images/shop_samsung.png'
import samsung2 from '../public/images/shop_samsung_SERIES.png'
import shop_samsung from '../public/images/shop_samsung_SERIES.png'
import tv_banners from '../public/images/tvs_banner.png'
import ecocash_icon from '../public/img/ECOCASH.svg'
import visa_icon from '../public/svg/visa.svg' 
import paypal_icon from '../public/img/paypal.png'
import mastercard from '../public/img/mastercard.svg'
 


export const data = {
  original_title: 'Trolliey Retail',
  site_description:
    "Zimbabwe's leading online store. Fast, reliable delivery to your door. Many ways to pay. Shop anything online: TV's, laptops cellphones, home appliances, and many more",
  site_url: 'https://www.trolliey.com',
  site_top_message: 'Free delivery on first order',
  payment_methods: [
    {name: 'ecocash', currency: 'zwl', icon: ecocash_icon},
    {name: 'visa', currency: 'usd', icon: visa_icon},
    {name: 'paypal', currency: 'usd', icon: paypal_icon},
    // {name: 'mastercard', currency: 'usd', icon: mastercard},

  ],
  cash_payment_methods: [
    {name: 'pay_on_delivery', currency: 'zwl'},
    {name: 'pay_on_collectioin', currency: 'zwl'},
    {name: 'pay_on_delivery', currency: 'usd'},
    {name: 'pay_on_collectioin', currency: 'usd'},

  ],
  banner_images: [
    // { body: 'First banner representantion', image: promo_1 },
    { body: 'Samsung', image: samsung1 },
    { body: 'Samsung', image: samsung2 },
    // { body: 'Keson tv banner', image: keson },
    { body: 'Sampung shops', image: shop_samsung },
    { body: 'tv ', image: tv_banners },



    // { body: 'Third banner representantion', image: promo_1 },
  ],
  primary_email: 'info@trolliey.com',
  // get current rate from api



  
  current_rate: {
    value: 600,
  },
  categories: [
    {
      name: 'Electronics & Wearable',
      value: 'electronics-and-wearable',
      icon: electronics,
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
      location: '/category/electronics-and-wearing'
    },
    {
      name: 'Phones & Tablets',
      value: 'phones-and-tablets',
      icon: electronics,
      sub_categories: [
        { name: 'Cell Phones', description: '' },
        { name: 'Cell Phone Accessories', description: '' },
        { name: 'Cases, Holsters & Sleeves', description: '' },
        { name: 'Cell Phone SIM Cards', description: '' },
        { name: 'Mobile Broadband', description: '' },
        { name: 'Tablet Accessories', description: '' },
        { name: 'Tablet Replacement Parts', description: '' },
        { name: 'Tablets', description: '' },
      ],
      id: 2,
      location: '/category/phones-and-tablets'

      
    },

    {
      name: 'Computers',
      value: 'computers',
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
      id: 2,
      location: '/category/computers'
    },
    {
      name: 'Agriculture',
      value: 'agriculture',
      icon: agric,
      id: 6,
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
      location: '/category/agriculture'
    },
    {
      name: 'Toys And Games',
      value: 'toys-and-games',
      icon: toys_and_games,
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
      id: 8,
    },
    {
      name: 'Automotive',
      value: 'automotive',
      icon: automotive,
      sub_categories: [
        { name: 'Car Care', description: '' },
        { name: 'Car Electronics & Accessories', description: '' },
        { name: 'Exterior Accessories', description: '' },
        { name: 'Interior Accessories', description: '' },
        { name: 'Lights & Lighting Accessories', description: '' },
        { name: 'Motorcycle & Powersports', description: '' },
        { name: 'Oils & Fluids', description: '' },
        { name: 'Paint & Paint Supplies', description: '' },
        { name: 'Performance Parts & Accessories', description: '' },
        { name: 'Replacement Parts', description: '' },
        { name: 'RV Parts & Accessories', description: '' },
        { name: 'Tires & Wheels', description: '' },
        { name: 'Tools & Equipment', description: '' },
        { name: 'Automotive Enthusiast Merchandise', description: '' },
        { name: 'Heavy Duty & Commercial Vehicle Equipment', description: '' },
      ],
      id: 10,
    },
    {
      name: 'Baby',
      value: 'baby',
      icon: baby,
      sub_categories: [
        { name: 'Activity & Entertainment', description: '' },
        { name: 'Apparel & Accessories', description: '' },
        { name: 'Baby & Toddler Toys', description: '' },
        { name: 'Baby Care', description: '' },
        { name: 'Baby Stationery', description: '' },
        { name: 'Car Seats & Accessories', description: '' },
        { name: 'Diapering', description: '' },
        { name: 'Feeding', description: '' },
        { name: 'Gifts', description: '' },
        { name: 'Nursery', description: '' },
        { name: 'Potty Training', description: '' },
        { name: 'Pregnancy & Maternity', description: '' },
        { name: 'Safety', description: '' },
        { name: 'Strollers & Accessories', description: '' },
        { name: 'Travel Gear', description: '' },
      ],
      id: 7,
    },
    {
      name: 'Home and kitchen',
      value: 'home-and-kitchen',
      icon: kitchen,
      sub_categories: [
        { name: "Kids' Home Store", description: '' },
        { name: 'Kitchen & Dining', description: '' },
        { name: 'Bedding', description: '' },
        { name: 'Bath', description: '' },
        { name: 'Furniture', description: '' },
        { name: 'Home Décor', description: '' },
        { name: 'Wall Art', description: '' },
        { name: 'Lighting & Ceiling Fans', description: '' },
        { name: 'Seasonal Décor', description: '' },
        { name: 'Event & Party Supplies', description: '' },
        { name: 'Heating, Cooling & Air Quality', description: '' },
        { name: 'Irons & Steamers', description: '' },
        { name: 'Vacuums & Floor Care', description: '' },
        { name: 'Storage & Organization', description: '' },
        { name: 'Cleaning Supplies', description: '' },
      ],
      id: 4,
    },
    {
      name: 'Books & Courses',
      value: 'books-and-courses',
      icon: books,
      sub_categories: [
        { name: 'Gifts of Faith Store', description: '' },
        { name: 'Fiction', description: '' },
        { name: "Children's Books", description: '' },
        { name: 'Non Fiction', description: '' },
        { name: 'Inspired Reading', description: '' },
        { name: 'Christian Living', description: '' },
        { name: 'International New Releases', description: '' },
        { name: 'Top Gifts for Kids', description: '' },
        { name: 'Best Young Adult Books', description: '' },
        { name: 'Shona Novels', description: '' },
        { name: 'EBooks', description: '' },
      ],
      id: 8986,
    },
    {
      name: 'Beauty And Personal Care',
      value: 'beauty-and-personal-care',
      icon: beauty,
      sub_categories: [
        { name: 'Makeup', description: '' },
        { name: 'Skin Care', description: '' },
        { name: 'Hair Care', description: '' },
        { name: 'Fragrance', description: '' },
        { name: 'Foot, Hand & Nail Care', description: '' },
        { name: 'Tools & Accessories', description: '' },
        { name: 'Shave & Hair Removal', description: '' },
        { name: 'Personal Care', description: '' },
        { name: 'Oral Care', description: '' },
      ],
      id: 11,
    },

    {
      name: "Women's Fashion",
      value: 'womens-fashion',
      icon: womans_ashion,
      sub_categories: [
        { name: 'Clothing', description: '' },
        { name: 'Shoes', description: '' },
        { name: 'Jewelry', description: '' },
        { name: 'Watches', description: '' },
        { name: 'Handbags', description: '' },
        { name: 'Accessories', description: '' },
        { name: "Men's Fashion", description: '' },
        { name: "Girls' Fashion", description: '' },
      ],
      id: 3,
    },
    {
      name: "Men's Fashion",
      value: 'mens-fashion',
      icon: mens_fashion,
      sub_categories: [
        { name: 'Clothing', description: '' },
        { name: 'Shoes', description: '' },
        { name: 'Watches', description: '' },
        { name: 'Accessories', description: '' },
        { name: 'Handbags', description: '' },
        { name: 'Accessories', description: '' },
        { name: "Men's Fashion", description: '' },
        { name: "Boys' Fashion", description: '' },
      ],
      id: 4,
    },
    {
      name: "Girls' Fashion",
      value: 'smart-home',
      icon: grls_dashion,
      sub_categories: [
        { name: 'Clothing', description: '' },
        { name: 'Shoes', description: '' },
        { name: 'Jewelry', description: '' },
        { name: 'Watches', description: '' },
        { name: 'Accessories', description: '' },
        { name: 'School Uniforms', description: '' },
        { name: "Women's Fashion", description: '' },
        { name: "Men's Fashion", description: '' },
        { name: "Boys' Fashion", description: '' },
      ],
      id: 13,
    },
    {
      name: "Boys' Fashion",
      value: 'boys-fashion',
      icon: boys_fashion,
      sub_categories: [
        { name: 'Clothing', description: '' },
        { name: 'Shoes', description: '' },
        { name: 'Jewelry', description: '' },
        { name: 'Watches', description: '' },
        { name: 'Accessories', description: '' },
        { name: 'School Uniforms', description: '' },
        { name: "Women's Fashion", description: '' },
        { name: "Men's Fashion", description: '' },
        { name: "Girls' Fashion", description: '' },
      ],
      id: 13,
    },
    {
      name: 'luggage',
      value: 'luggage',
      icon: fashion,
      id: 5,
      sub_categories: [
        { name: 'Carry-ons', description: '' },
        { name: "Backpacks", description: '' },
        { name: "Garment bags", description: '' },
        { name: 'Travel Totes', description: '' },
        { name: 'Luggage Sets', description: '' },
        { name: 'Laptop Bags', description: '' },
        { name: 'Suitcases', description: '' },
        { name: 'Kids Luggage', description: '' },
        { name: 'Messenger Bags', description: '' },
        { name: 'Umbrellas', description: '' },
        { name: 'Duffles', description: '' },
        { name: 'Travel Accessories', description: '' },
      ],
    },

    {
      name: 'Arts & Crafts  ',
      value: 'arts-and-rafts',
      icon: art,
      sub_categories: [
        { name: 'Painting, Drawing & Art Supplies', description: '' },
        { name: 'Beading & Jewelry Making', description: '' },
        { name: 'Crafting', description: '' },
        { name: 'Fabric', description: '' },
        { name: 'Fabric Decorating', description: '' },
        { name: 'Knitting & Crochet', description: '' },
        { name: 'Needlework', description: '' },
        { name: 'Organization, Storage & Transport', description: '' },
        { name: 'Printmaking', description: '' },
        { name: 'Scrapbooking & Stamping', description: '' },
        { name: 'Sewing', description: '' },
        { name: 'Party Decorations & Supplies', description: '' },
        { name: 'Gift Wrapping Supplies', description: '' },
      ],
      id: 9,
    },

    {
      name: 'Smart Home',
      value: 'smart-home',
      icon: smart_home,
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
      id: 12,
    },

    {
      name: 'Luggage',
      value: 'luggage',
      icon: beauty,
      sub_categories: [
        { name: 'Carry-ons', description: '' },
        { name: 'Backpacks', description: '' },
        { name: 'Garment bags', description: '' },
        { name: 'Watches', description: '' },
        { name: 'Accessories', description: '' },
      ],
      id: 12,
    },
    {
      name: 'Sports And Outdoors',
      value: 'sports-and-outdoors',
      icon: sport,
      sub_categories: [
        { name: 'Sports and Outdoors', description: '' },
        { name: 'Outdoor Recreation', description: '' },
        { name: 'Sports & Fitness', description: '' },
        { name: 'Fan Shop', description: '' },
      ],
      id: 6765,
    },
    {
      name: 'Tools & Home Improvement',
      value: 'tools-and-home-improvement',
      icon: tools,
      sub_categories: [
        { name: 'Appliances', description: '' },
        { name: 'Building Supplies', description: '' },
        { name: 'Electrical', description: '' },
        { name: 'Kitchen & Bath Fixtures', description: '' },
        { name: 'Light Bulbs', description: '' },
        { name: 'Lighting & Ceiling Fans', description: '' },
        { name: 'Measuring & Layout Tools', description: '' },
        { name: 'Painting Supplies & Wall Treatments', description: '' },
        { name: 'Power & Hand Tools', description: '' },
        { name: 'Rough Plumbing', description: '' },
        { name: 'Safety & Security', description: '' },
        { name: 'Storage & Home Organization', description: '' },
        { name: 'Welding & Soldering', description: '' },
      ],
      id: 6765,
    },
    {
      name: 'Pet Supplies',
      value: 'pet-supplies',
      icon: pet_supplues,
      sub_categories: [
        { name: 'Dogs', description: '' },
        { name: 'Cats', description: '' },
        { name: 'Fish & Aquatic Pets', description: '' },
        { name: 'Birds', description: '' },
        { name: 'Horses', description: '' },
        { name: 'Reptiles & Amphibians', description: '' },
        { name: 'Small Animals', description: '' },
      ],
      id: 676765,
    },
    {
      name: 'Software',
      value: 'software',
      icon: software,
      sub_categories: [
        { name: 'Accounting & Finance', description: '' },
        { name: 'Antivirus & Security', description: '' },
        { name: 'Business & Office', description: '' },
        { name: "Children's", description: '' },
        { name: 'Design & Illustration', description: '' },
        { name: 'Digital Software', description: '' },
        { name: 'Education & Reference', description: '' },
        { name: 'Games', description: '' },
        { name: 'Lifestyle & Hobbies', description: '' },
        { name: 'Music', description: '' },
        { name: 'Networking & Servers', description: '' },
        { name: 'Operating Systems', description: '' },
        { name: 'Photography', description: '' },
        { name: 'Programming & Web Development', description: '' },
        { name: 'Tax Preparation', description: '' },
        { name: 'Utilities', description: '' },
        { name: 'Video', description: '' },
      ],
      id: 676765,
    },
    {
      name: 'Health And Household',
      value: 'health-and-household',
      icon: health_house,
      sub_categories: [
        { name: 'Baby & Child Care', description: '' },
        { name: 'Health Care', description: '' },
        { name: 'Household Supplies', description: '' },
        { name: 'Medical Supplies & Equipment', description: '' },
        { name: 'Oral Care', description: '' },
        { name: 'Personal Care', description: '' },
        { name: 'Sexual Wellness', description: '' },
        { name: 'Sports Nutrition', description: '' },
        { name: 'Stationery & Gift Wrapping Supplies', description: '' },
        { name: 'Vision Care', description: '' },
        { name: 'Vitamins & Dietary Supplements', description: '' },
        { name: 'Wellness & Relaxation', description: '' },
      ],
      id: 6732765,
    },
    {
      name: 'Kindle E-Readers',
      value: 'pet-supplies',
      icon: kindle,
      sub_categories: [
        { name: 'Kindle Kids', description: '' },
        { name: 'Kindle', description: '' },
        { name: 'Kindle Paperwhite', description: '' },
        { name: 'Kindle Oasis', description: '' },
        { name: 'Accessories', description: '' },
        { name: 'See all Kindle E-Readers', description: '' },
      ],
      id: 676905,
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
