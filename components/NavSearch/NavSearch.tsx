import { Modal, ModalBody, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { SearchIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import React, { ReactElement, useState } from 'react'

function NavSearch():ReactElement {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [search_query, setSearchQuery] = useState<string>('')
    const history = useRouter()

    const search_handler = () => {
        history.push('/explore')
        console.log(search_query)
    }

    return (
        <>

            <div onClick={onOpen} className="flex p-2 hover:bg-gray-200 cursor-pointer rounded-full">
                <SearchIcon height={20} width={20} className="text-gray-700" />
            </div>

            <Modal isOpen={isOpen} onClose={onClose} size={'lg'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody>
                        <div className="flex flex-row items-center">
                            <input
                                type="text"
                                onChange={e => setSearchQuery(e.target.value)}
                                className='md:p-4 p-2 rounded outline-none border-none w-full '
                                placeholder='Search product, store, category...' />
                            <div onClick={search_handler} className='cursor-pointer'>
                                <SearchIcon height={20} width={20} className="text-gray-500" />
                            </div>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default NavSearch