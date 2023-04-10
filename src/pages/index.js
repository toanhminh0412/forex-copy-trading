import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import UpperNav from '@/components/upperNav'
import { Header, About, Disclaimer, Service, EightcapProfile, HistoryGallery, SocialMedia, ContactUs, Testimonials } from '@/components/Sections'
import { LoginModal } from '@/components/Modals';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <UpperNav/>
    <LoginModal/>
    <div className='pt-12 lg:pt-16'>
      <Header/>
      <About/>
      <Disclaimer/>
      <Service/>
      <EightcapProfile/>
      <HistoryGallery/>
      <SocialMedia/>
      <ContactUs/>
      <Testimonials/>
    </div>
    </>
  )
}
