import '../styles/globals.css'
import '../i18n/i18n';
import type { AppProps } from 'next/app'
import { FC } from 'react';
import { CookiesProvider } from 'react-cookie';
import { AuthProvider } from '../components/Shared/Account/Auth';
import { Compose } from '../components/Shared/Compose';
import { Theme } from '../components/Shared/Theme/Theme';
import { Layout } from '../components/Shared/Layout/Layout';

const MyApp: FC<AppProps> = ({
  Component,
  pageProps,
}) => {
  return (
    <Compose
      components={[
        CookiesProvider,
        AuthProvider,
        Theme,
      ]}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Compose>
  );
}

export default MyApp;
