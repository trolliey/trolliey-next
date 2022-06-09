import React, { ReactElement, useContext } from 'react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
} from '@chakra-ui/react'
import { UserIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import Username from '../Username/Username'
import { Store } from '../../Context/Store'
import Cookies from 'js-cookie'
import Link from 'next/link'

const dropdown = {
  un_authenticated: [
    { label: 'login', location: '/login' },
    { label: 'register', location: '/register' },
  ],
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
    history.push('/')
  }

  return (
    <div className="flex">
      <Menu>
        {user ? (
          <MenuButton>
            <div className="flex cursor-pointer flex-row items-center gap-1">
              <Avatar size="sm" src={user?.user?.photoURL} name={user?.name} />
              {/* <p className='text-gray-700 font-semibold'>{user?.name}</p> */}
              {/* <ChevronDownIcon height={12} width={12} /> */}
            </div>
          </MenuButton>
        ) : (
          <MenuButton className="rounded-full p-2 hover:bg-gray-200">
            <div className="">
              <UserIcon height={20} width={20} className="text-gray-700" />
            </div>
          </MenuButton>
        )}

        <MenuList>
          <MenuItem>
            {user ? (
              <>
                {user?.role === 'user' ? (
                  <Link href={'profile'}>
                    <a className="flex flex-row space-x-2">
                      <Avatar
                        size="sm"
                        src={user?.user?.photoURL}
                        name={user?.name}
                      />
                      <Username username={'Profile'} />
                    </a>
                  </Link>
                ) : (
                  <Link href={'/dashboard'}>
                    <a className="flex flex-row space-x-2 ">
                      <Avatar
                        size="sm"
                        src={user?.user?.photoURL}
                        name={user?.name}
                      />
                      <Username username={'My Dashboard'} />
                    </a>
                  </Link>
                )}
              </>
            ) : (
              <div className="flex flex-row space-x-2">
                <Avatar size="sm" />
                <Username username={'Guest User'} />
              </div>
            )}
          </MenuItem>

          <MenuDivider />

          {user && (
            <>
              <Link href={'/orders'} passHref>
                <MenuItem>
                  <a className="font-semibold capitalize text-gray-700">
                    My Orders
                  </a>
                </MenuItem>
              </Link>
              <MenuDivider />
            </>
          )}

          {user && (
            <>
              <Link href={'/password'} passHref>
                <MenuItem>
                  <a className="font-semibold capitalize text-gray-700">
                    Change Password
                  </a>
                </MenuItem>
              </Link>
              <MenuDivider />
            </>
          )}
          {user ? (
            <MenuItem onClick={logout_user}>
              <span className="font-semibold capitalize text-gray-700">
                Logout
              </span>
            </MenuItem>
          ) : (
            <>
              {dropdown.un_authenticated.map((option, index) => (
                <Link href={option.location} passHref>
                  <MenuItem key={index}>
                    <a className="capitalize">{option.label}</a>
                  </MenuItem>
                </Link>
              ))}
            </>
          )}
        </MenuList>
      </Menu>
    </div>
  )
}

export default UserDropdown
