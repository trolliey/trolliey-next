import { EmojiHappyIcon, CreditCardIcon, ShoppingBagIcon, CurrencyDollarIcon } from '@heroicons/react/outline'
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

export const data = {
    users: [
        { name: 'tatenda', email: 'admin@example.com', password: bcrypt.hashSync('123456'), role: 'admin' },
        { name: 'seller', email: 'seller@example.com', password: bcrypt.hashSync('123456'), role: 'seller' },
        { name: 'user', email: 'user@example.com', password: bcrypt.hashSync('123456'), role: 'user' },

    ],
    categories: [
        { name: 'Sports and training', value: "sports-&-training", icon: sport },
        { name: 'Books & courses', value: 'sooks-&-courses', icon: books },
        { name: 'Groceries', value: 'groceries', icon: groceries },
        { name: 'Gaming', value: 'gaming', icon: gaming },
        { name: 'Computer & electronics', value: 'computer-&-electronics', icon: computers },
        { name: 'Camping & outdoors', value: 'camping-&-outdoors', icon: camping },
        { name: 'Fashion & luggage', value: 'fashion-&-luggage', icon: fashion },
        { name: 'Kitchen appliances', value: 'kitchen-appliances', icon: kitchen },
        { name: 'Beauty & fragrances', value: 'beauty-and-fragrances', icon: beauty },
        { name: 'Homeware & appliances', value: 'homeware-&-large-appliances', icon: homeware },
        { name: 'Baby & toddler', value: "baby-&-toddler", icon: baby },
        { name: 'Office & Stationery', value: "office-and-stationery", icon: office },
        { name: 'Outdoor & patio', value: "outdoor-and-patio", icon: outdoor },
        { name: 'TV audio and electronics', value: "tv-audio-and-electronics", icon: tv },
        { name: 'Cellphone & wearables ', value: "cellphone-&-wearables ", icon: cellphone },
        { name: 'Automitive & D.I.Y ', value: "automitive-&-D.I.Y", icon: automotive },

    ],
    benefits: [
        { heading: 'Free shipment', details: 'Free shipment for bulk goods', icon: ShoppingBagIcon, },
        { heading: 'Anyplace anytime', details: 'Many methods', icon: CreditCardIcon },
        { heading: '100% Satisfaction', details: 'great customer care', icon: EmojiHappyIcon },
        { heading: 'Save money', details: 'frequent discounts', icon: CurrencyDollarIcon },
    ],
    products: [
        {
            title: 'my hodies',
            slug: 'my-hoodies',
            description: 'iam a a product iam a description of a product iam a description of a productiam a a product iam a description of a product iam a description of a product',
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
                    discount_price: 11
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
                    discount_price: 7
                },


            ],
            store_id: 'aoiuyoiuyasd',
            store_name: 'Trolliey',
            ratings: 'asjf;lja;slkdjf;lajsf'
        },
        {
            title: 'another item',
            slug: 'another-item',
            description: 'iam a a product iam a description of a product iam a description of a productiam a a product iam a description of a product iam a description of a product',
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
            ratings: 'fashphoiuahodsfkjhljkhasf'
        },
        {
            title: 'another item',
            slug: 'another-item',
            description: 'iam a a product iam a description of a product iam a description of a productiam a a product iam a description of a product iam a description of a product',
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
            ratings: 'fashphoiuahodsfkjhljkhasf'
        },
    ]
}