import React, { useState } from 'react'
import GeneralLayout from '../../../layouts/GeneralLayout'
import { Tab } from '@headlessui/react'
import { ShoppingCartIcon, InformationCircleIcon } from '@heroicons/react/solid'
import { PlusIcon } from '@heroicons/react/outline'
import { Spinner } from '@chakra-ui/spinner'
import logo from '../../../public/img/full_logo.png'
import { Avatar, Divider } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import picture from '../../../public/img/clothes.jpg'
import picture2 from '../../../public/img/tech_stuff.jpg'
import Image from 'next/image'
import BlueButton from '../../../components/Buttons/BlueButton'
import BlackButton from '../../../components/Buttons/BlackButton'
import RatingComponent from '../../../components/Rating/RatingComponent'

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

function ProductDescription() {
    const history = useRouter()
    const { id } = history.query

    const [showMore, setShowMore] = useState<boolean>(false);
    const [selected_variant, setSelectedVariant] = useState<any>()
    const [show_features, setShowFeatures] = useState<boolean>(false)

    const add_to_basket = () => {
        console.log('items added to cart')
    }

    const product = {
        title: 'toyota hilux',
        descrition: 'iam a a product iam a description of a product iam a description of a productiam a a product iam a description of a product iam a description of a product',
        averageRating: 4.5,
        price: 242,
        discount_price: 20,
        pictures: ['/img/surprise.jpg', '/img/cat-travel.jpg'],
        id: 1,
        brand: 'Nike',
        numReviews: 14,
        countInStock: 20,
        category: 'Shirts',
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
    }

    console.log(id)
    return (
        <GeneralLayout title={product.title} description={product.descrition}>
            <div className="flex flex-col max-w-7xl bg-gray-100">
                <div className="flex-1 mx-auto w-full rounded ">
                    <div className="max-w-2xl mx-auto md:pb-8  lg:max-w-7xl lg:px-0 md:px-0 px-2">
                        <div className="lg:grid lg:grid-cols-3 lg:gap-x-8 lg:items-start">
                            {/* Image gallery */}
                            <Tab.Group as="div" className="flex flex-col-reverse bg-white md:p-8 p-4 rounded-lg col-span-2">
                                {/* Image selector */}
                                <div className="mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
                                    <Tab.List className="grid md:grid-cols-8 grid-cols-4 gap-2">
                                        {product?.pictures.map((image, index) => (
                                            <Tab
                                                key={index}
                                                className="relative h-16 w-16 bg-gray-100 rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                                            >
                                                {({ selected }) => (
                                                    <>
                                                        <span className="sr-only">{'image'}</span>
                                                        <span className="absolute inset-0 rounded-md overflow-hidden">
                                                            <Image src={image} objectFit="cover" layout='fill' alt="for a single product" className="w-full h-full object-center object-cover rounded" />
                                                        </span>
                                                        <span
                                                            className={classNames(
                                                                selected ? 'ring-blue-primary' : 'ring-transparent',
                                                                'absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none'
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                    </>
                                                )}
                                            </Tab>
                                        ))}
                                    </Tab.List>
                                </div>

                                <Tab.Panels className="w-full aspect-w-1 aspect-h-1 flex-1 overflow-hidden max-h-[650px] rounded-lg">
                                    {product?.pictures.map((image, index) => (
                                        <Tab.Panel key={index} className=" rounded" >
                                            {/* <>
                                                <ImageMagnifier src={image} height={'100%'} width={"100%"} />
                                            </> */}
                                            <Image
                                                src={image}
                                                layout="responsive"
                                                width={'100%'}
                                                height={'100%'}
                                                objectFit="cover"
                                                alt={'for the product'}
                                                className="w-full h-full object-center object-cover sm:rounded-lg bg-gray-100"
                                            />
                                        </Tab.Panel>
                                    ))}
                                </Tab.Panels>
                            </Tab.Group>

                            {/* Product info */}
                            <div className="mt-10 sm:px-0 sm:mt-16 lg:mt-0 rounded">
                                <div className="flex bg-white md:px-8 px-2 py-4 flex-col rounded">
                                    <h2 className=" tracking-tight text-gray-400 text-sm font-semibold">{product?.category}</h2>
                                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 uppercase">{product?.title}</h1>

                                    {/* Reviews */}
                                    <div className="mt-2">
                                        <h3 className="sr-only">Reviews</h3>
                                        <div className="flex items-center">
                                            <div className="flex items-center">
                                                <RatingComponent
                                                    ratings={Math.floor(product?.averageRating)}
                                                />
                                            </div>
                                            <p className="sr-only">{product?.averageRating} out of 5 stars</p>
                                        </div>
                                    </div>

                                    <div className="my-3">
                                        <h6 className="sr-only">Product information</h6>
                                        <div className="flex flex-row items-center gap-4">

                                            {
                                                selected_variant ? (
                                                    <p className="text-2xl font-bold text-gray-700">${selected_variant?.price - selected_variant?.discount_price}</p>
                                                ) : (
                                                    <p className="text-2xl font-bold text-gray-700">${product?.price - product?.discount_price}</p>
                                                )
                                            }
                                            {
                                                selected_variant ? (
                                                    <p className="text-xl line-through text-gray-300">${selected_variant.price}</p>
                                                ) : (
                                                    <p className="text-xl line-through text-gray-300">${product?.price}</p>
                                                )
                                            }
                                        </div>
                                    </div>

                                    <Divider className='my-2' />

                                    {/* // variants */}
                                    <div className="flex flex-col mb-4">
                                        <h6 className='text-sm font-semibold text-gray-700 mb-1'>Variants</h6>
                                        <div className="grid grid-cols-4 md:gap-4 gap-2 p-1">
                                            {
                                                product.variants.map((item, index) => (
                                                    <span onClick={() => setSelectedVariant(item)} key={index} className={`${item.variant === selected_variant?.variant ? "bg-blue-primary text-white" : ""} border border-gray-300 hover:border-gray-700 hover:text-gray-700 cursor-pointer col-span-1 text-gray-700 py-1 px-2 text-xs uppercase rounded-full`}>
                                                        <p className='text-center'>{item.variant}</p>
                                                    </span>
                                                ))
                                            }
                                        </div>
                                    </div>

                                    {/* // add to cart button */}
                                    <div className=" mb-2">
                                        <BlueButton
                                            text={
                                                <div className='flex flex-row items-center space-x-1 mx-auto w-full justify-center content-center'>
                                                    <PlusIcon height={10} width={10} />
                                                    <ShoppingCartIcon height={12} width={12} />
                                                    <p>Add to cart </p>
                                                </div>
                                            }
                                            className="flex-1 w-full" onClick={add_to_basket} />
                                    </div>
                                </div>


                                <div className="flex flex-col bg-white my-4 md:px-8 px-2 py-4 rounded">

                                    {/* <Divider className='my-2' /> */}

                                    <div className="">
                                        {/* Colors */}

                                        <div className="mt-2">
                                            <div className="mb-2 text-gray-800 text-sm capitalize font-semibold flex flex-row items-center ">

                                                <div className="flex flex-row items-center">
                                                    <p className="text-gray-500 mr-2">Delivered by </p>
                                                    <div className="text-gray-500">
                                                        <Image height={10} objectFit="contain" src={logo} alt="logo on descriprion page" className='h-6' />
                                                    </div>

                                                </div>
                                            </div>
                                            {
                                                product?.price > 50 ? (
                                                    <p className='text-gray-700 text-sm font-semibold'>Free delivery around Zimbabwe</p>
                                                ) : (
                                                    <p className='text-gray-700 text-sm font-semibold'>Buy items for more than $50 for free delivery</p>
                                                )
                                            }


                                            <div className="border-t border-b py-2 mt-2 flex flex-row items-center">
                                                <p className='text-gray-700 font-semibold text-sm'>In Stock</p>
                                                <p className='p-1 bg-gray-200 rounded text-xs ml-2'>HRE</p>
                                            </div>

                                            <div className="flex flex-row items-center gap-2 mt-2">
                                                <p className='text-xs text-gray-700'>Eligible in cash on delivery</p>
                                                <div className="flex flex-col rounded-full">
                                                    <InformationCircleIcon className='text-green-700' height={16} width={16} />
                                                </div>
                                            </div>
                                            <div className="flex flex-row items-center gap-2">
                                                <p className='text-xs text-gray-700 my-1'>6-Months Limited Waranty</p>
                                                <div className="flex flex-col rounded-full">
                                                    <InformationCircleIcon className='text-green-700' height={16} width={16} />
                                                </div>
                                            </div>
                                            <div className="flex flex-row items-center gap-2">
                                                <p className='text-xs text-gray-700 my-1'>Cash on delivery accepted</p>
                                                <div className="flex flex-col rounded-full">
                                                    <InformationCircleIcon className='text-green-700' height={16} width={16} />
                                                </div>
                                            </div>

                                        </div>
                                        <div className="mt-4">
                                            <div className="md:col-span-2 col-span-3 flex flex-row items-center w-full">
                                                <div onClick={() => console.log('add to compare')} className="text-blue-primary flex-1 border border-blue-primary rounded p-2 text-center font-semibold capitalize hover:bg-blue-primary hover:text-white cursor-pointer">
                                                    compare
                                                </div>
                                            </div>

                                        </div>
                                        <div className="my-2"></div>
                                        <div className="">
                                            <BlackButton text='Buy Item Now' className="w-full flex-1" onClick={() => {
                                                add_to_basket()
                                                history.push('/payment')
                                            }} />
                                        </div>
                                    </div>
                                </div>
                                <div onClick={() => history.push(`/stores/single/${product?.store_id}`)} className="flex flex-row space-x-4 items-center p-4 rounded border border-gray-200 bg-white cursor-pointer">
                                    {/*@ts-ignore */}
                                    <Avatar src={product?.store_pic} name={product?.store_name} className="text-gray-700" />
                                    <div className="flex flex-col">
                                        <p className="text-gray-700 font-semibold">View {product?.store_name}'s store</p>
                                        <p className="text-gray-400 text-sm">View the seller's shop and catalogues</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* // description compoennt */}
                        <section className='w-full mt-6 '>
                            <div className="flex border-b border-t border-gray-200">
                                {
                                    show_features ? (
                                        <div className="flex flex-row items-center">
                                            <span onClick={() => setShowFeatures(false)} className='hover:bg-gray-50 cursor-pointer p-4'>Description</span>
                                            <span onClick={() => setShowFeatures(true)} className='p-4 border-b-2 hover:bg-gray-50 cursor-pointer border-blue-primary font-semibold text-blue-primary'>Product Features</span>
                                        </div>
                                    ) : (
                                        <div className="flex flex-row items-center">
                                            <span onClick={() => setShowFeatures(false)} className=' border-b-2 p-4 hover:bg-gray-50 cursor-pointer border-blue-primary font-semibold text-blue-primary'>Description</span>
                                            <span onClick={() => setShowFeatures(true)} className='p-4 hover:bg-gray-50 cursor-pointer'>Product Features</span>
                                        </div>
                                    )
                                }
                            </div>
                            {/* {
                                show_features ? (
                                    <>
                                        <ul className='mt-6'>
                                            {product?.additional_features.map((item, index) => (
                                                <li key={item}>{index + 1}. {item}</li>
                                            ))}
                                        </ul>
                                    </>
                                ) : (
                                    <div className="mt-2">
                                        <h3 className="sr-only">Description</h3>

                                        <span className="flex-grow w-full">
                                            <div className="flex mb-4 flex-col">
                                                {showMore ? <div
                                                    className="text-base text-gray-700 space-y-6 leading-normal"
                                                    dangerouslySetInnerHTML={{ __html: product?.description }}
                                                /> : <div
                                                    className="text-base text-gray-700 space-y-6 leading-normal"
                                                    dangerouslySetInnerHTML={{ __html: product?.description.substring(0, 500) }}
                                                />}
                                            </div>
                                            <span onClick={() => setShowMore(!showMore)} className="bg-blue-primary self-center mx-auto text-white font-semibold text-center my-4 p-2 rounded text-xs">
                                                {showMore ? "Read Less" : "Read More"}
                                            </span>

                                        </span>
                                    </div>
                                )
                            } */}
                        </section>
                    </div>
                </div>
                {/* <div className="related_products mt-16">
                    <>
                        <RelatedProducts cols="lg:grid-cols-5 " category={product?.product.category_slug} />
                    </>
                </div> */}
            </div>
        </GeneralLayout>
    )
}

export default ProductDescription