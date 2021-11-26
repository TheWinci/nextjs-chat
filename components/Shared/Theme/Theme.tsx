import React, { createContext, FC, useState } from 'react'
import { ThemeProvider } from 'styled-components';
import { defaultTheme, initialContext } from './Theme.constants';
import { ChangeThemeParams, IThemeContext, TTheme } from './Theme.types';

export const ThemeContext = createContext<IThemeContext>(initialContext)

export const Theme: FC = ({ children }) => {
  const [theme, setTheme] = useState<TTheme>(defaultTheme)

  const changeTheme = (params: ChangeThemeParams) => {
    if ('string' === typeof params) {
      console.warn('did not care enough to implement any predefined themes')
      return;
    }
    setTheme(params)
  }

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
