import React, { useContext, useState } from 'react'
import GeneralLayout from '../../../layouts/GeneralLayout'
import { Tab } from '@headlessui/react'
import { ShoppingCartIcon, InformationCircleIcon } from '@heroicons/react/solid'
import { PlusIcon } from '@heroicons/react/outline'
import { Avatar, Divider, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import BlueButton from '../../../components/Buttons/BlueButton'
import BlackButton from '../../../components/Buttons/BlackButton'
import RatingComponent from '../../../components/Rating/RatingComponent'
import { Store } from '../../../Context/Store'
import axios from 'axios'
import RelatedProducts from '../../../components/HomeSections/RelatedProducts'
import Amount from '../../../components/Amount/Amount'
import no_product from '../../../public/img/no_product.svg'
import { useFetch } from '../../../hooks/useFetch'
import { apiUrl } from '../../../utils/apiUrl'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function ProductDescription(props: any) {
  const { dispatch } = useContext(Store)
  const history = useRouter()
  const {id} = history.query

  const [selected_variant, setSelectedVariant] = useState<any>()
  const [show_features, setShowFeatures] = useState<boolean>(false)
  const [showMore, setShowMore] = useState<any>()

  const single_product = useFetch(`${apiUrl}/api/product/single/${id}`)
  // for toast
  const toast = useToast()

  console.log(single_product)

  const add_to_basket = async () => {
    const { data } = await axios.get(`/api/products/${single_product?.data?.product?._id}`)
    if (data?.countInStock <= 0) {
      alert('Sorry. Product our of stock')
      return
    }
    dispatch({ type: 'ADD_TO_CART', payload: { ...single_product?.data?.product, quantity: 1 } })
    toast({
      title: `${single_product?.data?.product?.title} added to cart.`,
      position: 'top-right',
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
  }

  const buy_item_now = async () => {
    const { data } = await axios.get(`/api/products/${single_product?.data?.product?._id}`)
    if (data?.countInStock <= 0) {
      alert('Sorry. Product our of stock')
      return
    }
    dispatch({ type: 'ADD_TO_CART', payload: { ...single_product?.data?.product, quantity: 1 } })
    toast({
      title: `${single_product?.data?.product?.title} added to cart.`,
      position: 'top-right',
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
    history.push('/shipping')
  }

  if (!single_product?.data?.product) {
    return (
      <GeneralLayout
        title={'Not Found'}
        description="Product could not find the product"
      >
        <div className=" h-68 my-16 grid content-center items-center justify-center rounded bg-white py-2">
          <div className="relative h-40">
            <Image src={no_product} layout="fill" objectFit="contain" />
          </div>
          <p className="mt-4 text-center font-semibold capitalize text-gray-700">
            Item Not Found
          </p>
        </div>
      </GeneralLayout>
    )
  }

  return (
    <GeneralLayout
      title={single_product?.data?.product?.title}
      description={single_product?.data?.product?.description}
      og_image={single_product?.data?.product?.pictures?.[0]}
      twitter_title={single_product?.data?.product?.title}
      twitter_description={single_product?.data?.product?.description}
      og_url={`/single_product?.data?.product/d/${single_product?.data?.product?._id}`}
    >
      <div className="flex max-w-7xl flex-col bg-gray-100">
        <div className="mx-auto w-full flex-1 rounded ">
          <div className="mx-auto max-w-2xl md:px-0  md:pb-8 lg:max-w-7xl lg:px-0">
            <div className="lg:grid lg:grid-cols-3 lg:items-start lg:gap-x-8">
              {/* Image gallery */}
              <Tab.Group
                as="div"
                className="col-span-2 flex flex-col-reverse rounded-lg bg-white p-4 md:p-8"
              >
                {/* Image selector */}
                <div className="mx-auto mt-6 w-full max-w-2xl sm:block lg:max-w-none">
                  <Tab.List className="grid grid-cols-4 gap-2 md:grid-cols-8">
                    {single_product?.data?.product?.pictures?.map((image: any, index: number) => (
                      <Tab
                        key={index}
                        className="relative flex h-16 w-16 cursor-pointer items-center justify-center rounded-md bg-gray-100 text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                      >
                        {({ selected }) => (
                          <>
                            <span className="sr-only">{'image'}</span>
                            <span className="absolute inset-0 overflow-hidden rounded-md">
                              <Image
                                src={image}
                                objectFit="contain"
                                layout="fill"
                                alt="for a single single_product?.data?.product"
                                className="h-full w-full rounded object-cover object-center"
                              />
                            </span>
                            <span
                              className={classNames(
                                selected
                                  ? 'ring-blue-primary'
                                  : 'ring-transparent',
                                'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                              )}
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </Tab>
                    ))}
                  </Tab.List>
                </div>

                <Tab.Panels className="aspect-w-1 aspect-h-1 max-h-[750px] w-full flex-1 overflow-hidden rounded-lg">
                  {single_product?.data?.product?.pictures?.map((image: any, index: number) => (
                    <Tab.Panel key={index} className=" rounded">
                      <Image
                        src={image}
                        layout="responsive"
                        width={'100%'}
                        height={'100%'}
                        objectFit="contain"
                        alt={'for the single_product?.data?.product'}
                        className="bg-gray-100 object-center sm:rounded-lg"
                      />
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </Tab.Group>

              {/* Product info */}
              <div className="mt-10 rounded sm:mt-16 sm:px-0 lg:mt-0">
                <div className="flex flex-col rounded bg-white px-2 py-4 md:px-8">
                  <h2 className=" text-sm font-semibold tracking-tight text-gray-400">
                    {single_product?.data?.product?.category}
                  </h2>
                  <h1 className="text-xl font-bold uppercase tracking-tight text-gray-900 md:text-3xl">
                    {single_product?.data?.product?.title}
                  </h1>

                  {/* Reviews */}
                  <div className="mt-2">
                    <h3 className="sr-only">Reviews</h3>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <RatingComponent
                          ratings={Math.floor(single_product?.data?.product?.averageRating)}
                        />
                      </div>
                      <p className="sr-only">
                        {single_product?.data?.product?.averageRating} out of 5 stars
                      </p>
                    </div>
                  </div>

                  <div className="my-3">
                    <h6 className="sr-only">Product information</h6>
                    <div className="flex flex-row items-center gap-4">
                      {selected_variant ? (
                        <Amount
                          className="text-2xl font-bold text-gray-700"
                          amount={
                            parseFloat(selected_variant?.price) -
                            parseFloat(selected_variant?.discount_price)
                          }
                        />
                      ) : (
                        <Amount
                          className="text-2xl font-bold text-gray-700"
                          amount={
                            parseFloat(single_product?.data?.product?.price) -
                            parseFloat(single_product?.data?.product?.discount_price)
                          }
                        />
                      )}
                      {selected_variant ? (
                        <Amount
                          className="text-xl text-gray-300 line-through"
                          amount={parseFloat(selected_variant?.price)}
                        />
                      ) : (
                        <Amount
                          className="text-xl text-gray-300 line-through"
                          amount={single_product?.data?.product?.price}
                        />
                      )}
                    </div>
                  </div>

                  <Divider className="my-2" />

                  {/* // variants */}
                  <div className="flex flex-col">
                    <h6 className="mb-1 text-sm font-semibold text-gray-700">
                      Variants:
                    </h6>
                    {single_product?.data?.product?.variants?.length < 1 ? (
                      <div className="flex flex-col">
                        <p className="text-center text-sm text-gray-500">
                          This single_product?.data?.product has no variants
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-4 gap-2 p-1 md:gap-4">
                        {single_product?.data?.product?.variants?.map((item: any, index: number) => (
                          <span
                            onClick={() => setSelectedVariant(item)}
                            key={index}
                            className={`${
                              item.variant === selected_variant?.variant
                                ? 'bg-blue-primary text-white'
                                : ''
                            } col-span-1 cursor-pointer rounded-full border border-gray-300 py-1 px-2 text-xs uppercase text-gray-700 hover:border-gray-700 hover:text-gray-700`}
                          >
                            <p className="text-center">{item.variant}</p>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <Divider className="my-4" />

                  {/* // add to cart button */}
                  <div className=" mb-2">
                    <BlueButton
                      text={
                        <div className="mx-auto flex w-full flex-row content-center items-center justify-center space-x-1">
                          <PlusIcon height={10} width={10} />
                          <ShoppingCartIcon height={12} width={12} />
                          <p>Add to cart </p>
                        </div>
                      }
                      className="w-full flex-1"
                      onClick={add_to_basket}
                    />
                  </div>
                </div>

                <div className="my-4 flex flex-col rounded bg-white px-2 py-4 md:px-8">
                  {/* <Divider className='my-2' /> */}

                  <div className="">
                    {/* Colors */}

                    <div className="mt-2">
                      <div className="mb-2 flex flex-row items-center text-sm font-semibold capitalize text-gray-800 ">
                        <div className="flex flex-row items-center">
                          <p className="mr-2 text-gray-500">Delivered in</p>
                          <div className="text-gray-500">
                            {single_product?.data?.product?.time_to_deliver ? single_product?.data?.product?.time_to_deliver : 'Not Specified'}
                            {/* <Image
                              width={80}
                              objectFit="contain"
                              src={logo}
                              alt="logo on descriprion page"
                              className="h-6"
                            /> */}
                          </div>
                        </div>
                      </div>
                      {single_product?.data?.product?.price > 50 ? (
                        <p className="text-sm font-semibold text-gray-700">
                          Free delivery around Harare
                        </p>
                      ) : (
                        <p className="text-sm font-semibold text-gray-700">
                          Buy items for more than $50 for free delivery
                        </p>
                      )}

                      <div className="mt-2 flex flex-row items-center border-t border-b py-2">
                        {single_product?.data?.product?.countInStock >= 1 ? (
                          <p className="text-sm font-semibold text-gray-700">
                            {selected_variant
                              ? selected_variant.countInStock
                              : single_product?.data?.product?.countInStock}{' '}
                            In Stock
                          </p>
                        ) : (
                          <p className="text-sm font-semibold text-gray-700">
                            Out of stock
                          </p>
                        )}
                        <p className="ml-2 rounded bg-gray-200 p-1 text-xs">
                          HRE
                        </p>
                      </div>

                      <div className="mt-2 flex flex-row items-center gap-2">
                        <p className="text-xs text-gray-700">
                          are you eligible in cash on delivery?
                        </p>
                        <div className="flex flex-col rounded-full">
                          <InformationCircleIcon
                            className="text-green-700"
                            height={16}
                            width={16}
                          />
                        </div>
                      </div>
                      <div className="flex flex-row items-center gap-2">
                        <p className="my-1 text-xs text-gray-700">
                          6-Months Limited Waranty
                        </p>
                        <div className="flex flex-col rounded-full">
                          <InformationCircleIcon
                            className="text-green-700"
                            height={16}
                            width={16}
                          />
                        </div>
                      </div>
                      <div className="flex flex-row items-center gap-2">
                        <p className="my-1 text-xs text-gray-700">
                          Cash on delivery accepted
                        </p>
                        <div className="flex flex-col rounded-full">
                          <InformationCircleIcon
                            className="text-green-700"
                            height={16}
                            width={16}
                          />
                        </div>
                      </div>
                    </div>
                    {/* <div className="mt-4">
                                            <div className="md:col-span-2 col-span-3 flex flex-row items-center w-full">
                                                <div onClick={() => console.log('add to compare')} className="text-blue-primary flex-1 border border-blue-primary rounded p-2 text-center font-semibold capitalize hover:bg-blue-primary hover:text-white cursor-pointer">
                                                    compare
                                                </div>
                                            </div>

                                        </div> */}
                    <div className="my-2"></div>
                    <div className="">
                      <BlackButton
                        text="Buy Item Now"
                        className="w-full flex-1"
                        onClick={buy_item_now}
                      />
                    </div>
                  </div>
                </div>
                <div
                  onClick={() =>
                    history.push(`/store/${single_product?.data?.store_info?.store_id}/products`)
                  }
                  className="flex cursor-pointer flex-row items-center space-x-4 rounded border border-gray-200 bg-white p-4"
                >
                  {/*@ts-ignore */}
                  <Avatar
                    src={single_product?.data?.store_info?.logo}
                    name={single_product?.data?.store_info?.company_name}
                    className="text-gray-700"
                  />
                  <div className="flex flex-col">
                    <p className="font-semibold text-gray-700">
                      View {single_product?.data?.store_info?.company_name}'s store
                    </p>
                    <p className="text-sm text-gray-400">
                      View the seller's shop and catalogues
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* // description compoennt */}
            <section className="mt-4 w-full md:mt-8 ">
              <div className="flex">
                {show_features ? (
                  <div className="flex flex-row items-center">
                    <span
                      onClick={() => setShowFeatures(false)}
                      className="cursor-pointer p-4 hover:bg-gray-50"
                    >
                      Description
                    </span>
                    <span
                      onClick={() => setShowFeatures(true)}
                      className="cursor-pointer rounded-t border-b-2 border-blue-primary bg-white p-4  font-semibold text-blue-primary hover:bg-gray-50"
                    >
                      Product Features
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-row items-center">
                    <span
                      onClick={() => setShowFeatures(false)}
                      className="cursor-pointer rounded-t border-b-2 border-blue-primary bg-white p-4  font-semibold text-blue-primary hover:bg-gray-50"
                    >
                      Description
                    </span>
                    <span
                      onClick={() => setShowFeatures(true)}
                      className="cursor-pointer p-4 hover:bg-gray-50"
                    >
                      Product Features
                    </span>
                  </div>
                )}
              </div>
              {show_features ? (
                <>
                  <ul className="rounded bg-white p-6 text-center">
                    no additional features added
                  </ul>
                </>
              ) : (
                <div className="flex w-full rounded bg-white py-2 px-4 md:px-16 md:py-4">
                  <h3 className="sr-only">Description</h3>

                  <span className="w-full flex-grow ">
                    <div className="mb-4 flex flex-col">
                      {showMore ? (
                        <div
                          className="space-y-6 text-base leading-normal text-gray-700"
                          dangerouslySetInnerHTML={{
                            __html: single_product?.data?.product?.description,
                          }}
                        />
                      ) : (
                        <div
                          className="space-y-6 text-base leading-normal text-gray-700"
                          dangerouslySetInnerHTML={{
                            __html: single_product?.data?.product?.description?.substring(0, 500),
                          }}
                        />
                      )}
                    </div>
                    <span
                      onClick={() => setShowMore(!showMore)}
                      className="cutsor-pointer mx-auto my-4 w-full self-center rounded bg-blue-primary p-2 text-center text-xs font-semibold text-white"
                    >
                      {showMore ? 'Read Less' : 'Read More'}
                    </span>
                  </span>
                </div>
              )}
            </section>
          </div>
        </div>
        <div className="related_single_product?.data?.products my-16">
          <>
            <RelatedProducts category={single_product?.data?.product?.category} />
          </>
        </div>
      </div>
    </GeneralLayout>
  )
}

export default ProductDescription
