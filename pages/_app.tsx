import '@/styles/globals.css'
import Layout from '../composants/layout'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
     <Component {...pageProps} />
     </Layout>
 
  )
}
