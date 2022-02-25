import React, { ReactElement } from 'react'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Avatar,

} from "@chakra-ui/react"
import { ChevronDownIcon, UserIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import Username from '../Username/Username'

const dropdown = {
    un_authenticated: [
        { label: 'login', location: '/login' },
        { label: 'register', location: '/register' },
    ]
}

interface Props{
    user?:any
}

function UserDropdown({user}:Props):ReactElement {
    const history = useRouter()

    const logout_user = () => {
        window.location.reload()
        history.push('/')
    }

    return (
        <div className="flex">
            <Menu>
                <MenuButton>
                    {
                        user ? (
                            <div className="flex rounded-full gap-1 cursor-pointer flex-row items-center">
                                <Avatar size="sm" src={user?.user?.photoURL} name={user?.user?.displayName} />
                                <p className='text-gray-700 font-semibold'>{user?.user?.displayName}</p>
                                <ChevronDownIcon height={12} width={12} />
                            </div>
                        ) : (
                            <div className="p-2 bg-gray-100 hover:bg-gray-200  rounded-full">
                                <UserIcon height={20} width={20} className="text-gray-700" />
                            </div>
                        )
                    }
                </MenuButton>
                <MenuList>
                    <MenuItem>
                        {
                            user ? (
                                <>
                                    {
                                        user?.user?.role === 'user' ? (
                                            <div onClick={() => history.push('/dashboard/buyer-home')} className="flex">
                                                <Avatar size="sm" src={user?.user?.photoURL} name={user?.user?.displayName} />
                                                <Username username={'My Account'} />
                                            </div>
                                        ) : (
                                            <div onClick={() => history.push('/dashboard')} className="flex">
                                                <Avatar size="sm" src={user?.user?.photoURL} name={user?.user?.displayName} />
                                                <Username username={'My Account'} />
                                            </div>
                                        )
                                    }
                                </>
                            ) : (
                                <div className="flex">
                                    <Avatar size="sm" />
                                    <Username username={'Guest User'} />
                                </div>
                            )
                        }
                    </MenuItem>
                    <MenuDivider />
                    {
                        user ? (
                            <MenuItem onClick={logout_user}>
                                <span className="capitalize text-gray-700 font-semibold">Logout</span>
                            </MenuItem>
                        ) : (
                            <>
                                {
                                    dropdown.un_authenticated.map((option, index) => (
                                        <MenuItem onClick={() => history.push(option.location)} key={index}>
                                            <span className="capitalize">{option.label}</span>
                                        </MenuItem>
                                    ))
                                }
                            </>

                        )
                    }
                </MenuList>
            </Menu>
        </div>
    )
}

export default UserDropdown