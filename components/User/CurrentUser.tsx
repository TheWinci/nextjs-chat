import React, { useContext } from 'react'
import { AuthContext } from '../Shared/Account/Auth'

export const CurrentUser = () => {
  const { user } = useContext(AuthContext)
  return (
    <div>
      {user?.displayName || user?.email}
    </div>
  )
}
