import Head from 'next/head';

import UpperNav from '@/components/upperNav'
import { Header, Service } from '@/components/Sections';
import { LoginModal } from '@/components/Modals';

export default function ServicePage({services}) {
  return(
    <>
      <Head>
        <title>Services - Copy trades made by professionals</title>
        <link rel="canonical" href="https://forexcopytrade.ca/services" key="services-canonical"/>
        <meta
          name="description"
          content="We provide Forex copy trading services. We professionals will do day trades 24/7 with great potential returns. Whatever we gain, you'll gain the same. This is an easy to make extra money on the side without having years of experience."
          key="services-description"
        />
        <meta
          name="description"
          content="We provide Forex copy trading services. We professionals will do day trades 24/7 with great potential returns. Whatever we gain, you'll gain the same. This is an easy to make extra money on the side without having years of experience."
          key="services-description"
        />
        <meta property="og:title" content="ForexCopyTrade - Copy trades made by professionals" key="services-og-title"/>
        <meta
          property="og:description"
          content="We provide Forex copy trading services. We professionals will do day trades 24/7 with great potential returns. Whatever we gain, you'll gain the same. This is an easy to make extra money on the side without having years of experience."
          key="services-og-description"
        />
        {/* <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/forex-copier-trade.appspot.com/o/app_img%2Fstock-graph.jpg?alt=media&token=aa5ea75f-639a-4f29-9f4b-1b3825acfb8d"
          key="services-og-image"
        /> */}
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

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/service`);
  const data = await res.json();
  const services = data.services;

  return {
    props: {
      services,
    },
  };
}