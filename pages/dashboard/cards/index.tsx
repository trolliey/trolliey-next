import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import CreditCard from '../../../components/DashboardCard/CreditCard'
import DashboardLayout from '../../../layouts/DashboardLayout'
import ecocash from '../../../public/img/eco_cash.svg'
import { Store } from '../../../Context/Store'
import {
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  toast,
  useToast,
} from '@chakra-ui/react'
import BlueButton from '../../../components/Buttons/BlueButton'
import { apiUrl } from '../../../utils/apiUrl'

function Cards() {
  const [currency_type, setCurrencyType] = useState('')
  const [number, setNumber] = useState('')
  const [branch, setBranch] = useState('')
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const { state } = useContext(Store)
  const { userInfo } = state

  const [edit_rtgs_panel, setEditRtgsPanel] = useState(false)

  const [cards, setCards] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false) // State for showing/hiding the modal

  const toast = useToast()
  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true)
  }

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    const getCards = async () => {
      const { data } = await axios.get('/api/cards', {
        headers: {
          authorization: userInfo.token,
        },
      })
      setCards(data)
    }
    getCards()
  }, [])

  console.log(cards)

  const edit_rtgs = async () => {
    try {
      setLoading(false)
      await axios.post(
        '/api/store/save-card-details',
        { currency_type: 'RTGS' },
        {
          headers: {
            authorization: userInfo.token,
          },
        }
      )
      setLoading(true)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await axios.post(
        `${apiUrl}/api/store/save-card-details`,
        { currency_type, number, bank_name: title },
        {
          headers: {
            authorization: userInfo.token,
          },
        }
      )
      // put toast
      toast({
        title: 'Card Details Saved',
        description: 'Card details saved successfully',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  return (
    <DashboardLayout>
      <p className="my-8 text-center text-2xl font-bold text-black">
        These are the accounts that will receive payment
      </p>
      <div className="m-2 flex flex-1 flex-col rounded bg-white p-4 md:m-4 ">
        <p className="mb-4 text-center font-semibold capitalize text-gray-700">
          Click on a card to change or add details
        </p>
        <div className="flex flex-col">
          <div className="col-span-1 w-full">
            <div className="flex">
              <p className="mb-2 mt-2 font-bold text-gray-800">
                Card for all RTGS payments
              </p>
            </div>
            <div className="flex w-1/3 flex-col">
              <button
                onClick={openModal} // Open the modal when the button is clicked
                className="ml-2 rounded-md bg-blue-500 px-4 py-2 text-white"
              >
                Add RTGS Card
              </button>
              <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Enter Banking Details</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Input
                      onChange={(e) => setCurrencyType(e.target.value)}
                      placeholder="Currency Type"
                      mb={4}
                    />
                    <Input
                      onChange={(e) => setNumber(e.target.value)}
                      placeholder="Account Number"
                      mb={4}
                    />
                    <Input
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Bank Name"
                      mb={4}
                    />
                    <Input
                      onChange={(e) => setBranch(e.target.value)}
                      placeholder="Branch Name"
                      mb={4}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <BlueButton
                      text={'Submit'}
                      onClick={handleSubmit}
                      loading={loading}
                    />
                  </ModalFooter>
                </ModalContent>
              </Modal>
              {edit_rtgs_panel && (
                <div className="my-2 flex w-full flex-col">
                  <Input
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="Enter Card number "
                  />
                  <div className="ml-auto mt-2 flex">
                    <button
                      onClick={handleSubmit}
                      className="rounded bg-blue-500 px-4 py-2 text-white"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Cards
