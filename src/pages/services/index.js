import Head from 'next/head';

import UpperNav from '@/components/upperNav'
import { Header, Service } from '@/components/Sections';
import { LoginModal } from '@/components/Modals';

export default function ServicePage({services}) {
  return(
    <>
      <Head>
        <title>Services</title>
        <link rel="canonical" href="https://forexcopytrade.ca/services" key="services-canonical"/>
      </Head>
      <UpperNav active="services"/>
      <LoginModal/>
      <div className='pt-12 lg:pt-16'>
        <Header/>
        <Service initialServices={services}/>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/service`);
  const data = await res.json();
  const services = data.services;

  return {
    props: {
      services,
    },
  };
}