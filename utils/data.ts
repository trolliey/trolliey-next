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

export const data = {
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
            title: 'toyota hilux',
            descrition: 'iam a a product iam a description of a product iam a description of a productiam a a product iam a description of a product iam a description of a product',
            rating: 4.5,
            price: 242,
            discount_price: 200,
            picture: '/img/surprise.jpg',
            id: 1,
            brand: 'Nike',
            numReviews: 14,
            countInStock: 20,
            category: 'Shirts',
            variants: [
                { size: 'xl', price: 250 },
                { size: 'xxl', price: 270 },
                { size: 'small', price: 220 }
            ]
        },
    ]
}