import React from 'react'
import GeneralLayout from '../Layouts/GeneralLayout'
import { data } from '../utils/data';
import promo_1 from '../public/img/promo_1.png'
import promo_2 from '../public/img/fregrance_sale.png'
import samsung from '../public/img/samsung.svg'
import defy from '../public/img/defy.svg'
import kenwood from '../public/img/kenwood-logo.svg'
import dell from '../public/img/dell-logo.svg'
import oppo from '../public/img/oppo-logo.svg'
import surprise from '../public/img/surprise.jpg'
import tech_stuff from '../public/img/tech_stuff.jpg'
import clothes from '../public/img/clothes.jpg'
import Image from 'next/image'
import CategoriesDropdown from '../Components/Dropdowns/CategoriesDropdown'
import Courosel from '../Components/Carousel/Courosel'

if (typeof document === 'undefined') {
  React.useLayoutEffect = React.useEffect;
}

export default function Home() {

  const banner_images = [
    { body: '', image: promo_1 },
    { body: '', image: promo_2 },
    { body: '', image: promo_1 }
  ]

  const search_by_category = (category: any) => {
    console.log(category)
  }
  var randomItem = data.categories[Math.floor(Math.random() * data.categories.length)];

  return (
    <GeneralLayout
      title={'Buy More. Spend Less'}
      description={"Zimbabwe's best buy and sell modern ecommerce platform. You can become a seller or become a buyer and trade your items from anywhere you like."}
      no_text={false}
    >
      <main className="min-h-screen">
        {/* // banner and categories */}
        <p>Home page</p>
      </main>
    </GeneralLayout>
  )
}
