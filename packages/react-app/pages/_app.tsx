import type { AppProps } from 'next/app'
import Head from 'next/head'
import 'antd/dist/antd.css';
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>web3-practice-nft</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
