import { Header, Products, TradesInAction } from '@/components/Sections';
import Head from 'next/head';
import UpperNav from '@/components/upperNav';
import { LoginModal } from '@/components/Modals';


export default function ProductsPage() {
    return(
        <>
          <Head>
          <title>Products - Copy trades made by professionals</title>
        <link rel="canonical" href="https://forexcopytrade.ca/products" key="products-canonical"/>
        <meta property="og:title" content="ForexCopyTrade - Copy trades made by professionals" key="products-og-title"/>
        <meta
          property="og:description"
          content="We sell EA's and indicators that we use on a daily basis to make our profits. We professionals will do day trades 24/7 with great potential returns. Whatever we gain, you'll gain the same. This is an easy to make extra money on the side without having years of experience."
          key="products-og-description"
        />
        <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/forex-copier-trade.appspot.com/o/app_img%2Fstock-graph.jpg?alt=media&token=aa5ea75f-639a-4f29-9f4b-1b3825acfb8d"
          key="products-og-image"
        />
          </Head>
          <UpperNav active="products"/>
          <LoginModal/>
          <div className='pt-12 lg:pt-16'>
              <Header/>
              <Products/>
              <TradesInAction/>
          </div>
        </>
    )
}