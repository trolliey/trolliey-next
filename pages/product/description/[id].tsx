import React, { useContext, useState } from 'react'
import GeneralLayout from '../../../layouts/GeneralLayout'
import { Tab } from '@headlessui/react'
import { ShoppingCartIcon, InformationCircleIcon } from '@heroicons/react/solid'
import { PlusIcon } from '@heroicons/react/outline'
import logo from '../../../public/img/full_logo.png'
import { Avatar, Divider, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import BlueButton from '../../../components/Buttons/BlueButton'
import BlackButton from '../../../components/Buttons/BlackButton'
import RatingComponent from '../../../components/Rating/RatingComponent'
import { connect, convertDocToObj, disconnect } from '../../../utils/mongo'
import Products from '../../../models/Product'
import { Store } from '../../../Context/Store'
import ProductStore from '../../../models/Store'
import axios from 'axios'
import RelatedProducts from '../../../components/HomeSections/RelatedProducts'

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

function ProductDescription(props: any) {
    const { dispatch } = useContext(Store)
    const { product, store} = props
    const history = useRouter()

    const [selected_variant, setSelectedVariant] = useState<any>()
    const [show_features, setShowFeatures] = useState<boolean>(false)
    const [showMore, setShowMore] = useState<any>()

    // for toast
    const toast = useToast()

    const add_to_basket = async () => {
        const { data } = await axios.get(`/api/products/${product?._id}`)
        if (data?.countInStock <= 0) {
            alert('Sorry. Product our of stock')
            return
        }
        dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity: 1 } })
        toast({
            title: `${product?.title} added to cart.`,
            position: 'top-right',
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
    }

    const buy_item_now = async () =>{
        const { data } = await axios.get(`/api/products/${product?._id}`)
        if (data?.countInStock <= 0) {
            alert('Sorry. Product our of stock')
            return
        }
        dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity: 1 } })
        toast({
            title: `${product?.title} added to cart.`,
            position: 'top-right',
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
        history.push('/shipping')
    }

    return (
        <GeneralLayout 
            title={product.title} 
            description={product.description} 
            og_image={product.pictures[0]}
            twitter_title={product?.title}
            twitter_description={product?.description}
            >
            <div className="flex flex-col max-w-7xl bg-gray-100">
                <div className="flex-1 mx-auto w-full rounded ">
                    <div className="max-w-2xl mx-auto md:pb-8  lg:max-w-7xl lg:px-0 md:px-0">
                        <div className="lg:grid lg:grid-cols-3 lg:gap-x-8 lg:items-start">
                            {/* Image gallery */}
                            <Tab.Group as="div" className="flex flex-col-reverse bg-white md:p-8 p-4 rounded-lg col-span-2">
                                {/* Image selector */}
                                <div className="mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
                                    <Tab.List className="grid md:grid-cols-8 grid-cols-4 gap-2">
                                        {product?.pictures.map((image: any, index: number) => (
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
                                    {product?.pictures.map((image: any, index: number) => (
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
                                                    <p className="text-xl line-through text-gray-300">${selected_variant?.price}</p>
                                                ) : (
                                                    <p className="text-xl line-through text-gray-300">${product?.price}</p>
                                                )
                                            }
                                        </div>
                                    </div>

                                    <Divider className='my-2' />

                                    {/* // variants */}
                                    <div className="flex flex-col">
                                        <h6 className='text-sm font-semibold text-gray-700 mb-1'>Variants:</h6>
                                        {product?.variants.length > 0 ? (
                                            <div className="grid grid-cols-4 md:gap-4 gap-2 p-1">
                                                {
                                                    product?.variants.map((item: any, index: number) => (
                                                        <span onClick={() => setSelectedVariant(item)} key={index} className={`${item.variant === selected_variant?.variant ? "bg-blue-primary text-white" : ""} border border-gray-300 hover:border-gray-700 hover:text-gray-700 cursor-pointer col-span-1 text-gray-700 py-1 px-2 text-xs uppercase rounded-full`}>
                                                            <p className='text-center'>{item.variant}</p>
                                                        </span>
                                                    ))
                                                }
                                            </div>
                                        ) : (
                                            <div className="flex flex-col">
                                                <p className='text-center text-gray-500 text-sm'>This product has no variants</p>
                                            </div>
                                        )}

                                    </div>
                                    <Divider className='my-4' />

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
                                                    <p className="text-gray-500 mr-2">Delivered by</p>
                                                    <div className="text-gray-500">
                                                        <Image width={80} objectFit="contain" src={logo} alt="logo on descriprion page" className='h-6' />
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
                                                {
                                                    product?.countInStock >= 1 ?
                                                        <p className='text-gray-700 font-semibold text-sm'>{selected_variant ? selected_variant.countInStock : product?.countInStock} In Stock</p> :
                                                        <p className='text-gray-700 font-semibold text-sm'>Out of stock</p>
                                                }
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
                                            <BlackButton text='Buy Item Now' className="w-full flex-1" onClick={buy_item_now}/>
                                        </div>
                                    </div>
                                </div>
                                <div onClick={() => history.push(`/store/${product?.store_id}/products`)} className="flex flex-row space-x-4 items-center p-4 rounded border border-gray-200 bg-white cursor-pointer">
                                    {/*@ts-ignore */}
                                    <Avatar src={store?.logo} name={store?.company_name} className="text-gray-700" />
                                    <div className="flex flex-col">
                                        <p className="text-gray-700 font-semibold">View {store?.company_name}'s store</p>
                                        <p className="text-gray-400 text-sm">View the seller's shop and catalogues</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* // description compoennt */}
                        <section className='w-full md:mt-8 mt-4 '>
                            <div className="flex">
                                {
                                    show_features ? (
                                        <div className="flex flex-row items-center">
                                            <span onClick={() => setShowFeatures(false)} className='hover:bg-gray-50 cursor-pointer p-4'>Description</span>
                                            <span onClick={() => setShowFeatures(true)} className='p-4 border-b-2 border-blue-primary rounded-t hover:bg-gray-50 cursor-pointer  font-semibold bg-white text-blue-primary'>Product Features</span>
                                        </div>
                                    ) : (
                                        <div className="flex flex-row items-center">
                                            <span onClick={() => setShowFeatures(false)} className='p-4 border-b-2 border-blue-primary hover:bg-gray-50 rounded-t cursor-pointer  bg-white font-semibold text-blue-primary'>Description</span>
                                            <span onClick={() => setShowFeatures(true)} className='p-4 hover:bg-gray-50 cursor-pointer'>Product Features</span>
                                        </div>
                                    )
                                }
                            </div>
                            {
                                show_features ? (
                                    <>
                                        <ul className='p-6 bg-white rounded text-center'>
                                            no additional features added
                                        </ul>
                                    </>
                                ) : (
                                    <div className="md:px-16 md:py-4 py-2 px-4 w-full flex bg-white rounded">
                                        <h3 className="sr-only">Description</h3>

                                        <span className="flex-grow w-full ">
                                            <div className="flex mb-4 flex-col">
                                                {showMore ? <div
                                                    className="text-base text-gray-700 space-y-6 leading-normal"
                                                    dangerouslySetInnerHTML={{ __html: product?.description }}
                                                /> : <div
                                                    className="text-base text-gray-700 space-y-6 leading-normal"
                                                    dangerouslySetInnerHTML={{ __html: product?.description.substring(0, 500) }}
                                                />}
                                            </div>
                                            <span onClick={() => setShowMore(!showMore)} className="bg-blue-primary mx-auto w-full cutsor-pointer self-center text-white font-semibold text-center my-4 p-2 rounded text-xs">
                                                {showMore ? "Read Less" : "Read More"}
                                            </span>

                                        </span>
                                    </div>
                                )
                            }
                        </section>
                    </div>
                </div>
                <div className="related_products my-16">
                    <>
                        <RelatedProducts category={product.category} />
                    </>
                </div>
            </div>
        </GeneralLayout>
    )
}

export async function getServerSideProps(context: any) {
    const { params } = context
    const { id } = params
    await connect()
    const product = await Products.findOne({ _id: id }).lean()
    const store = await ProductStore.findOne({_id: product.store_id}).lean()
    await disconnect()
    return {
        props: {
            product: convertDocToObj(product),
            store:  JSON.parse(JSON.stringify(store))
        }
    }
}

export default ProductDescription