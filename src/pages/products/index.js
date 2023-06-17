import { Header, Products } from '@/components/Sections';
import Head from 'next/head';
import UpperNav from '@/components/upperNav';
import { LoginModal } from '@/components/Modals';


export default function ProductsPage() {
    return(
        <>
          <Head>
            <title>Products</title>
          </Head>
          <UpperNav active="products"/>
          <LoginModal/>
          <div className='pt-12 lg:pt-16'>
              <Header/>
              <Products/>
          </div>
        </>
    )
}