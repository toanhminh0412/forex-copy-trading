import { useState, useEffect } from 'react';
import UpperNav from '@/components/upperNav'
import { Header, About, Disclaimer, Service, EightcapProfile, HistoryGallery, SocialMedia, ContactUs, Testimonials } from '@/components/Sections';
import { LoginModal } from '@/components/Modals';
import { ReviewCard } from '@/components/Cards';
import {BiMenu} from "react-icons/bi";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    const userId = window.localStorage.getItem('forexUserId');

    if (userId === null) {
      window.location.href ='/';
      return;
    }
    
    fetch('api/authenticate?' + new URLSearchParams({
      userId: userId
    }))
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (!data.active) {
        window.localStorage.removeItem('forexUserId');
        window.location.href = '/';
      } else if (!data.isAdmin) {
        setLoading(false);
        setUnauthorized(true);
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

  if (unauthorized) {
    return (
      <div>
        <h1 className='font-semibold text-3xl'>403</h1>
        <p>User is unauthorized to access this page</p>
      </div>
    )
  }

  return(
    <>
      <UpperNav active="dashboard"/>
      <LoginModal/>
      <div className='pt-14 lg:pt-16'>
        <DashboardMainContent/>
      </div>
    </>
  )
}

function DashboardMainContent() {
  const [activeItem, setActiveItem] = useState('testimonials')

  return (
    <div>
      <div className="drawer drawer-mobile h-fit">
        <input id="side-menu" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content relative lg:ml-80">
          <label htmlFor="side-menu" className="btn btn-primary rounded-full w-16 h-16 drawer-button lg:hidden fixed bottom-4 left-4 z-40"><BiMenu className='text-3xl'/></label>
          {activeItem === 'services' ? <ServicesEditSection/> : <div></div>}
          {activeItem === 'history-gallery' ? <HistoryGalleryEditSection/> : <div></div>}
          {activeItem === 'testimonials' ? <TestimonialsEditSection/> : <div></div>}
        </div>
        <div className="drawer-side h-screen shadow-md rounded-md border border-slate-200 lg:fixed">
          <label htmlFor="side-menu" className="drawer-overlay"></label> 
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            <li className="menu-title"><h1 className="font-semibold text-xl text-black">Sections</h1></li>
            <li className='ml-2 text-lg' onClick={() => {setActiveItem('services')}}><a className={`${activeItem === 'services' ? 'active': ''}`}>Services</a></li>
            <li className='ml-2 text-lg' onClick={() => {setActiveItem('history-gallery')}}><a className={`${activeItem === 'history-gallery' ? 'active': ''}`}>History gallery</a></li>
            <li className='ml-2 text-lg' onClick={() => {setActiveItem('testimonials')}}><a className={`${activeItem === 'testimonials' ? 'active': ''}`}>Testimonials</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function ServicesEditSection() {
    return (
      <Service edit/>
    )
}

function HistoryGalleryEditSection() {
  const [openedTab, setOpenedTab] = useState(0);

  return (
    <div>
      {/* <div className="tabs mt-4 w-fit">
        <a className={`tab tab-lg tab-lifted ${openedTab === 0 ? 'tab-active': ''}`} onClick={() => {setOpenedTab(0)}}>Edit</a> 
        <a className={`tab tab-lg tab-lifted ${openedTab === 1 ? 'tab-active': ''}`} onClick={() => {setOpenedTab(1)}}>Preview</a> 
      </div> */}
      <HistoryGallery edit/>
      {/* <HistoryGallery style={`${openedTab !== 1 ? 'hidden': ''}`}/> */}
    </div>
  )
}

function TestimonialsEditSection() {
    const [openedTab, setOpenedTab] = useState(0);
    const [reviews, setReviews] = useState(undefined);

    useEffect(() => {
      if (reviews === undefined) {
        // Get all reviews
        fetch('/api/review')
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data.reviews) {
            setReviews(data.reviews);
          }
        })
      }
    }, []);

    const updateReviewComment = (reviewId, comment) => {
      let newReviews = reviews;
      for (let i=0; i<newReviews.length; i++) {
        if (newReviews[i]._id == reviewId) {
          newReviews[i].comment = comment;
          break;
        }
      }
      setReviews(newReviews);
    }

    const toggleReview = (reviewId) => {
      let newReviews = reviews;
      for (let i=0; i<newReviews.length; i++) {
        if (newReviews[i]._id == reviewId) {
          newReviews[i].show = !newReviews[i].show;
          break;
        }
      }
      setReviews(newReviews);
      console.log(reviews);
    }

    if (reviews === undefined) {
      return (
        <div>Loading...</div>
      )
    } else {
      return (
        <div>
        {/* <div className="tabs mt-4">
          <a className={`tab tab-lg tab-lifted ${openedTab === 0 ? 'tab-active': ''}`} onClick={() => {setOpenedTab(0)}}>Reviews</a> 
          <a className={`tab tab-lg tab-lifted ${openedTab === 1 ? 'tab-active': ''}`} onClick={() => {setOpenedTab(1)}}>Preview</a> 
        </div> */}

        <div className="flex flex-row flex-wrap p-4">
          {reviews.map(review => <ReviewCard key={review._id} id={review._id} firstName={review.firstName} lastInitial={review.lastInitial} country={review.country} content={review.content} comment={review.comment} show={review.show} updateReviewComment={(id, comment) => updateReviewComment(id, comment)} toggleReview={id => toggleReview(id)}/>)}
        </div>

        {/* <div className={`${openedTab === 1 ? '' : 'hidden'}`}>
        <Testimonials paramReviews={reviews}/>
        </div> */}
        </div>
      )
    }
}