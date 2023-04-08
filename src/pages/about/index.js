import UpperNav from '@/components/upperNav'
import { Header, About } from '@/components/Sections';
import { LoginModal } from '@/components/Modals';

export default function AboutPage() {
  return(
    <>
      <UpperNav active="about"/>
      <LoginModal/>
      <Header/>
      <About/>
    </>
  )
}