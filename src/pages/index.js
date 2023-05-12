import { Inter } from 'next/font/google';
import Head from 'next/head';
import styles from '@/styles/Home.module.css';


import UpperNav from '@/components/upperNav'
import { Header, About, Disclaimer, Service, EightcapProfile, HistoryGallery, SocialMedia, ContactUs, Testimonials } from '@/components/Sections'
import { LoginModal } from '@/components/Modals';

const inter = Inter({ subsets: ['latin'] })

export default function Home({services}) {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="robots" content="all" key="robots-all"></meta>
        <meta name="google" content="all" key="google-all"/>
        <meta name="google" content="notranslate" key="notranslate"/>
        <link rel="canonical" href="https://forexcopytrade.ca" key="home-canonical"/>
      </Head>
      <UpperNav/>
      <LoginModal/>
      <div className='pt-16'>
        <Header/>
        <About/>
        <Service initialServices={services}/>
        <EightcapProfile/>
        <HistoryGallery/>
        <SocialMedia/>
        <ContactUs/>
        <Testimonials/>
        <Disclaimer/>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/service");
  const data = await res.json();
  const services = data.services;

  return {
    props: {
      services,
    },
  };
}
