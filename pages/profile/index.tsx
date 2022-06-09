import React, {
  ReactElement,
  useState,
  useContext,
  useEffect,
  useRef,
} from 'react'
import GeneralLayout from '../../layouts/GeneralLayout'
import { Progress, useToast } from '@chakra-ui/react'
import { getError } from '../../utils/error'
import axios from 'axios'
import { Store } from '../../Context/Store'
import { useRouter } from 'next/router'

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
  const [user, setUser] = useState('')

  // get user from context
  const { state } = useContext(Store)
  const { userInfo } = state

  useEffect(() => {
    if (!userInfo) {
      history.push(`/login?redirect=profile`)
      return
    }
    const getUser = async () => {
      const data = await axios.get(`/api/users/${userInfo?.token}`, {
        headers: {
          authorization: userInfo.token,
        },
      })
      console.log(data?.data)
      setUser(data?.data.user)
    }
    getUser()
  }, [])

  // for image upload
  const fileSelect = useRef<any>(null)
  const [image, setImage] = useState<any>('')
  const [progress, setProgress] = useState<any>(0)
  const [upload_image, setUploadImage] = useState<any>(null)

  async function handleImageUpload() {
    if (fileSelect) {
      fileSelect.current.click()
    }
  }

  function handleFiles(files: any) {
    for (let i = 0; i < files?.length; i++) {
      console.log(files)
      //   uploadFile(files);
      setUploadImage(files)
    }
  }

  const edit_profile_info_Handler = async (file: any) => {
    //@ts-ignore
    const url = `https://api.cloudinary.com/v1_1/trolliey/image/upload`
    const xhr = new XMLHttpRequest()
    const fd = new FormData()
    xhr.open('POST', url, true)
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')

    // Update progress (can be used to show progress indicator)
    xhr.upload.addEventListener('progress', (e) => {
      setProgress(Math.round((e.loaded * 100.0) / e.total))
      console.log(Math.round((e.loaded * 100.0) / e.total))
    })

    xhr.onreadystatechange = (e) => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        const response = JSON.parse(xhr.responseText)
        setImage(response.secure_url)
        console.log(response.secure_url)
      }
    }

    fd.append('upload_preset', 'g6ixv6cg')
    fd.append('tags', 'browser_upload')
    //@ts-ignore
    fd.append('api_key', process.env.CLOUDNARY_API_KEY)
    fd.append('file', file)
    xhr.send(fd)
  }

  const toast = useToast()
  const submitHandler = async (e: any) => {
    e.preventDefault()
    if (upload_image) {
      edit_profile_info_Handler(upload_image)
      try {
        //@ts-ignore
        const { data } = axios.put(
          '/api/users/profile',
          {
            name,
            first_name,
            last_name,
            email,
            country,
            address,
            city,
            province,
            picture: image,
          },
          {
            headers: {
              authorization: userInfo.token,
            },
          }
        )
        toast({
          title: 'Profile Updated Successfully ',
          status: 'success',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        })
      } catch (error) {
        toast({
          title: 'Failed.',
          description: getError(error),
          status: 'error',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        })
      }
    } else {
      try {
        //@ts-ignore
        const { data } = axios.put(
          '/api/users/profile',
          {
            name,
            first_name,
            last_name,
            email,
            country,
            address,
            city,
            province,
            //@ts-ignore
            picture: user?.photoURL,
          },
          {
            headers: {
              authorization: userInfo.token,
            },
          }
        )
        toast({
          title: 'Profile Updated Successfully ',
          status: 'success',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        })
      } catch (error) {
        toast({
          title: 'Failed.',
          description: getError(error),
          status: 'error',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        })
      }
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
                        type="text"
                        name="name"
                        id="name"
                        //@ts-ignore
                        defaultValue={user?.name}
                        onChange={(e) => setname(e.target.value)}
                        autoComplete="name"
                        className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border border-gray-300 p-2 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    {/* <label
                      htmlFor="photo"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Photo
                    </label>
                    <div className="mt-1 flex items-center">
                      <span className="h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                        <svg
                          className="h-full w-full text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                      <button
                        type="button"
                        className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-primary focus:ring-offset-2"
                      >
                        Change
                      </button>
                    </div> */}
                    <label
                      htmlFor="photo"
                      className="block pb-4 text-sm font-medium text-gray-700"
                    >
                      Profile Photo
                    </label>
                    <>
                      {image ? (
                        <img
                          className="rounded-lg object-contain"
                          src={image.replace('upload/', 'upload/w_600/')}
                          style={{ height: 400, width: 600 }}
                        />
                      ) : (
                        <div
                          className="rounded-lg border-2 border-dashed border-gray-400 bg-gray-200"
                          style={{ height: 100, width: 300 }}
                        >
                          {upload_image && <p className='text-center py-2 text-gray-700'>Picture has been selected</p>}
                          <form className="flex h-full items-center justify-center">
                            {progress === 0 ? (
                              <div className="text-center text-gray-700">
                                <button
                                  className="m-auto block rounded bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-800"
                                  onClick={handleImageUpload}
                                  type="button"
                                >
                                  Select Image
                                </button>
                              </div>
                            ) : (
                              <span className="text-gray-700">{progress}%</span>
                            )}

                            <input
                              ref={fileSelect}
                              type="file"
                              accept="image/*"
                              style={{ display: 'none' }}
                              onChange={(e) => handleFiles(e.target.files)}
                            />
                          </form>
                        </div>
                      )}
                    </>
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
                        //@ts-ignore
                        defaultValue={user?.firstname}
                        onChange={(e) => setFirstName(e.target.value)}
                        name="first-name"
                        id="first-name"
                        placeholder="enter your firstname"
                        autoComplete="given-name"
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
                        type="text"
                        //@ts-ignore
                        defaultValue={user?.lastname}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder={'enter yout lastname'}
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
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
                        defaultValue={user?.email}
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
                        defaultValue={user?.country}
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
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        name="street-address"
                        placeholder={'enter your address'}
                        id="street-address"
                        autoComplete="street-address"
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
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder={'enter your city'}
                        name="city"
                        id="city"
                        autoComplete="address-level2"
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
                        type="text"
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        placeholder={'enter your province'}
                        name="region"
                        id="region"
                        autoComplete="address-level1"
                        className="block w-full rounded-md border border-gray-300 p-2 shadow-sm sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full pt-5">
              <Progress hasStripe value={64} />
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
