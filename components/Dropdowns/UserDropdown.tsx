import React, { ReactElement, useContext } from 'react'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Avatar,

} from "@chakra-ui/react"
import { UserIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import Username from '../Username/Username'
import { Store } from '../../Context/Store'
import Cookies from 'js-cookie'

const dropdown = {
    un_authenticated: [
        { label: 'login', location: '/login' },
        { label: 'register', location: '/register' },
    ]
}

interface Props {
    user?: any
}

function UserDropdown(): ReactElement {
    const history = useRouter()
    const { dispatch, state } = useContext(Store)
    const { userInfo: user } = state

    const logout_user = () => {
        dispatch({ type: 'USER_LOGOUT' })
        Cookies.remove('userInfo')
        Cookies.remove('cartItems')
        history.push('/')
    }

    return (
        <div className="flex">
            <Menu>
                {
                    user ? (
                        <MenuButton>
                            <div className="flex gap-1 cursor-pointer flex-row items-center">
                                <Avatar size="sm" src={user?.user?.photoURL} name={user?.name} />
                                {/* <p className='text-gray-700 font-semibold'>{user?.name}</p> */}
                                {/* <ChevronDownIcon height={12} width={12} /> */}
                            </div>
                        </MenuButton>
                    ) : (
                        <MenuButton className='p-2 hover:bg-gray-200 rounded-full'>
                            <div className="">
                                <UserIcon height={20} width={20} className="text-gray-700" />
                            </div>
                        </MenuButton>
                    )
                }

                <MenuList>
                    {
                        user && (
                            <MenuItem>
                                {
                                    user ? (
                                        <>
                                            {
                                                user?.role === 'user' ? (
                                                    <div onClick={() => history.push('/profile')} className="flex flex-row space-x-2">
                                                        <Avatar size="sm" src={user?.user?.photoURL} name={user?.name} />
                                                        <Username username={'Profile'} />
                                                    </div>
                                                ) : (
                                                    <div onClick={() => history.push('/dashboard')} className="flex flex-row space-x-2 ">
                                                        <Avatar size="sm" src={user?.user?.photoURL} name={user?.name} />
                                                        <Username username={'My Account'} />
                                                    </div>
                                                )
                                            }
                                        </>
                                    ) : (
                                        <div className="flex flex-row space-x-2">
                                            <Avatar size="sm" />
                                            <Username username={'Guest User'} />
                                        </div>
                                    )
                                }
                            </MenuItem>
                        )
                    }
                    <MenuDivider />

                    <MenuItem onClick={() => history.push('/orders')}>
                        <span className="capitalize text-gray-700 font-semibold">My Orders</span>
                    </MenuItem>
                    <MenuDivider />

                    <MenuItem onClick={() => history.push('/password')}>
                        <span className="capitalize text-gray-700 font-semibold">Change Password</span>
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