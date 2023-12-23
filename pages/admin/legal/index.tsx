import React, { useContext, useState } from 'react'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css' // ES6
import AdminDashboard from '../../../layouts/AdminDashboard'
import BlueButton from '../../../components/Buttons/BlueButton'
import axios from 'axios'
import { apiUrl } from '../../../utils/apiUrl'
import { Store } from '../../../Context/Store'
import { useToast } from '@chakra-ui/react'

function Index() {
  const [description, setQuillDescription] = useState<any>('')
  const [loading, setLoading] = useState(false)
  const { state } = useContext(Store)
  const { userInfo } = state
  const toast = useToast()
  const handleUpload = async () => {
    setLoading(true)
    axios
      .post(
        `${apiUrl}/api/legal`,
        {
          terms: description,
        },
        {
          headers: {
            Authorization: `${userInfo?.token}`,
          },
        }
      )
      .then((res) => {
        setLoading(false)
        if (res.status === 201) {
          toast({
            title: 'Terms and Conditions updated successfully',
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast({
          title: 'Something went wrong',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      })
  }
  const getTerms = async () => {
    axios.get(`${apiUrl}/api/legal/terms`).then((res) => {
      console.log(res.data, 'uuuuuuu')
      setQuillDescription(res.data?.data?.policy)
    })
  }
  React.useEffect(() => {
    getTerms()
  }, [])

  return (
    <AdminDashboard>
      <ReactQuill
        theme="snow"
        // value={quill_description}
        placeholder="Enter your new terms here"
        style={{ borderRadius: '5px' }}
        onChange={setQuillDescription}
        value={description}
      />
      <BlueButton
        loading={loading}
        className="mt-12"
        text="Save"
        onClick={() => {
          handleUpload()
        }}
      />
    </AdminDashboard>
  )
}

export default Index
