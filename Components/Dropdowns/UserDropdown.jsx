import React from 'react'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Avatar
} from "@chakra-ui/react"
import { ChevronDownIcon, UserIcon } from '@heroicons/react/outline'
import Username from '../Username/Username'
import Link from "next/link"

const dropdown = {
    un_authenticated: [
        { label: 'login', location: '/auth/login' },
        { label: 'register', location: '/auth/register' },
    ]
}

function UserDropdown({ user }) {
    const logout_user = () => {
        window.location.reload()
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
                            <div className="p-2 hover:bg-gray-200 rounded-full">
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
                                    <div className="flex">
                                        <Avatar size="sm" src={user?.user?.photoURL} name={user?.user?.displayName} />
                                        <Username name={'My Account'} />
                                    </div>
                                </>
                            ) : (
                                <div className="flex">
                                    <Avatar size="sm" />
                                    <Username name={'Guest User'} />
                                </div>
                            )
                        }
                    </MenuItem>
                    <MenuDivider />
                    {
                        user ? (
                            <MenuItem onClick={logout_user} >
                                <span className="capitalize text-gray-700 font-semibold">Logout</span>
                            </MenuItem>
                        ) : (
                            <>
                                {
                                    dropdown.un_authenticated.map((option, index) => (
                                        <MenuItem key={index}>
                                            {
                                                <Link href={option.location}>
                                                    <span className="capitalize">{option.label}</span>
                                                </Link>
                                            }
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