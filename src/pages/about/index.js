import UpperNav from '@/components/upperNav'
import { Header, About } from '@/components/Sections';

export default function AboutPage() {
  return(
    <>
      <UpperNav active="about"/>
      <Header/>
      <About/>
    </>
  )
}