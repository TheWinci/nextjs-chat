import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useCookies } from 'react-cookie';
import { FC, useEffect } from 'react';
import { CookiesProvider } from 'react-cookie';
import { useRouter } from 'next/dist/client/router';
import { getPublicEnv } from '../services/env.service';

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

  useEffect(() => {
    if (Object.keys(cookies).length <= 0) {
      router.push('/login')
    }
  }, [cookies])

  return <Component {...pageProps} />
}


export default MyApp
