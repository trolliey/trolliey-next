import axios from 'axios'
import React, {
  ReactChild,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import CreditCard from '../../../components/DashboardCard/CreditCard'
import DashboardLayout from '../../../layouts/DashboardLayout'
import ecocash from '../../../public/img/eco_cash.svg'
import { Store } from '../../../Context/Store'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Stack,
  Input,
} from '@chakra-ui/react'

function Cards() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [currency_type, setCurrencyType] = useState('')
  const [number, setNumber] = useState('')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState<any>()
  const [action_button, setActionButton] = useState<any>()
  const { state } = useContext(Store)
  const { userInfo } = state

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
    // setActionButton(() => <Button variant="ghost">Secondary Action</Button>)
    // setBody(() => <p>iam a body of the modal</p>)
    // setCurrencyType('RTGS')
    // await axios.put(
    //   '/api/cards',
    //   { currency_type, number },
    //   {
    //     headers: {
    //       authorization: userInfo.token,
    //     },
    //   }
    // )
    onOpen()
    setTitle('Edit Rtgs card')
    setActionButton(() => (
      <Button onClick={() => console.log(number)} variant="ghost">
        Secondary Action
      </Button>
    ))
    setBody(() => (
      <Stack spacing={3}>
        <Input
          onChange={(e: any) => setNumber(e.target.value)}
          placeholder="write card number"
          size="sm"
        />
      </Stack>
    ))
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
            <div className="flex w-1/3 flex-row">
              <CreditCard
                onClick={edit_rtgs}
                type={'RTGS'}
                number={'No Number Yet'}
                picture={ecocash}
                user_name={'No Name'}
                date={Date.now()}
                bg_color={'bg-gradient-to-r from-black to-gray-800 h-full'}
              />
            </div>
          </div>
        </div>
        <CardsModal
          isOpen={isOpen}
          onClose={onClose}
          title={title}
          setNumber={setNumber}
          body={body}
          ActionButton={action_button}
        />
      </div>
    </DashboardLayout>
  )
}

interface CardProps {
  isOpen: any
  onClose: any
  title: string
  ActionButton: ReactNode
  setNumber: any
  body: any
}

const CardsModal = ({
  isOpen,
  onClose,
  title,
  ActionButton,
  setNumber,
  body,
}: CardProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{body}</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          {ActionButton}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default Cards
