import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import PromptController from '../components/PromptController'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>NextJS test</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>

      <main className="h-100">
        <PromptController/>
      </main>

      <footer>
        
      </footer>
    </>
  )
}

export default Home
