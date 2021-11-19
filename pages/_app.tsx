import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useCookies } from 'react-cookie';
import { FC, useEffect, useState } from 'react';
import { CookiesProvider } from 'react-cookie';
import { useRouter } from 'next/dist/client/router';
import { getPublicEnv } from '../services/env.service';
import { defaultTheme } from '../components/Shared/Theme.constants';
import { ThemeProvider } from 'styled-components';
// import { appWithTranslation } from 'next-i18next';
import '../i18n/i18n';

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
  const [cookies] = useCookies([getPublicEnv('userCookieName')]);
  const router = useRouter()
  const [theme, setTheme] = useState(defaultTheme)

  useEffect(() => {
    if (
      Object.keys(cookies).length <= 0 &&
      router.pathname !== '/register'
    ) {
      router.push('/login')
    }
  }, [cookies])

  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  )
}


export default MyApp;
// export default appWithTranslation(MyApp);
