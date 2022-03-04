import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import React, { ReactElement, useState } from 'react'
import ProductItem from '../ProductItem/ProductItem'

interface Props {
    products?: any | null
}

function FeaturedProducts({ products }: Props): ReactElement {
    const [show_indicators, setShowIndicators] = useState<boolean>(false)

    const handleOnPrevClick = () => {
        console.log('previous')
    }

    const handleOnNextClick = () => {
        console.log('next')
    }

    return (
        <div
            onMouseEnter={() => setShowIndicators(true)}
            onMouseLeave={() => setShowIndicators(false)}
            className='relative grid lg:grid-cols-5 md:grid-cols-4 grid-cols-2 md:gap-8 gap-4 mx-auto bg-white p-4 rounded-lg' >
            {products?.map((product: any, index: number) => (
                <div key={index} className="p-0 col-span-1">
                    <ProductItem
                        name={product.title}
                        description={product.description}
                        rating={product.rating}
                        picture={product.pictures[0]}
                        price={product.price}
                        discount_price={product.discount_price}
                        category={product.category}
                        id={product._id}
                    />
                </div>
            ))}
            <div className="absolute w-full top-1/2 transform -translate-y-1/2 flex justify-between items-start px-3">
                {
                    show_indicators && (
                        <>
                            <button onClick={handleOnPrevClick} className="p-2 bg-gray-100 rounded-full">
                                <ChevronLeftIcon height={20} width={20} className="text-gray-700" />
                            </button>
                            <button onClick={handleOnNextClick} className="p-2 bg-gray-100 rounded-full">
                                <ChevronRightIcon height={20} width={20} className="text-gray-700" />
                            </button>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default FeaturedProducts
