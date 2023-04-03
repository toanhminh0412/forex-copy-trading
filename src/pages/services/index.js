import UpperNav from '@/components/upperNav'
import { Header, Service } from '@/components/Sections';

export default function ServicePage() {
  return(
    <>
      <UpperNav active="services"/>
      <Header/>
      <Service/>
    </>
  )
}