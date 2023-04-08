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
    <Header/>
    <About/>
    <Disclaimer/>
    <Service/>
    <EightcapProfile/>
    <HistoryGallery/>
    <SocialMedia/>
    <ContactUs/>
    <Testimonials/>
    </>
  )
}
