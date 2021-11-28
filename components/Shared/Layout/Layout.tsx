import Link from 'next/link'
import React, { FC, useCallback, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { ChatList } from '../../ChatList/ChatList'
import { CurrentUser } from '../../User/CurrentUser'
import { AuthContext } from '../Account/Auth'
import { BottomNavBarItem, Container, NavBar, NavBarItem } from './Layout.styles'

export const Layout: FC = ({ children }) => {
  const { t } = useTranslation();
  const account = useContext(AuthContext)

  const navBar = useCallback(
    () => {
      if (!account.user) {
        return null;
      }

      return (
        <NavBar>
          <NavBarItem>
            <Link href={'/'}>{t('home')}</Link>
          </NavBarItem>
          <NavBarItem>
            <ChatList />
          </NavBarItem>
          <BottomNavBarItem>
            <CurrentUser />
            <a onClick={account.logout}>{t('log-out')}</a>
          </BottomNavBarItem>
        </NavBar>
      )
    },
    [account.user],
  )

  return (
    <Container>
      {navBar()}
      {children}
    </Container>
  )
}
