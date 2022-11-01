import React, { useState, useContext, useEffect } from 'react'
import DashboardLayout from '../../../../layouts/DashboardLayout'
import { Divider, Select, Spinner } from '@chakra-ui/react'
import FileUploadComponent from '../../../../components/FileUploadComponent/FileUploadComponent'
import { data } from '../../../../utils/data'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css' // ES6
import NoSSR from '../../../../layouts/NoSSR'
import BlueButton from '../../../../components/Buttons/BlueButton'
import Variations from '../../../../components/Variations/Variations'
import axios from 'axios'
import { Store } from '../../../../Context/Store'
import { useToast } from '@chakra-ui/react'
import { getError } from '../../../../utils/error'
import { apiUrl } from '../../../../utils/apiUrl'
import { useRouter } from 'next/router'
import { useFetch } from '../../../../hooks/useFetch'

const product_options = [
  { id: 'private', title: 'Private' },
  { id: 'public', title: 'Public' },
]

export default function EditProduct(props: any) {

  const router = useRouter()
  const { id } = router.query
  const url = `${apiUrl}/api/product/single/${id}`
  const sinlge_product = useFetch(url)

  const [pictures_for_upload, setPicturesForUpload] = useState<any>([])
  const [description, setQuillDescription] = useState<any>('')
  const [variations, setVariations] = useState<any>([])
  const [title, setTitle] = useState<string>('')
  const [price, setPrice] = useState<any>(0)
  const [discount_price, setDiscountPrice] = useState<any>(0)
  const [brand, setBrand] = useState<string>('')
  const [sub_category, setSubCategory] = useState('')
  const [countInStock, setCountInStock] = useState<any>(0)
  const [category, setCategory] = useState<any>(0)
  const [status, setStatus] = useState<any>()
  const [sku, setSku] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const { state } = useContext(Store)
  const { userInfo } = state
  const [currency, setCurrency] = useState('')
  const history = useRouter()
  const [weight, setWeight] = useState<any>(0)

  useEffect(() => {
    setPicturesForUpload(sinlge_product?.data?.product?.pictures)
    setQuillDescription(sinlge_product?.data?.product?.description)
    setVariations(sinlge_product?.data?.product?.variants)
    setPrice(sinlge_product?.data?.product?.price)
    setDiscountPrice(sinlge_product?.data?.product?.discount_price)
    setBrand(sinlge_product?.data?.product?.brand)
    setCategory(sinlge_product?.data?.product?.category)
    setStatus(sinlge_product?.data?.product?.status)
    setCountInStock(sinlge_product?.data?.product?.countInStock)
    setCurrency(sinlge_product?.data?.product?.currency_type)
    setTitle(sinlge_product?.data?.product?.title)
    setSku(sinlge_product?.data?.product?.sku)
    setWeight(sinlge_product?.data?.product?.weight)
  }, [sinlge_product])
  

  const selectedPictures = (pictures: any) => {
    setPicturesForUpload(pictures)
  }

  const selectedTags = (tags: any) => {
    setVariations(tags)
  }

  const edit_product = async () => {
    try {
      setLoading(true)
      const formData = new FormData()

      // uploading pictures to cloudinary and returning an array of urls
      pictures_for_upload.forEach((file: any | Blob) => {
        formData.append('product_pictures', file)
      })
      if (variations?.length >= 1) {
        for (const value of variations) {
          formData.append('variants', value)
        }
      }
      formData.append('description', description)
      formData.append('title', title)
      formData.append('category', category)
      formData.append('price', price)
      formData.append('discount_price', discount_price)
      formData.append('countInStock', countInStock)
      formData.append('status', status)
      formData.append('sku', sku)
      formData.append('brand', brand)
      formData.append('currency', 'USD')
      formData.append('sub_category', sub_category)
      formData.append('product_id', sinlge_product?.data?.product._id)
      formData.append('currency_type', currency)
      formData.append('weight', weight)

      await axios.put(`${apiUrl}/api/product/edit/${id}`, formData, {
        headers: { authorization: userInfo?.token },
      })
      setLoading(false)
      history.push(`/product/d/${id}`)
      toast({
        title: 'Product Edited.',
        description: 'Product Edited successfully!.',
        status: 'success',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })
    } catch (error) {
      setLoading(false)
      toast({
        title: 'Error Editing.',
        description: getError(error),
        status: 'error',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  if(sinlge_product?.status === 'fetching'){
    return(
      <NoSSR>
        <DashboardLayout>
          <div className="grid w-full h-96 item-center content-center justify-center">
            <Spinner size={'xl'} />
          </div>
        </DashboardLayout>
      </NoSSR>
    )
  }

  return (
    <NoSSR>
      <DashboardLayout>
        <div className="flex flex-col p-4">
          <p className="text-lg font-semibold text-gray-800">Edit Product</p>
          <Divider className="my-4 text-gray-400" />
          {loading ? (
            <div className="flex w-full flex-col items-center">
              <Divider />
            </div>
          ) : (
            <>
              <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                  <div className="border-t border-gray-200" />
                </div>
              </div>

              {/* image gallery */}
              {/* <div>
                <div className="mt:mt-0 mt-8 md:grid md:grid-cols-3 md:gap-6">
                  <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Image Gallery
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        All other images for your product and its variants.
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 md:col-span-2 md:mt-0">
                    <p className="pb-1 pt-2 font-semibold text-gray-700">
                      New Pictures
                    </p>
                    <FileUploadComponent
                      selectedPictures={selectedPictures}
                      initial_pictures={pictures_for_upload}
                      multiple
                    />
                  </div>
                </div>
              </div> */}
              <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                  <div className="border-t border-gray-200" />
                </div>
              </div>

              {/* // categories an tags */}
              <div className="mt-10 sm:mt-0">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                  <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Groups & Categories
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        Select product group and categories from here.
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 md:col-span-2 md:mt-0">
                    <div>
                      <div className="overflow-hidden shadow sm:rounded-md">
                        <div className="bg-white px-4 py-5 sm:p-6">
                          <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6">
                              <label
                                htmlFor="country"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Category
                              </label>
                              <Select
                                id="country"
                                name="country"
                                autoComplete="country-name"
                                defaultValue={category}
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              >
                                {data.categories.map(
                                  (category: any, index: number) => (
                                    <option key={index} value={category.name}>
                                      {category.name}
                                    </option>
                                  )
                                )}
                              </Select>
                            </div>

                            <div className="col-span-6">
                              <label
                                htmlFor="country"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Sub- Category
                              </label>
                              <Select
                                id="country"
                                name="country"
                                autoComplete="country-name"
                                defaultValue={sub_category}
                                value={sub_category}
                                onChange={(e) => setSubCategory(e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              >
                                {data.categories.map(
                                  (category: any, index: number) => (
                                    <option key={index}>{category.name}</option>
                                  )
                                )}
                              </Select>
                            </div>

                            <div className="col-span-6 ">
                              <label
                                htmlFor="city"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Brand
                              </label>
                              <input
                                type="text"
                                name="brand"
                                defaultValue={brand}
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                id="brand"
                                autoComplete="brand"
                                placeholder="Enter product brand"
                                className="mt-1 block w-full rounded-md border border-gray-300 p-2 outline-none sm:text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                  <div className="border-t border-gray-200" />
                </div>
              </div>

              {/* // categories an tags */}
              <div className="mt-10 sm:mt-0">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                  <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Description
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        Product title, description and other important details.
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 md:col-span-2 md:mt-0">
                    <form action="#" method="POST">
                      <div className="overflow-hidden shadow sm:rounded-md">
                        <div className="bg-white px-4 py-5 sm:p-6">
                          <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 ">
                              <label
                                htmlFor="city"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Title/Name
                              </label>
                              <input
                                type="text"
                                name="title"
                                defaultValue={title}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                id="title"
                                autoComplete="title"
                                placeholder="Enter product name or title"
                                className="mt-1 block w-full rounded-md border border-gray-300 p-2 outline-none sm:text-sm"
                              />
                            </div>

                            <div className="col-span-6">
                              <label
                                htmlFor="category"
                                className="mb-1 block text-sm font-medium text-gray-700"
                              >
                                Description
                              </label>
                             
                              <ReactQuill
                                theme="snow"
                                // value={quill_description}
                                placeholder="Enter your new description here"
                                style={{ borderRadius: '5px' }}
                                onChange={setQuillDescription}
                                value={description}
                              />
                            </div>

                            {/* <fieldset className="mt-4">
                              <label
                                htmlFor="status"
                                className="mb-1 block text-sm font-medium text-gray-700"
                              >
                                Status
                              </label>
                              <div className="space-y-4">
                                {product_options.map((notificationMethod) => (
                                  <div
                                    key={notificationMethod.id}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={notificationMethod.id}
                                      name="notification-method"
                                      type="radio"
                                      onChange={(e) =>
                                        setStatus(e.target.value)
                                      }
                                      defaultChecked={
                                        notificationMethod.id === 'email'
                                      }
                                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={notificationMethod.id}
                                      className="ml-3 block text-sm font-medium text-gray-700"
                                    >
                                      {notificationMethod.title}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </fieldset> */}
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                  <div className="border-t border-gray-200" />
                </div>
              </div>

              {/* // other inforation */}
              <div className="mt-10 sm:mt-0">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                  <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Other Information
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        Important product information.
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 md:col-span-2 md:mt-0">
                    <form action="#" method="POST">
                      <div className="overflow-hidden shadow sm:rounded-md">
                        <div className="bg-white px-4 py-5 sm:p-6">
                          <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 ">
                              {/* <div className="col-span-6 ">
                                <label
                                  htmlFor="city"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Edit Preffed currency
                                </label>
                                <Select
                                  id="currency"
                                  name="currency"
                                  autoComplete="currency"
                                  bg={'white'}
                                  placeholder="select currency"
                                  defaultValue={product?.currency_type}
                                  onChange={(e) => setCurrency(e.target.value)}
                                  className="rounded border border-gray-300 outline-none"
                                >
                                  <option value={'USD'}>USD</option>
                                  <option value={'ZWL'}>ZWL</option>
                                </Select>
                              </div> */}
                              <label
                                htmlFor="city"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Price
                              </label>
                              <input
                                type="number"
                                name="price"
                                id="price"
                                defaultValue={price}
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                autoComplete="price"
                                placeholder="Enter price"
                                className="mt-1 block w-full rounded-md border border-gray-300 p-2 outline-none sm:text-sm"
                              />
                            </div>

                            <div className="col-span-6 ">
                              <label
                                htmlFor="city"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Discount
                              </label>
                              <input
                                type="number"
                                name="discount"
                                id="discount"
                                defaultValue={discount_price}
                                value={discount_price}
                                onChange={(e) =>
                                  setDiscountPrice(e.target.value)
                                }
                                autoComplete="discount"
                                placeholder="Enter discount"
                                className="mt-1 block w-full rounded-md border border-gray-300 p-2 outline-none sm:text-sm"
                              />
                            </div>
                            <div className="col-span-6 ">
                            <label
                              htmlFor="city"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Estimated item weight
                            </label>
                            <input
                              type="number"
                              name="weight"
                              id="weight"
                              defaultValue={weight}
                              value={weight}
                              //@ts-ignore
                              onWheel={(e) => e.target.blur()}
                              onChange={(e:any) => setWeight(e.target.value)}
                              autoComplete="weight"
                              placeholder="Enter weight"
                              className="mt-1 block w-full rounded-md border border-gray-300 p-2 outline-none sm:text-sm"
                            />
                          </div>


                            <div className="col-span-6 ">
                              <label
                                htmlFor="city"
                                className="block text-sm font-medium text-gray-700"
                              >
                                SKU
                              </label>
                              <input
                                type="text"
                                name="sku"
                                id="sku"
                                defaultValue={sku}
                                value={sku}
                                onChange={(e) => setSku(e.target.value)}
                                autoComplete="sku"
                                placeholder="Enter sku"
                                className="mt-1 block w-full rounded-md border border-gray-300 p-2 outline-none sm:text-sm"
                              />
                            </div>

                            <div className="col-span-6 ">
                              <label
                                htmlFor="city"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Quantity
                              </label>
                              <input
                                type="number"
                                name="quantity"
                                id="quantity"
                                defaultValue={countInStock}
                                value={countInStock}
                                onChange={(e) =>
                                  setCountInStock(e.target.value)
                                }
                                autoComplete="quantity"
                                placeholder="Enter quantity"
                                className="mt-1 block w-full rounded-md border border-gray-300 p-2 outline-none sm:text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                  <div className="border-t border-gray-200" />
                </div>
              </div>

              {/* // other inforation */}
              <div className="mt-10 mb-8 sm:mt-0">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                  <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Variations
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        Add all variations of product, but leave empty if there
                        is none.
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 md:col-span-2 md:mt-0">
                    <form action="#" method="POST">
                      <div className="overflow-hidden shadow sm:rounded-md">
                        <div className="bg-white px-4 py-5 sm:p-6">
                          <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 ">
                              <label
                                htmlFor="city"
                                className="block text-sm font-medium text-gray-700"
                              >
                                e.g
                              </label>
                              <div className="flex flex-row items-center gap-4">
                                <div className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm text-gray-400 outline-none sm:text-sm">
                                  XL
                                </div>
                                <div className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm text-gray-400 outline-none sm:text-sm">
                                  $44.50
                                </div>
                              </div>
                            </div>

                            <div className="col-span-6">
                              <Variations
                                selectedTags={selectedTags}
                                className=""
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <BlueButton
                text="Save Changes"
                loading={loading}
                onClick={edit_product}
              />
            </>
          )}
        </div>
      </DashboardLayout>
    </NoSSR>
  )
}