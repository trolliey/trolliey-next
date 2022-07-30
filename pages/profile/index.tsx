import React, { ReactElement, useState, useContext, useEffect } from 'react'
import GeneralLayout from '../../layouts/GeneralLayout'
import { Progress, useToast } from '@chakra-ui/react'
import { getError } from '../../utils/error'
import axios from 'axios'
import { Store } from '../../Context/Store'
import { useRouter } from 'next/router'

// prettier-ignore
import {getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject} from 'firebase/storage'
import { firebaseApp } from '../../utils/firebase-config'
import { TrashIcon } from '@heroicons/react/outline'
import UploadLoading from '../../components/UploadingLoading/UploadLoading'
import { useFetch } from '../../hooks/useFetch'
import { apiUrl } from '../../utils/apiUrl'

function index(): ReactElement {
  const [name, setname] = useState<string>('')
  const [first_name, setFirstName] = useState<string>('')
  const [last_name, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [country, setCountry] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [province, setProvince] = useState<string>('')
  const history = useRouter()
  const toast = useToast()

  // get user from context
  const { state: user_state } = useContext(Store)
  const { userInfo } = user_state

  //upload image
  const storage = getStorage(firebaseApp)
  const [picture_loading, setPictureLoading] = useState(false)
  const [picture_url, setPictureUrl] = useState<any>(null)
  const [alert, setAlert] = useState(false)
  const [alertStatus, setAlertStatus] = useState<any>('')
  const [alertMsg, setAlertMsg] = useState('')
  const [progress, setProgress] = useState(1)

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
  const url = `${apiUrl}/api/user/single/${userInfo?._id}`
  const state = useFetch(url)

  useEffect(() => {
    setname(state?.data?.user?.username)
    setLastName(state?.data?.user?.lastname)
    setFirstName(state?.data?.user?.firstname)
    setProvince(state?.data?.user?.province)
    setCity(state?.data?.user?.city)
    setAddress(state?.data?.user?.street)
    setFirstName(state?.data?.user?.firstname)
    setPictureUrl(state?.data?.user?.photoURL)
  }, [state])

  const submitHandler = async (e: any) => {
    e.preventDefault()
    try {
      const { data } = await axios.put(
        `${apiUrl}/api/user/edit/${userInfo?._id}`,
        {
          username: name,
          city,
          province,
          country,
          firstname: first_name,
          lastname: last_name,
          picture_url,
          address: address
        },
        {
          headers: {
            Authorization: userInfo?.token,
          },
        }
      )
      toast({
        title: getError(data),
        status: 'success',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: getError(error),
        status: 'success',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  return (
    <GeneralLayout
      no_text
      title="User Info"
      description="Edit and configure user info on Trolliey"
    >
      <div className="max-w-7xl">
        <div className="mx-auto flex w-full flex-col py-8">
          <form
            className="space-y-8 divide-y divide-gray-200 rounded bg-white p-4 md:p-8"
            onSubmit={submitHandler}
          >
            <div className="space-y-8 divide-y divide-gray-200">
              <div>
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Your Profile Information
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    This information will be displayed publicly so be careful
                    what you share.
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      name
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                        trolliey.com/
                      </span>
                      <input
                        id="username"
                        onChange={(e) => setname(e.target.value)}
                        //@ts-ignore
                        // value={state?.data?.user?.username}
                        defaultValue={state?.data?.user?.username}
                        placeholder={'enter your username'}
                        key={state?.data?.user?.username}
                        name="username"
                        type="text"
                        autoComplete="username"
                        className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border border-gray-300 p-2 sm:text-sm"
                      />
                    </div>
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
                        id="firstname"
                        onChange={(e) => setFirstName(e.target.value)}
                        //@ts-ignore
                        defaultValue={state?.data?.user?.firstname}
                        placeholder={'enter your firstname'}
                        key={state?.data?.user?.firstname}
                        name="firstname"
                        type="text"
                        autoComplete="firstname"
                        className="block w-full rounded-md border border-gray-300 p-2 shadow-sm sm:text-sm"
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
                        id="lastname"
                        onChange={(e) => setLastName(e.target.value)}
                        //@ts-ignore
                        defaultValue={state?.data?.user?.lastname}
                        placeholder={'enter your lastname'}
                        key={state?.data?.user?.lastname}
                        name="lastname"
                        type="text"
                        autoComplete="lastname"
                        className="block w-full rounded-md border border-gray-300 p-2 shadow-sm sm:text-sm"
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
                        onChange={(e) => setEmail(e.target.value)}
                        //@ts-ignore
                        defaultValue={state?.data?.user?.email}
                        placeholder={'enter your email'}
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md border border-gray-300 p-2 shadow-sm sm:text-sm"
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
                        //@ts-ignore
                        defaultValue={state?.data?.user?.country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder={'enter your country'}
                        name="country"
                        autoComplete="country-name"
                        className="block w-full rounded-md border border-gray-300 p-2 shadow-sm sm:text-sm"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="street-address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Street address
                    </label>
                    <div className="mt-1">
                      <input
                        id="street"
                        onChange={(e) => setAddress(e.target.value)}
                        //@ts-ignore
                        defaultValue={state?.data?.user?.street}
                        placeholder={'enter your street'}
                        key={state?.data?.user?.street}
                        name="street"
                        type="text"
                        autoComplete="street"
                        className="block w-full rounded-md border border-gray-300 p-2 shadow-sm sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City
                    </label>
                    <div className="mt-1">
                      <input
                        id="city"
                        onChange={(e) => setCity(e.target.value)}
                        //@ts-ignore
                        defaultValue={state?.data?.user?.city}
                        placeholder={'enter your city'}
                        key={state?.data?.user?.city}
                        name="city"
                        type="text"
                        autoComplete="city"
                        className="block w-full rounded-md border border-gray-300 p-2 shadow-sm sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="region"
                      className="block text-sm font-medium text-gray-700"
                    >
                      State / Province
                    </label>
                    <div className="mt-1">
                      <input
                        id="province"
                        onChange={(e) => setProvince(e.target.value)}
                        //@ts-ignore
                        defaultValue={state?.data?.user?.province}
                        placeholder={'enter your province'}
                        key={state?.data?.user?.province}
                        name="province"
                        type="text"
                        autoComplete="province"
                        className="block w-full rounded-md border border-gray-300 p-2 shadow-sm sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="button"
                  className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-primary focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-dark py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-primary focus:ring-offset-2"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </GeneralLayout>
  )
}

export default index
