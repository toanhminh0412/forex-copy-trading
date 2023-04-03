import UpperNav from '@/components/upperNav'
import { Header, ContactUs } from '@/components/Sections';

export default function ContactUsPage() {
  return(
    <>
      <UpperNav active="contact-us"/>
      <Header/>
      <ContactUs/>
    </>
  )
}