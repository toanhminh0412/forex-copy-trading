import { useState, useEffect } from 'react';
import {BiMenu} from "react-icons/bi";
import {BsPenFill, BsTrashFill} from "react-icons/bs";

import UpperNav from '@/components/upperNav'
import { Header, About, Disclaimer, Service, EightcapProfile, HistoryGallery, SocialMedia, ContactUs, Testimonials } from '@/components/Sections';
import { LoginModal } from '@/components/Modals';
import { ReviewCard } from '@/components/Cards';
import { AccountForm } from '@/components/Forms';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);

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
  const [activeItem, setActiveItem] = useState('testimonials');

  return (
    <div>
      <div className="drawer drawer-mobile h-fit">
        <input id="side-menu" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content relative lg:ml-80">
          <label htmlFor="side-menu" className="btn btn-primary rounded-full w-16 h-16 drawer-button lg:hidden fixed bottom-4 left-4 z-40"><BiMenu className='text-3xl'/></label>
          {activeItem === 'services' ? <ServicesEditSection/> : <div></div>}
          {activeItem === 'history-gallery' ? <HistoryGalleryEditSection/> : <div></div>}
          {activeItem === 'testimonials' ? <TestimonialsEditSection/> : <div></div>}
          {activeItem === 'accounts' ? <AccountsManagementSection/> : <div></div>}
        </div>
        <div className="drawer-side h-screen shadow-md rounded-md border border-slate-200 lg:fixed">
          <label htmlFor="side-menu" className="drawer-overlay"></label> 
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            <li className="menu-title"><h1 className="font-semibold text-xl text-black">Sections</h1></li>
            <li className='ml-2 text-lg' onClick={() => {setActiveItem('services')}}><a className={`${activeItem === 'services' ? 'active': ''}`}>Services</a></li>
            <li className='ml-2 text-lg' onClick={() => {setActiveItem('history-gallery')}}><a className={`${activeItem === 'history-gallery' ? 'active': ''}`}>History gallery</a></li>
            <li className='ml-2 text-lg' onClick={() => {setActiveItem('testimonials')}}><a className={`${activeItem === 'testimonials' ? 'active': ''}`}>Testimonials</a></li>
            <li className="menu-title"><h1 className="font-semibold text-xl text-black">Users</h1></li>
            <li className='ml-2 text-lg' onClick={() => {setActiveItem('accounts')}}><a className={`${activeItem === 'accounts' ? 'active': ''}`}>Accounts</a></li>
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
      <HistoryGallery edit/>
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
    }

    if (reviews === undefined) {
      return (
        <div>Loading...</div>
      )
    } else {
      return (
        <div>
          <div className="flex flex-row flex-wrap p-4">
            {reviews.map(review => <ReviewCard key={review._id} id={review._id} firstName={review.firstName} lastInitial={review.lastInitial} country={review.country} content={review.content} comment={review.comment} show={review.show} updateReviewComment={(id, comment) => updateReviewComment(id, comment)} toggleReview={id => toggleReview(id)}/>)}
          </div>
        </div>
      )
    }
}

function AccountsManagementSection() {
  const [accounts, setAccounts ] = useState([]);

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch('/api/authenticate')
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setAccounts(data.accounts);
      } else {
        setErrorMessage(data.message);
        setTimeout(() => {setErrorMessage('')}, 5000);
      }
    })
  }, [])

  const updateAccounts = accounts => {
    setAccounts(accounts);
    // document.getElementById("create-account").checked = false;
  }

  const deleteAccount = accountId => {
    console.log(accountId);
    fetch('api/authenticate?' + new URLSearchParams({
      userId: accountId,
      deleteAccount: true
    }))
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        updateAccounts(data.accounts);
        setSuccessMessage(data.message);
        setTimeout(() => {setSuccessMessage('')}, 5000);
        document.getElementById(`delete-account-${accountId}`).checked = false;
      } else {
        setErrorMessage(data.message);
        setTimeout(() => {setErrorMessage('')}, 5000);
      }
    })
  }

  return (
    <div className='p-4'>
      <h1 className='font-semibold text-xl'>Accounts</h1>
      {/* The button to open modal */}
      <label htmlFor="create-account" className="btn mt-3">Create account</label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="create-account" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-fit min-w-[30rem] lg:min-w-[24rem] xl:min-w-[30rem]">
          <AccountForm modalId="create-account" submitFun={updateAccounts}/>
        </div>
      </div>

      {/* Display all accounts */}
      <div className="overflow-x-auto mt-3">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th></th>
              <th>Username</th>
              <th>Admin</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {accounts.map((account, index) => (
            <tr key={index}>
              <th>{index}</th>
              <td>{account.username}</td>
              <td>{account.isAdmin ? "Yes": "No"}</td>
              <td>{account.status}</td>
              <td className='flex flex-row h-full'>
                <br></br>
                <label htmlFor={`edit-account-${account._id}`} className='my-auto'><BsPenFill className="text-slate-300 hover:text-slate-500 duration-200"/></label>
                <label htmlFor={`delete-account-${account._id}`} className='my-auto'><BsTrashFill className="text-slate-300 hover:text-slate-500 duration-200 my-auto ml-2"/></label>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>

      {accounts.map((account => (
        <div key={account._id}>
          <input type="checkbox" id={`edit-account-${account._id}`} className="modal-toggle" />
          <div className="modal">
            <div className="modal-box w-fit min-w-[30rem] lg:min-w-[24rem] xl:min-w-[30rem]">
              <AccountForm modalId={`edit-account-${account._id}`} submitFun={updateAccounts} accountId={account._id} accountUsername={account.username} accountAdmin={account.isAdmin} accountStatus={account.status}/>
            </div>
          </div>
        </div>
      )))}

      {accounts.map((account => (
        <div key={account._id}>
          <input type="checkbox" id={`delete-account-${account._id}`} className="modal-toggle" />
          <div className="modal">
            <div className="modal-box w-fit min-w-[30rem] lg:min-w-[24rem] xl:min-w-[30rem]">
              <h3 className="font-bold text-lg">Delete an account</h3>
              <p>Are you sure you want to delete account with username <span className='font-semibold'>{account.username}</span>?</p>
              <div className='modal-action'>
                <label htmlFor={`delete-account-${account._id}`} className="btn btn-error text-white">No</label>
                <div className='btn' onClick={() => {deleteAccount(account._id)}}>Yes</div>
              </div>
            </div>
          </div>
        </div>
      )))}

      {successMessage !== '' ? <div className="toast z-40">
            <div className="alert alert-success">
              <div>
                <span>{successMessage}</span>
              </div>
            </div>
          </div> : null}
      {errorMessage !== '' ? <div className="toast z-40">
        <div className="alert alert-error">
          <div>
            <span>{errorMessage}</span>
          </div>
        </div>
      </div> : null}
    </div>
  )
}