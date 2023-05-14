import { Inter } from 'next/font/google';
import Head from 'next/head';
import styles from '@/styles/Home.module.css';


import UpperNav from '@/components/upperNav'
import { Header, About, Disclaimer, Service, EightcapProfile, HistoryGallery, SocialMedia, ContactUs, Testimonials } from '@/components/Sections'
import { LoginModal } from '@/components/Modals';

const inter = Inter({ subsets: ['latin'] })

export default function Home({services, historyImages=[], historyMonths=[], reviews=undefined}) {
  return (
    <>
      <Head>
        <title>ForexCopyTrade - Copy trades made by professionals</title>
        <meta name="robots" content="all" key="robots-all"></meta>
        <meta name="google" content="all" key="google-all"/>
        <meta name="google" content="notranslate" key="notranslate"/>
        <link rel="canonical" href="https://forexcopytrade.ca" key="home-canonical"/>
        <meta
          name="description"
          content="We provide Forex copy trading services. We professionals will do day trades 24/7 with great potential returns. Whatever we gain, you'll gain the same. This is an easy to make extra money on the side without having years of experience."
          key="home-description"
        />
        <meta property="og:title" content="ForexCopyTrade - Copy trades made by professionals" key="home-og-title"/>
        <meta
          property="og:description"
          content="We provide Forex copy trading services. We professionals will do day trades 24/7 with great potential returns. Whatever we gain, you'll gain the same. This is an easy to make extra money on the side without having years of experience."
          key="home-og-description"
        />
        {/* <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/forex-copier-trade.appspot.com/o/app_img%2Fstock-graph.jpg?alt=media&token=aa5ea75f-639a-4f29-9f4b-1b3825acfb8d"
          key="home-og-image"
        /> */}
      </Head>
      <UpperNav/>
      <LoginModal/>
      <div className='pt-16'>
        <Header/>
        <About/>
        <Service initialServices={services}/>
        <EightcapProfile/>
        <HistoryGallery initialImages={historyImages} initialMonths={historyMonths}/>
        <SocialMedia/>
        <ContactUs/>
        <Testimonials paramReviews={reviews}/>
        <Disclaimer/>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const servicesRes = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/service`);
  const servicesData = await servicesRes.json();
  const services = servicesData.services;

  const historyImagesRes = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/history_image`);
  const historyImagesData = await historyImagesRes.json();
  const historyImages = historyImagesData.historyImages;
  let historyMonths = [];
  historyImages.forEach(rec => {
    historyMonths.push(rec.month);
  })

  const reviewsRes = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/review?` + new URLSearchParams({
                                    show: true
                                  }));
  const reviewsData = await reviewsRes.json();
  const reviews = reviewsData.reviews;

  return {
    props: {
      services,
      historyImages,
      historyMonths,
      reviews
    },
  };
}
