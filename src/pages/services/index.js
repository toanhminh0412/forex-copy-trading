import UpperNav from '@/components/upperNav'
import { Header, Service } from '@/components/Sections';
import { LoginModal } from '@/components/Modals';

export default function ServicePage() {
  return(
    <>
      <UpperNav active="services"/>
      <LoginModal/>
      <div className='pt-12 lg:pt-16'>
        <Header/>
        <Service/>
      </div>
    </>
  )
}