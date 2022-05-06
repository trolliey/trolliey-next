import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import CreditCard from '../../../components/DashboardCard/CreditCard'
import DashboardLayout from '../../../layouts/DashboardLayout'
import ecocash from '../../../public/img/eco_cash.svg'
import { Store } from '../../../Context/Store'
import { Input } from '@chakra-ui/react'
import BlueButton from '../../../components/Buttons/BlueButton'

function Cards() {
  const [currency_type, setCurrencyType] = useState('')
  const [number, setNumber] = useState('')
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const { state } = useContext(Store)
  const { userInfo } = state

  const [edit_rtgs_panel, setEditRtgsPanel] = useState(false)

  const [cards, setCards] = useState()

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
      await axios.put(
        '/api/cards',
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

  const edit_usd = () => {}

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
              <p className="mb-2 mt-2 text-gray-800">
                Card for all RTGS payments
              </p>
            </div>
            <div className="flex w-1/3 flex-col">
              <CreditCard
                onClick={() => setEditRtgsPanel(true)}
                type={'RTGS'}
                number={'No Number Yet'}
                picture={ecocash}
                user_name={'No Name'}
                date={Date.now()}
                bg_color={'bg-gradient-to-r from-black to-gray-800 h-full'}
              />
              {edit_rtgs_panel && (
                <div className="my-2 flex w-full flex-col">
                  <Input placeholder="Enter Card number " />
                  <div className="ml-auto mt-2 flex">
                    <BlueButton text={'Edit'} />
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
