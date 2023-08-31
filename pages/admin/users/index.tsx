import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import AdminUsersTable from '../../../components/Tables/AdminUsersTable'
import { Store } from '../../../Context/Store'
import AdminDashboard from '../../../layouts/AdminDashboard'
import { apiUrl } from '../../../utils/apiUrl'

function ManageUsers() {
  const [all_users, setAllUsers] = useState<any>()
  const { state, dispatch } = useContext(Store)
  const { userInfo } = state

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await axios.get(`/api/users`, {
        headers: {
          authorization: userInfo?.token,
        },
      })
      setAllUsers(data)
    }
    getUsers()
  }, [])
  return (
    <AdminDashboard>
      <p className="my-4 text-center font-semibold text-gray-700 capitalize">
        manage all users from here
        <AdminUsersTable users={all_users?.users} />
      </p>
    </AdminDashboard>
  )
}

export default ManageUsers
