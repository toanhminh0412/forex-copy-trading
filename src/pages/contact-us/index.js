import UpperNav from '@/components/upperNav'
import { Header, ContactUs } from '@/components/Sections';
import { LoginModal } from '@/components/Modals';

export default function ContactUsPage() {
  return(
    <>
      <UpperNav active="contact-us"/>
      <LoginModal/>
      <Header/>
      <ContactUs/>
    </>
  )
}