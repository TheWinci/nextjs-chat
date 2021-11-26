import Link from 'next/link'
import React, { FC, useContext } from 'react'
import { AuthContext } from '../Account/Auth'
import { BottomNavBarItem, Container, NavBar, NavBarItem } from './Layout.styles'

export const Layout: FC = ({ children }) => {
  const account = useContext(AuthContext)
  return (
    <Container>
      <NavBar>
        <NavBarItem>
          <Link href={'/'}>HOME</Link>
        </NavBarItem>
        <NavBarItem>
          <Link href={'/my-chats'}>CHATS</Link>
        </NavBarItem>
        <BottomNavBarItem>
          {account.account?.username}
        </BottomNavBarItem>
      </NavBar>
      {children}
    </Container>
  )
}
