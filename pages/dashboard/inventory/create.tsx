import React, { useState, useContext, useEffect } from 'react'
import DashboardLayout from '../../../layouts/DashboardLayout'
import { Divider, Select } from '@chakra-ui/react'
import FileUploadComponent from '../../../components/FileUploadComponent/FileUploadComponent'
import { data } from '../../../utils/data'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css' // ES6
import NoSSR from '../../../layouts/NoSSR'
import BlueButton from '../../../components/Buttons/BlueButton'
import Variations from '../../../components/Variations/Variations'
import axios from 'axios'
import { Store } from '../../../Context/Store'
import { useToast } from '@chakra-ui/react'
import { getError } from '../../../utils/error'
import { useRouter } from 'next/router'
import { apiUrl } from '../../../utils/apiUrl'

const product_options = [
  { id: 'private', title: 'Private' },
  { id: 'public', title: 'Public' },
]

export default function CreateProduct() {
  const [pictures_for_upload, setPicturesForUpload] = useState<any>([])
  const [description, setQuillDescription] = useState<any>('')
  const [variations, setVariations] = useState<any>([])
  const [title, setTitle] = useState<string>('')
  const [price, setPrice] = useState<any>()
  const [discount_price, setDiscountPrice] = useState<any>()
  const [brand, setBrand] = useState<string>('')
  const [countInStock, setCountInStock] = useState<any>()
  const [weight, setWeight] = useState<any>(null)
  const [category, setCategory] = useState<any>()
  const [sub_category, setSubCategory] = useState<any>('')
  const [status, setStatus] = useState<any>()
  const [sku, setSku] = useState<string>('')
  const [currency, setCurrency] = useState('')
  const [time_to_delivery, setTimeToDelivery] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [seo_description, setSeoDescription] = useState('')
  const [importError, setImportError] = useState()
  //for selecting sub category
  const [current_category, setCurrentCategory] = useState<any>('')
  const [selectedFileName, setSelectedFileName] = useState('')
  const [importedCols, setImportedCols] = useState([])
  const [importedData, setImportedData] = useState([])

  const toast = useToast()

  const { state } = useContext(Store)
  const { userInfo } = state
  const router = useRouter()

  const handleFileChange = (event: any) => {
    const files = event.target.files
    if (files.length > 0) {
      setSelectedFileName(files[0].name)
    } else {
      setSelectedFileName('')
    }
  }

  const importCsv = (e: any) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFileName(file?.name)
    } else {
      setSelectedFileName('')
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      // @ts-ignore
      const csv = e.target.result
      // @ts-ignore
      const data = csv.split('\n')

      // Prepare DataTable
      const cols = data[0].replace(/['\r"]+/g, '').split(',')
      data.shift()

      let _importedCols = cols
      let _importedData = data.map((d: any) => {
        d = d.split(',')
        // @ts-ignore
        return cols.reduce((obj, c, i) => {
          obj[c] = d[i]?.replace(/['"]+/g, '')
          return obj
        }, {})
      })

      setImportedCols(_importedCols)
      setImportedData(_importedData)
    }
    console.log('file', file)

    reader.readAsText(file, 'UTF-8')
  }

  console.log('importedData', importedData)

  const uploadBatch = async (event: any) => {
    // post as json data
    const response = await axios
      .post(
        `${apiUrl}/api/product/create/multiple`,

        { products: importedData },
        {
          headers: { authorization: userInfo?.token },
        }
      )
      .then((response) => {
        // make a toast
        toast({
          title: 'File Uploaded',
          description: 'The file has been successfully uploaded.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        // console log the response

        console.log('response', response)
      })
      .catch((error) => {
        // make a toast
        toast({
          title: 'Error',
          description: 'An error occurred while uploading the file.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        // console log the error
        console.log('error', error)
      })
  }

  // const uploadFile = async (file: any) => {
  //   setLoading(true)
  //   try {
  //     const formData = new FormData()
  //     formData.append('file', file)
  //     const response = await axios.post('/api/upload-csv', formData)

  //     toast({
  //       title: 'File Uploaded',
  //       description: 'The file has been successfully uploaded.',
  //       status: 'success',
  //       duration: 3000,
  //       isClosable: true,
  //     })

  //     console.log('File uploaded:', response.data)
  //   } catch (error) {
  //     toast({
  //       title: 'Error',
  //       description: 'An error occurred while uploading the file.',
  //       status: 'error',
  //       duration: 3000,
  //       isClosable: true,
  //     })

  //     console.error('Error uploading file:', error)
  //   }
  // }

  // setting selected pictures to upload
  const selectedPictures = (pictures: any) => {
    setPicturesForUpload(pictures)
  }

  // setting sub categories after user selects a category
  useEffect(() => {
    var sub_cat = data?.categories?.find(function (sandwich) {
      return sandwich.name === category
    })
    setCurrentCategory(sub_cat)
  }, [category])

  // setting vaiants if user has set some
  const selectedTags = (tags: any) => {
    setVariations(tags)
  }

  // function to create product and send api call
  const create_product = async () => {
    try {
      setLoading(true)
      const formData = new FormData()

      // uploading pictures to cloudinary and returning an array of urls
      pictures_for_upload.forEach((file: any | Blob) => {
        formData.append('product_pictures', file)
      })
      for (const value of variations) {
        formData.append('variants', value)
      }
      formData.append('description', description)
      formData.append('title', title)
      formData.append('category', category)
      formData.append('price', price)
      formData.append('discount_price', discount_price ? discount_price : 0)
      formData.append('countInStock', countInStock)
      formData.append('brand', brand)
      formData.append('status', status)
      formData.append('sku', sku)
      formData.append('currency', 'USD')
      formData.append('weight', weight)
      formData.append('sub_category', sub_category)
      formData.append('time_to_delivery', time_to_delivery)

      //upload the product to database from here
      const { data } = await axios.post(
        `${apiUrl}/api/product/create`,
        formData,
        {
          headers: { authorization: userInfo?.token },
        }
      )
      toast({
        title: 'Product Added.',
        description: 'Product Added successfully!.',
        status: 'success',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })
      setLoading(false)
      setPicturesForUpload([])
      setQuillDescription('')
      setVariations([])
      setTitle('')
      setPrice(0)
      setDiscountPrice(0)
      setBrand('')
      setCountInStock(0)
      setWeight(0)
      setCategory('')
      setStatus('')
      setSku('')
      router.push(`/dashboard/inventory/add_success/${data.product_id}`)
      console.log(data)
    } catch (error) {
      setLoading(false)
      toast({
        title: 'Error Adding.',
        description: getError(error),
        status: 'error',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })
      return
    }
  }

  return (
    <NoSSR>
      <DashboardLayout>
        <div className="flex flex-col p-4">
          <p className="text-lg font-semibold text-gray-800">
            Create New Product
          </p>
          <p className="text-sm text-gray-400">
            Have multiple products to add? Dowload this csv template and upload
            it to add multiple products at once.
            <a
              className="text-blue-500 hover:text-blue-600"
              href="
            /trolliey_csv.csv"
              download
            >
              Trolliey csv
            </a>
          </p>
          <div className="relative mt-5 inline-block">
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={importCsv}
            />
            <label
              htmlFor="fileInput"
              className="cursor-pointer rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600"
            >
              Choose File
            </label>
            <span className="ml-2 text-gray-600">{selectedFileName}</span>
          </div>

          {selectedFileName && (
            <div className="mt-5">
              <button
                onClick={uploadBatch}
                className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600"
              >
                Upload File
              </button>
            </div>
          )}

          {/* <div className="mt-5">
            <button
              onClick={importCsv}
              className="rounded bg-gray-500 py-2 px-4 text-white hover:bg-gray-600"
            >
              Import csv
            </button>
          </div> */}

          <Divider className="my-4 text-gray-400" />
          <>
            {/* image gallery */}
            <div>
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
                  <FileUploadComponent
                    selectedPictures={selectedPictures}
                    multiple
                  />
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
                      Groups & Categories
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Select product group and categories from here.
                    </p>
                  </div>
                </div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                  <form action="#" method="POST">
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
                              bg={'white'}
                              id="category"
                              value={category}
                              placeholder="Select category"
                              onChange={(e) => setCategory(e.target.value)}
                              className="rounded border border-gray-300 outline-none"
                            >
                              {data.categories.map((category, index) => (
                                <option key={index} value={category.name}>
                                  {category.name}
                                </option>
                              ))}
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
                              bg={'white'}
                              value={sub_category}
                              placeholder={
                                current_category?.sub_categories?.[0].name
                                  ? current_category?.sub_categories?.[0].name
                                  : 'No category selected'
                              }
                              onChange={(e) => setSubCategory(e.target.value)}
                              defaultValue={
                                current_category?.sub_categories?.[0].name
                              }
                              className="rounded border border-gray-300 outline-none"
                            >
                              {current_category?.sub_categories?.map(
                                (category: any, index: any) => (
                                  <option key={index} value={category.name}>
                                    {category.name}
                                  </option>
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
                  </form>
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
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              id="title"
                              autoComplete="title"
                              placeholder="Enter product name or title"
                              className="mt-1 block w-full rounded-md border border-gray-300 p-2 outline-none sm:text-sm"
                            />
                          </div>

                          <div className="col-span-6 ">
                            <label
                              htmlFor="city"
                              className="block text-sm font-medium text-gray-700"
                            >
                              How long to deliver to warehouse? (we deliver for
                              you for free)
                            </label>
                            <input
                              type="number"
                              name="delivery_time"
                              value={time_to_delivery}
                              onChange={(e) =>
                                setTimeToDelivery(e.target.value)
                              }
                              id="delivery_time"
                              autoComplete="delivery_time"
                              placeholder="Time it takes you to deliver item (days)"
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
                              placeholder="Enter your description here"
                              style={{ borderRadius: '5px' }}
                              value={description}
                              onChange={setQuillDescription}
                            />
                          </div>
                          <div className="col-span-6">
                            <label
                              htmlFor="category"
                              className="mb-1 block text-sm font-medium text-gray-700"
                            >
                              Description For SEO (Optional)
                            </label>
                            <textarea
                              rows={5}
                              placeholder="Enter your SEO description here"
                              className="mt-1 block w-full rounded-md border border-gray-300 p-2 outline-none sm:text-sm"
                              value={seo_description}
                              onChange={(e: any) =>
                                setSeoDescription(e.target.value)
                              }
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
                                    onChange={(e) => setStatus(e.target.value)}
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
                          {/* <div className="col-span-6 ">
                            <label
                              htmlFor="currency"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Preffed currency (if not selected we assume USD)
                            </label>
                            <Select
                              id="currency"
                              name="currency"
                              autoComplete="currency"
                              bg={'white'}
                              placeholder="select currency"
                              value={currency}
                              onChange={(e) => setCurrency(e.target.value)}
                              className="rounded border border-gray-300 outline-none"
                            >
                              <option value={'USD'}>USD</option>
                              <option value={'ZWL'}>ZWL</option>
                            </Select>
                          </div> */}

                          <div className="col-span-6 ">
                            <label
                              htmlFor="city"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Price (in USD)
                            </label>
                            <input
                              type="number"
                              name="price"
                              id="price"
                              value={price}
                              //@ts-ignore
                              onWheel={(e) => e.target.blur()}
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
                              Estimated item weight
                            </label>
                            <input
                              type="number"
                              name="weight"
                              id="weight"
                              value={weight}
                              //@ts-ignore
                              onWheel={(e) => e.target.blur()}
                              onChange={(e: any) => setWeight(e.target.value)}
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
                              Discount
                            </label>
                            <input
                              type="number"
                              name="discount"
                              id="discount"
                              value={discount_price}
                              //@ts-ignore
                              onWheel={(e) => e.target.blur()}
                              onChange={(e) => setDiscountPrice(e.target.value)}
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
                              SKU
                            </label>
                            <input
                              type="text"
                              name="sku"
                              id="sku"
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
                              //@ts-ignore
                              onWheel={(e) => e.target.blur()}
                              value={countInStock}
                              onChange={(e) => setCountInStock(e.target.value)}
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

            {loading && (
              <div className="mb-4 flex w-full rounded bg-orange-200 p-2 text-center text-sm font-semibold capitalize text-gray-700">
                <p className="mx-auto text-center">
                  Please wait while we upload your pictures.
                </p>
              </div>
            )}
            <BlueButton
              text="Add Product"
              loading={loading}
              onClick={create_product}
            />
          </>
        </div>
      </DashboardLayout>
    </NoSSR>
  )
}
