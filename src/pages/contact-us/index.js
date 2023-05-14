import Head from 'next/head';
import UpperNav from '@/components/upperNav'
import { Header, ContactUs } from '@/components/Sections';
import { LoginModal } from '@/components/Modals';

export default function ContactUsPage() {
  return(
    <>
      <Head>
        <title>Contact - Copy trades made by professionals</title>
        <meta
          name="description"
          content="We provide Forex copy trading services. We professionals will do day trades 24/7 with great potential returns. Whatever we gain, you'll gain the same. This is an easy to make extra money on the side without having years of experience."
          key="contact-description"
        />
        <meta property="og:title" content="ForexCopyTrade - Copy trades made by professionals" key="contact-og-title"/>
        <meta
          property="og:description"
          content="We provide Forex copy trading services. We professionals will do day trades 24/7 with great potential returns. Whatever we gain, you'll gain the same. This is an easy to make extra money on the side without having years of experience."
          key="contact-og-description"
        />
        {/* <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/forex-copier-trade.appspot.com/o/app_img%2Fstock-graph.jpg?alt=media&token=aa5ea75f-639a-4f29-9f4b-1b3825acfb8d"
          key="contact-og-image"
        /> */}
      </Head>
      <UpperNav active="contact-us"/>
      <LoginModal/>
      <div className='pt-12 lg:pt-16'>
        <Header/>
        <ContactUs/>
      </div>
    </>
  )
}