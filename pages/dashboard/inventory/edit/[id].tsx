import React, { useState, useContext } from 'react'
import DashboardLayout from '../../../../layouts/DashboardLayout'
import { Divider } from '@chakra-ui/react'
import FileUploadComponent from '../../../../components/FileUploadComponent/FileUploadComponent'
import { data } from '../../../../utils/data'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css'; // ES6
import NoSSR from '../../../../layouts/NoSSR'
import BlueButton from '../../../../components/Buttons/BlueButton'
import Variations from '../../../../components/Variations/Variations'
import axios from 'axios'
import { Store } from '../../../../Context/Store'
import { useToast } from '@chakra-ui/react'
import { getError } from '../../../../utils/error'

const product_options = [
    { id: 'private', title: 'Private' },
    { id: 'public', title: 'Public' },
]

export default function EditProduct() {
    const [pictures_for_upload, setPicturesForUpload] = useState<any>([])
    const [description, setQuillDescription] = useState<any>('')
    const [variations, setVariations] = useState<any>([])
    const [title, setTitle] = useState<string>('')
    const [price, setPrice] = useState<any>(0)
    const [discount_price, setDiscountPrice] = useState<any>(0)
    const [brand, setBrand] = useState<string>('')
    const [countInStock, setCountInStock] = useState<any>(0)
    const [category, setCategory] = useState<any>(0)
    const [status, setStatus] = useState<any>()
    const [sku, setSku] = useState<string>('')
    const [loading, setLoading] = useState(false)
    const toast = useToast()

    const { state } = useContext(Store)
    const { userInfo } = state

    const selectedPictures = (pictures: any) => {
        setPicturesForUpload(pictures)
    };

    const selectedTags = (tags: any) => {
        setVariations(tags)
    };

    const create_product = async () => {
        try {
            setLoading(true)
            const formData = new FormData()
            const uploads: any = [];
            const promises: any = [];

            pictures_for_upload.forEach((file: string | Blob) => {
                formData.append("file", file);
                formData.append('upload_preset', 'g6ixv6cg')
                //@ts-ignore
                formData.append("api_key", process.env.CLOUDNARY_API_KEY)

                const uploadPromise = axios.post("https://api.cloudinary.com/v1_1/trolliey/image/upload", formData, { headers: { "X-Requested-With": "XMLHttpRequest" } }).then(response => {
                    uploads.push(response.data.url)
                })
                promises.push(uploadPromise);
            })
            await Promise.all(promises);

            //upload the product to database from here
            const { data } = await axios.post('/api/products/create', {
                pictures: uploads,
                description: description,
                title: title,
                category: category,
                price: price,
                discount_price: discount_price,
                brand: brand,
                countInStock: countInStock,
                status: status,
                sku: sku,
                variants: variations
            }, { headers: { authorization: userInfo?.token } })
            setLoading(false)
            console.log(data)
            toast({
                title: 'Product Added.',
                description: "Product Added successfully!.",
                status: 'success',
                position: 'top-right',
                duration: 9000,
                isClosable: true,
            })
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
        }
    }

    return (
        <NoSSR>
            <DashboardLayout>
                <div className="flex p-4 flex-col">
                    <p className="text-gray-800 text-lg font-semibold">Edit Product</p>
                    <Divider className="my-4 text-gray-400" />
                    <>
                        {/* // featured iamge */}
                        <div>
                            <div className="md:grid md:grid-cols-3 md:gap-6">
                                <div className="md:col-span-1">
                                    <div className="px-4 sm:px-0">
                                        <h3 className="text-lg font-medium leading-6 text-gray-900">Featured Image</h3>
                                        <p className="mt-1 text-sm text-gray-600">
                                            This image will be shown in most places.
                                    </p>
                                    </div>
                                </div>
                                <div className="mt-5 md:mt-0 md:col-span-2">
                                    <form action="#" method="POST">
                                        <div className="shadow sm:rounded-md sm:overflow-hidden">
                                            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">

                                                <div>
                                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                                        <div className="space-y-1 text-center">
                                                            <svg
                                                                className="mx-auto h-12 w-12 text-gray-400"
                                                                stroke="currentColor"
                                                                fill="none"
                                                                viewBox="0 0 48 48"
                                                                aria-hidden="true"
                                                            >
                                                                <path
                                                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                                    strokeWidth={2}
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                            </svg>
                                                            <div className="flex text-sm text-gray-600">
                                                                <label
                                                                    htmlFor="file-upload"
                                                                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                                >
                                                                    <span>Upload a file</span>
                                                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                                </label>
                                                                <p className="pl-1">or drag and drop</p>
                                                            </div>
                                                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                                        </div>
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

                        {/* image gallery */}
                        <div>
                            <div className="md:grid md:grid-cols-3 md:gap-6 mt:mt-0 mt-8">
                                <div className="md:col-span-1">
                                    <div className="px-4 sm:px-0">
                                        <h3 className="text-lg font-medium leading-6 text-gray-900">Image Gallery</h3>
                                        <p className="mt-1 text-sm text-gray-600">
                                            All other images for your product and its variants.
                                    </p>
                                    </div>
                                </div>
                                <div className="mt-5 md:mt-0 md:col-span-2">
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
                                        <h3 className="text-lg font-medium leading-6 text-gray-900">Groups & Categories</h3>
                                        <p className="mt-1 text-sm text-gray-600">Select product group and categories from here.</p>
                                    </div>
                                </div>
                                <div className="mt-5 md:mt-0 md:col-span-2">
                                    <form action="#" method="POST">
                                        <div className="shadow overflow-hidden sm:rounded-md">
                                            <div className="px-4 py-5 bg-white sm:p-6">
                                                <div className="grid grid-cols-6 gap-6">

                                                    <div className="col-span-6">
                                                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                                            Category
                                                    </label>
                                                        <select
                                                            id="country"
                                                            name="country"
                                                            autoComplete="country-name"
                                                            value={category}
                                                            onChange={(e) => setCategory(e.target.value)}
                                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        >
                                                            {
                                                                data.categories.map((category: any, index: number) => (
                                                                    <option key={index} value={category.name}>{category.name}</option>
                                                                ))
                                                            }

                                                        </select>
                                                    </div>

                                                    <div className="col-span-6">
                                                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                                            Sub- Category
                                                    </label>
                                                        <select
                                                            id="country"
                                                            name="country"
                                                            autoComplete="country-name"
                                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        >
                                                            {
                                                                data.categories.map((category: any, index: number) => (
                                                                    <option key={index}>{category.name}</option>
                                                                ))
                                                            }

                                                        </select>
                                                    </div>

                                                    <div className="col-span-6 ">
                                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                                            Brand
                                                    </label>
                                                        <input
                                                            type="text"
                                                            name="brand"
                                                            onChange={(e) => setBrand(e.target.value)}
                                                            id="brand"
                                                            autoComplete="brand"
                                                            placeholder="Enter product brand"
                                                            className="mt-1 block w-full outline-none sm:text-sm border border-gray-300 rounded-md p-2"
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
                                        <h3 className="text-lg font-medium leading-6 text-gray-900">Description</h3>
                                        <p className="mt-1 text-sm text-gray-600">Product title, description and other important details.</p>
                                    </div>
                                </div>
                                <div className="mt-5 md:mt-0 md:col-span-2">
                                    <form action="#" method="POST">
                                        <div className="shadow overflow-hidden sm:rounded-md">
                                            <div className="px-4 py-5 bg-white sm:p-6">
                                                <div className="grid grid-cols-6 gap-6">
                                                    <div className="col-span-6 ">
                                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                                            Title/Name
                                                    </label>
                                                        <input
                                                            type="text"
                                                            name="title"
                                                            onChange={(e) => setTitle(e.target.value)}
                                                            id="title"
                                                            autoComplete="title"
                                                            placeholder="Enter product name or title"
                                                            className="mt-1 block w-full outline-none sm:text-sm border border-gray-300 rounded-md p-2"
                                                        />
                                                    </div>

                                                    <div className="col-span-6">
                                                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                                                            Description
                                                    </label>
                                                        <ReactQuill
                                                            theme="snow"
                                                            // value={quill_description}
                                                            placeholder='Enter your description here'
                                                            style={{ borderRadius: '5px' }}
                                                            onChange={setQuillDescription}
                                                        />
                                                    </div>

                                                    <fieldset className="mt-4">
                                                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                                                            Status
                                                    </label>
                                                        <div className="space-y-4">
                                                            {product_options.map((notificationMethod) => (
                                                                <div key={notificationMethod.id} className="flex items-center">
                                                                    <input
                                                                        id={notificationMethod.id}
                                                                        name="notification-method"
                                                                        type="radio"
                                                                        onChange={e => setStatus(e.target.value)}
                                                                        defaultChecked={notificationMethod.id === 'email'}
                                                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                                                    />
                                                                    <label htmlFor={notificationMethod.id} className="ml-3 block text-sm font-medium text-gray-700">
                                                                        {notificationMethod.title}
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </fieldset>

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
                                        <h3 className="text-lg font-medium leading-6 text-gray-900">Other Information</h3>
                                        <p className="mt-1 text-sm text-gray-600">Important product information.</p>
                                    </div>
                                </div>
                                <div className="mt-5 md:mt-0 md:col-span-2">
                                    <form action="#" method="POST">
                                        <div className="shadow overflow-hidden sm:rounded-md">
                                            <div className="px-4 py-5 bg-white sm:p-6">
                                                <div className="grid grid-cols-6 gap-6">

                                                    <div className="col-span-6 ">
                                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                                            Price
                                                    </label>
                                                        <input
                                                            type="number"
                                                            name="price"
                                                            id="price"
                                                            onChange={e => setPrice(e.target.value)}
                                                            autoComplete="price"
                                                            placeholder="Enter price"
                                                            className="mt-1 block w-full outline-none sm:text-sm border border-gray-300 rounded-md p-2"
                                                        />
                                                    </div>

                                                    <div className="col-span-6 ">
                                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                                            Discount
                                                    </label>
                                                        <input
                                                            type="number"
                                                            name="discount"
                                                            id="discount"
                                                            onChange={e => setDiscountPrice(e.target.value)}
                                                            autoComplete="discount"
                                                            placeholder="Enter discount"
                                                            defaultValue={0}
                                                            className="mt-1 block w-full outline-none sm:text-sm border border-gray-300 rounded-md p-2"
                                                        />
                                                    </div>

                                                    <div className="col-span-6 ">
                                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                                            SKU
                                                    </label>
                                                        <input
                                                            type="text"
                                                            name="sku"
                                                            id="sku"
                                                            onChange={e => setSku(e.target.value)}
                                                            autoComplete="sku"
                                                            placeholder="Enter sku"
                                                            className="mt-1 block w-full outline-none sm:text-sm border border-gray-300 rounded-md p-2"
                                                        />
                                                    </div>

                                                    <div className="col-span-6 ">
                                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                                            Quantity
                                                    </label>
                                                        <input
                                                            type="number"
                                                            name="quantity"
                                                            id="quantity"
                                                            onChange={e => setCountInStock(e.target.value)}
                                                            autoComplete="quantity"
                                                            placeholder="Enter quantity"
                                                            className="mt-1 block w-full outline-none sm:text-sm border border-gray-300 rounded-md p-2"
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
                        <div className="mt-10 sm:mt-0 mb-8">
                            <div className="md:grid md:grid-cols-3 md:gap-6">
                                <div className="md:col-span-1">
                                    <div className="px-4 sm:px-0">
                                        <h3 className="text-lg font-medium leading-6 text-gray-900">Variations</h3>
                                        <p className="mt-1 text-sm text-gray-600">Add all variations of product, but leave empty if there is none.</p>
                                    </div>
                                </div>
                                <div className="mt-5 md:mt-0 md:col-span-2">
                                    <form action="#" method="POST">
                                        <div className="shadow overflow-hidden sm:rounded-md">
                                            <div className="px-4 py-5 bg-white sm:p-6">
                                                <div className="grid grid-cols-6 gap-6">

                                                    <div className="col-span-6 ">
                                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                                            e.g
                                                        </label>
                                                        <div className="flex flex-row items-center gap-4">
                                                            <div className="mt-1 block w-full text-gray-400 text-sm outline-none sm:text-sm border border-gray-300 rounded-md p-2"
                                                            >XL</div>
                                                            <div className="mt-1 block w-full text-gray-400 text-sm outline-none sm:text-sm border border-gray-300 rounded-md p-2"
                                                            >$44.50</div>
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
                        <BlueButton text="Edit Product" loading={loading} onClick={() => console.log('edit product')} />
                    </>
                </div>
            </DashboardLayout>
        </NoSSR>
    )
}
