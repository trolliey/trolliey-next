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
import { Router, useRouter } from 'next/router'
import Username from '../Username/Username'
import { Store } from '../../Context/Store'
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
                  <Link href={'/dashboard'} passHref>
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
              
              <MenuItem>
                <Link href={'/profile'}>
                  <a className="font-semibold capitalize text-gray-700">
                    My Profile
                  </a>
                </Link>
              </MenuItem>
              <MenuDivider />
              <MenuItem>
                <Link href={'/orders'}>
                  <a className="font-semibold capitalize text-gray-700">
                    My Orders
                  </a>
                </Link>
              </MenuItem>
              <MenuDivider />
            </>
          )}

          {user && (
            <>
              <MenuItem onClick={() => history.push('/password')}>
                <Link href={'/password'} passHref>
                  <a className="font-semibold capitalize text-gray-700">
                    Change Password
                  </a>
                </Link>
              </MenuItem>
              <MenuDivider />
            </>
          )}
          {user ? (
            <MenuItem onClick={logout_user}>
              <div className="font-semibold capitalize text-gray-700">
                Logout
              </div>
            </MenuItem>
          ) : (
            <>
              {dropdown.un_authenticated.map((option, index) => (
                <div key={index} className="flex flex-col">
                  <Link href={option.location} passHref >
                    <a className="capitalize hover:bg-gray-100 p-2">{option.label}</a>
                  </Link>
                </div>
              ))}
            </>
          )}
        </MenuList>
      </Menu>
    </div>
  )
}

export default UserDropdown
