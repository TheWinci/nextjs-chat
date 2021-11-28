import '../styles/globals.css'
import '../i18n/i18n';
import type { AppProps } from 'next/app'
import { FC } from 'react';
import { CookiesProvider } from 'react-cookie';
import { AuthProvider } from '../components/Shared/Account/Auth';
import { Compose } from '../components/Shared/Compose';
import { Theme } from '../components/Shared/Theme/Theme';
import { Layout } from '../components/Shared/Layout/Layout';
import { FirebaseProvider } from '../components/Shared/Firebase/FirebaseProvider';

const MyApp: FC<AppProps> = ({
  Component,
  pageProps,
}) => {
  return (
    <FirebaseProvider>
      <Compose
        components={[
          Theme,
          CookiesProvider,
          AuthProvider,
        ]}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Compose>
    </FirebaseProvider>
  );
}

export default MyApp;
