import Head from 'next/head';

import { useState, useEffect } from 'react';
import UpperNav from '@/components/upperNav'
import { Header, Members } from '@/components/Sections';
import { LoginModal } from '@/components/Modals';

export default function MembersPage() {
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const userId = window.localStorage.getItem('forexUserId');
      const username = window.localStorage.getItem('forexUsername');
  
      if (userId === null || username === null) {
        window.location.href ='/';
        return;
      }
      
      fetch('api/authenticate?' + new URLSearchParams({
        userId: userId
      }))
      .then(res => res.json())
      .then(data => {
        if (!data.active) {
          window.localStorage.removeItem('forexUserId');
          window.localStorage.removeItem('forexUsername');
          window.location.href = '/';
        } else {
          setLoading(false);
        }
      })
    }, [])
  
    if (loading) {
      return (
        <div>Loading...</div>
      )
    }

    return(
        <>
          <Head>
            <title>Members</title>
          </Head>
          <UpperNav active="about"/>
          <LoginModal/>
          <div className='pt-12 lg:pt-16'>
              <Header/>
              <Members/>
          </div>
        </>
    )
}