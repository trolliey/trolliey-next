import React, { ReactElement, useState, useContext, useEffect } from 'react'
import GeneralLayout from '../../layouts/GeneralLayout'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  CircularProgress,
  Progress,
  useToast,
} from '@chakra-ui/react'
import { getError } from '../../utils/error'
import axios from 'axios'
import { Store } from '../../Context/Store'
import { Router, useRouter } from 'next/router'
import logo from '../../public/images/icon.png'
import banner from '../../public/images/banner.jpeg'

// prettier-ignore
import {getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject} from 'firebase/storage'
import { firebaseApp } from '../../utils/firebase-config'
import { PencilAltIcon } from '@heroicons/react/outline'

import UploadLoading from '../../components/UploadingLoading/UploadLoading'
import { useFetch } from '../../hooks/useFetch'
import { apiUrl } from '../../utils/apiUrl'

function index(): ReactElement {
  const [name, setname] = useState<string>('')
  const [first_name, setFirstName] = useState<string>('')
  const [last_name, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [dp, setDP] = useState<string>('')
  const [country, setCountry] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [province, setProvince] = useState<string>('')
  const router = useRouter()
  const toast = useToast()

  // get user from context
  const { state: user_state } = useContext(Store)
  const { userInfo } = user_state

  console.log(userInfo)

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
          address: address,
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
        <div
          style={{
            backgroundImage: `url(${banner.src})`,
            backgroundPosition: 'top',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
          className="relative mt-10 flex h-60 w-full flex-col items-center justify-center rounded bg-blue-500"
        >
          <div>
            <img
              className="absolute left-10 h-[200px] w-[200px] rounded-full object-cover"
              src={picture_url ? picture_url : logo.src}
              alt="banner"
            />
          </div>
        </div>
        <div className="mt-32 flex w-full flex-row-reverse justify-between px-4 md:flex-row">
          <div>
            <h3 className="text-left text-2xl font-bold">{userInfo?.name}</h3>
            <p className="text-left text-gray-500">{userInfo?.email}</p>
          </div>
          <div>
            <button
              onClick={() =>
                router.push({
                  pathname: '/profile/edit',
                })
              }
              className="flex rounded-lg bg-blue-primary p-2 text-white hover:bg-blue-secondary"
            >
              <PencilAltIcon className="mr-2 h-5 w-5" />
              Edit Profile
            </button>
          </div>
        </div>
        <div className="mt-10 mb-8 px-4 md:flex md:justify-between">
          <div>
            <p>
              <span className="font-bold">Address</span>
            </p>
            <p>{userInfo?.name}</p>
            <p>
              <span className="font-bold">City</span>
            </p>
            <p>{userInfo?.name}</p>
          </div>
          <div>
            <p>
              <span className="font-bold">Address</span>
            </p>
            <p>{userInfo?.name}</p>
            <p>
              <span className="font-bold">City</span>
            </p>
            <p>{userInfo?.name}</p>
          </div>
          <div>
            <p>
              <span className="font-bold">Province</span>
            </p>
            <p>{userInfo?.name}</p>
            <p>
              <span className="font-bold">Country:</span>
            </p>
            <p>{userInfo?.name}</p>
          </div>
        </div>
      </div>
    </GeneralLayout>
  )
}

export default index
