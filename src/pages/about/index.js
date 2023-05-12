import Head from 'next/head';

import UpperNav from '@/components/upperNav'
import { Header, About } from '@/components/Sections';
import { LoginModal } from '@/components/Modals';

export default function AboutPage() {
  return(
    <>
      <Head>
        <title>About</title>
      </Head>
      <UpperNav active="about"/>
      <LoginModal/>
      <div className='pt-12 lg:pt-16'>
        <Header/>
        <About/>
      </div>
    </>
  )
}