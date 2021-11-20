import '../styles/globals.css'
import '../i18n/i18n';
import type { AppProps } from 'next/app'
import { FC, useState } from 'react';
import { CookiesProvider } from 'react-cookie';
import { defaultTheme } from '../components/Shared/Theme.constants';
import { ThemeProvider } from 'styled-components';
import { AccountProvider } from '../components/Shared/Account.context';

function MyApp(props: AppProps) {
  return (
    <CookiesProvider>
      <RenderComponent {...props} />
    </CookiesProvider>
  );
}

const RenderComponent: FC<AppProps> = ({
  Component,
  pageProps,
}) => {
  const [theme, setTheme] = useState(defaultTheme)

  return (
    <ThemeProvider theme={theme}>
      <AccountProvider>
        <div
          style={{
            minWidth: '300px',
            height: '100vh',
            background: theme.colors.black,
            color: theme.colors.light,
          }}
        >
          <Component {...pageProps} />
        </div>
      </AccountProvider>
    </ThemeProvider>
  )
}


export default MyApp;
