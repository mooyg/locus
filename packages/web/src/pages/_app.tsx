import type { AppProps } from 'next/app';
import '../styles/global.css';
import { wrapper } from '../redux/store';
import Head from 'next/head';
const WrappedApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Locus</title>
        <link rel="icon" href="/assets/favicon.ico"></link>
      </Head>
      <Component {...pageProps} />
    </>
  );
};
export default wrapper.withRedux(WrappedApp);
