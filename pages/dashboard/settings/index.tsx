import { useToast } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/spinner'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import BlueButton from '../../../components/Buttons/BlueButton'
import UploadLoading from '../../../components/UploadingLoading/UploadLoading'
import { Store } from '../../../Context/Store'
import DashboardLayout from '../../../layouts/DashboardLayout'
import { getError } from '../../../utils/error'
import { firebaseApp } from '../../../utils/firebase-config'

// prettier-ignore
import {getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject} from 'firebase/storage'
import { TrashIcon } from '@heroicons/react/outline'
import { useAuthFetch } from '../../../hooks/useAuthFetch'
import { apiUrl } from '../../../utils/apiUrl'

function Settings() {
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [company_name, setCompanyName] = useState('')
  const [about, setAbout] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [rtgsAccount, setRtgsAccount] = useState('')
  const [usdAccount, setUsdAccount] = useState('')

  const [edit_loading, setEditLoading] = useState(false)

  const { state } = useContext(Store)
  const { userInfo } = state
  const [loading, setLoading] = useState<boolean>(false)
  const [store_data, setStore_Data] = useState<any>()
  const toast = useToast()

  //upload image
  const storage = getStorage(firebaseApp)
  const [picture_loading, setPictureLoading] = useState(false)
  const [picture_url, setPictureUrl] = useState<any>(null)
  const [alert, setAlert] = useState(false)
  const [alertStatus, setAlertStatus] = useState<any>('')
  const [alertMsg, setAlertMsg] = useState('')
  const [progress, setProgress] = useState(1)

  const url = `${apiUrl}/api/store/details`

  const {data} = useAuthFetch(url, userInfo?.token)

  useEffect(()=>{
    setFirstName(data?.store_info.first_name)
    setLastName(data?.store_info.last_name)
    setCompanyName(data?.store_info.company_name)
    setAbout(data?.store_info.about)
    setAddress(data?.store_info.store_address)
    setEmail(data?.store_info.email)
    setRtgsAccount(data?.store_info.rtgsAccount)
    setUsdAccount(data?.store_info.usdAccount)
  },[])

  useEffect(() => {
    setLoading(true)
    const getStoreDAta = async () => {
      try {
        const { data } = await axios.get(`/api/store/dashboard`, {
          headers: {
            authorization: userInfo?.token,
          },
        })
        setStore_Data(data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log(getError(error))
      }
    }
    getStoreDAta()
  }, [])

  const edit_info_handler = () => {
    setEditLoading(true)
    console.log('edited store')
    toast({
      title: 'Edited Sucessfully',
      status: 'success',
      position: 'top-right',
      duration: 9000,
      isClosable: true,
    })
    setLoading(false)
  }

  const upload_picture = (e: any) => {
    e.preventDefault()
    setPictureLoading(true)
    const pictureFile = e.target.files[0]
    const storageRef = ref(storage, `Profile/${Date.now()}-${pictureFile.name}`)
    try {
      const uploadTask = uploadBytesResumable(storageRef, pictureFile)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const uploadProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setProgress(uploadProgress)
        },
        (error) => {
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setPictureUrl(downloadURL)
            setPictureLoading(false)
            setAlert(true)
            setAlertStatus('success')
            setAlertMsg('Your video is uploaded to our server')
            setTimeout(() => {
              setAlert(false)
            }, 4000)
          })
        }
      )
    } catch (error) {
      setPictureLoading(false)
    }
  }

  const deletePicture = () => {
    const deleteRef = ref(storage, picture_url)
    deleteObject(deleteRef)
      .then(() => {
        setPictureUrl(null)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // console.log(store_data)

  if (loading) {
    return (
      <DashboardLayout>
        <div className="my-4 grid h-96 w-full content-center items-center justify-center bg-white md:my-8">
          <Spinner />
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="flex w-full p-2 md:p-16">
        <form className="w-full space-y-8 divide-y divide-gray-200 rounded bg-white p-2 shadow md:p-8">
          <div className="space-y-8 divide-y divide-gray-200">
            <div>
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Store Settings
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Some of this information will be displayed publicly so be
                  careful what you share.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Store Name
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 p-2 px-3 text-gray-500 sm:text-sm">
                      trolliey.com/
                    </span>
                    <input
                      type="text"
                      name="store_name"
                      id="store_name"
                      defaultValue={store_data?.store?.company_name}
                      autoComplete="store_name"
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700"
                  >
                    About
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="about"
                      name="about"
                      rows={10}
                      defaultValue={store_data?.store?.about}
                      onChange={(e) => setAbout(e.target.value)}
                      className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Write a few sentences about yourself.
                  </p>
                </div>

                <div className="sm:col-span-6">
                    <div className="w-full p-3"></div>
                    <label
                      htmlFor="photo"
                      className="block pb-4 text-sm font-medium text-gray-700"
                    >
                      Profile Photo
                    </label>
                    {picture_url && (
                      <div className="relative flex h-80 w-80 flex-col">
                        <div className="ml-auto flex">
                          <div
                            onClick={deletePicture}
                            className=" cursor-pointer rounded-full bg-red-600 p-2 text-white hover:bg-red-700"
                          >
                            <TrashIcon height={20} width={20} />
                          </div>
                        </div>
                        <img
                          src={picture_url}
                          className="h-40 w-40 rounded-lg"
                        />
                      </div>
                    ) }
                      <div className="md:flex">
                        {picture_loading ? (
                          <UploadLoading progress={progress} />
                        ) : (
                          <div
                            className={` relative flex h-20 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 `}
                          >
                            <div className="absolute">
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
                              <div className="flex flex-col items-center">
                                <span className="block font-normal text-gray-400">
                                  Select picture
                                </span>{' '}
                              </div>
                            </div>

                            <input
                              // onChange={uploadMultipleFiles}
                              type="file"
                              className="h-full w-full opacity-0"
                              onChange={upload_picture}
                              accept="image/jpeg,image/png"
                              name=""
                            />
                          </div>
                        )}
                      </div>
                  </div>
              </div>
            </div>

            <div className="pt-8">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Payment Settings
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  How you want to be payed once your items have been bought
                </p>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium text-gray-700"
                  >
                    RTGS Account
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="rtgs-account"
                      id="rtgs-account"
                      autoComplete="postal-code"
                      placeholder="enter rtgs account"
                      onChange={(e) => setRtgsAccount(e.target.value)}
                      className="block w-full rounded-md border border-gray-300 p-2 shadow-sm sm:text-sm"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium text-gray-700"
                  >
                    USD Account
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="usd-account"
                      id="usd-account"
                      placeholder="enter usd account number"
                      autoComplete="postal-code"
                      onChange={(e) => setUsdAccount(e.target.value)}
                      className="block w-full rounded-md border border-gray-300 p-2 shadow-sm sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Personal Information
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Use a permanent address where you can receive mail.
                </p>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="first-name"
                      defaultValue={store_data?.store?.first_name}
                      onChange={(e) => setFirstName(e.target.value)}
                      id="first-name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="last-name"
                      defaultValue={store_data?.store?.last_name}
                      onChange={(e) => setLastName(e.target.value)}
                      id="last-name"
                      autoComplete="family-name"
                      className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      defaultValue={store_data?.store?.email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Country
                  </label>
                  <div className="mt-1">
                    <select
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option>Zimbabwe</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Physical address
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="street-address"
                      id="street-address"
                      defaultValue={store_data?.store?.store_address}
                      onChange={(e) => setAddress(e.target.value)}
                      autoComplete="street-address"
                      className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium text-gray-700"
                  >
                    ZIP / Postal code
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="postal-code"
                      id="postal-code"
                      autoComplete="postal-code"
                      className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Notifications
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  We'll always let you know about important changes, but you
                  pick what else you want to hear about.
                </p>
              </div>
              <div className="mt-6">
                <fieldset className="mt-6">
                  <div>
                    <legend className="text-base font-medium text-gray-900">
                      Push Notifications
                    </legend>
                    <p className="text-sm text-gray-500">
                      These are delivered via SMS to your mobile phone.
                    </p>
                  </div>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center">
                      <input
                        id="push-everything"
                        name="push-notifications"
                        type="radio"
                        className="h-4 w-4 border border-gray-300 p-2 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor="push-everything"
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        Everything
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="push-email"
                        name="push-notifications"
                        type="radio"
                        className="h-4 w-4 border border-gray-300 p-2 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor="push-email"
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        Same as email
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="push-nothing"
                        name="push-notifications"
                        type="radio"
                        className="h-4 w-4 border border-gray-300 p-2 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor="push-nothing"
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        No push notifications
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="button"
                className="rounded-md border border-gray-300 bg-white p-2 py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <BlueButton
                loading={edit_loading}
                text={'Edit Account'}
                onClick={edit_info_handler}
              />
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}

export default Settings
