import { useState } from 'react';
import UpperNav from '@/components/upperNav'
import { Header, About, Disclaimer, Service, EightcapProfile, HistoryGallery, SocialMedia, ContactUs, Testimonials } from '@/components/Sections';
import { LoginModal } from '@/components/Modals';
import {BiMenu} from "react-icons/bi";

export default function DashboardPage() {
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
  const [activeItem, setActiveItem] = useState('header')

  return (
    <div>
      <div className="drawer drawer-mobile h-fit">
        <input id="side-menu" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content relative lg:ml-80">
          <label htmlFor="side-menu" className="btn btn-primary rounded-full w-16 h-16 drawer-button lg:hidden fixed bottom-4 left-4 z-40"><BiMenu className='text-3xl'/></label>
          {activeItem === 'header' ? <HeaderEditSection/> : <div></div>}
          {activeItem === 'about-me' ? <AboutMeEditSection/> : <div></div>}
          {activeItem === 'disclaimer' ? <DisclaimerEditSection/> : <div></div>}
          {activeItem === 'services' ? <ServicesEditSection/> : <div></div>}
          {activeItem === 'eightcap-profile' ? <EightcapProfileEditSection/> : <div></div>}
          {activeItem === 'history-gallery' ? <HistoryGalleryEditSection/> : <div></div>}
          {activeItem === 'social-medias' ? <SocialMediasEditSection/> : <div></div>}
          {activeItem === 'contact-us' ? <ContactUsEditSection/> : <div></div>}
          {activeItem === 'testimonials' ? <TestimonialsEditSection/> : <div></div>}
        </div>
        <div className="drawer-side h-screen shadow-md rounded-md border border-slate-200 lg:fixed">
          <label htmlFor="side-menu" className="drawer-overlay"></label> 
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            <li className="menu-title"><h1 className="font-semibold text-xl text-black">Sections</h1></li>
            <li className='mt-2 ml-2 text-lg' onClick={() => {setActiveItem('header')}}><a className={`${activeItem === 'header' ? 'active': ''}`}>Header</a></li>
            <li className='ml-2 text-lg' onClick={() => {setActiveItem('about-me')}}><a className={`${activeItem === 'about-me' ? 'active': ''}`}>About me</a></li>
            <li className='ml-2 text-lg' onClick={() => {setActiveItem('disclaimer')}}><a className={`${activeItem === 'disclaimer' ? 'active': ''}`}>Disclaimer</a></li>
            <li className='ml-2 text-lg' onClick={() => {setActiveItem('services')}}><a className={`${activeItem === 'services' ? 'active': ''}`}>Services</a></li>
            <li className='ml-2 text-lg' onClick={() => {setActiveItem('eightcap-profile')}}><a className={`${activeItem === 'eightcap-profile' ? 'active': ''}`}>Eightcap profile</a></li>
            <li className='ml-2 text-lg' onClick={() => {setActiveItem('history-gallery')}}><a className={`${activeItem === 'history-gallery' ? 'active': ''}`}>History gallery</a></li>
            <li className='ml-2 text-lg' onClick={() => {setActiveItem('social-medias')}}><a className={`${activeItem === 'social-medias' ? 'active': ''}`}>SocialMedias</a></li>
            <li className='ml-2 text-lg' onClick={() => {setActiveItem('contact-us')}}><a className={`${activeItem === 'contact-us' ? 'active': ''}`}>Contact us</a></li>
            <li className='ml-2 text-lg' onClick={() => {setActiveItem('testimonials')}}><a className={`${activeItem === 'testimonials' ? 'active': ''}`}>Testimonials</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function HeaderEditSection() {
  return (
    <div>
      <Header/>
      <form className="my-2 mx-auto p-6 border border-slate-200 shadow-md rounded-md w-[98%]">
        <h1 className="text-2xl lg:text-3xl">Edit <span className="font-bold">header</span></h1>
        <div className="mt-2">
          <label className="label">
            <span className="label-text">Heading</span>
          </label>
          <input type="text" placeholder="Header heading (e.g. company name)" className="input input-bordered w-full" />
        </div>
        <div className="mt-2">
          <label className="label">
            <span className="label-text">Short summary</span>
          </label>
          <textarea className="textarea textarea-bordered w-full" rows="3" placeholder="Short description of your service/website"></textarea>
        </div>
        <button className="btn btn-primary w-full text-md mt-2">Submit</button>
      </form>
    </div>
  )
}

function AboutMeEditSection() {
  return (
    <div>
      <About/>
      <form className="my-2 mx-auto p-6 border border-slate-200 shadow-md rounded-md w-[98%]">
        <h1 className="text-2xl lg:text-3xl">Edit <span className="font-bold">About</span> section</h1>
        <div className="mt-2">
          <label className="label">
            <span className="label-text">Page heading</span>
          </label>
          <input type="text" placeholder="Page heading (e.g. About me)" className="input input-bordered w-full" />
        </div>
        <div className="mt-2">
          <label className="label">
            <span className="label-text">Paragraph 1 heading</span>
          </label>
          <input type="text" placeholder="(e.g. Who am I?)" className="input input-bordered w-full" />
        </div>
        <div className="mt-2">
          <label className="label">
            <span className="label-text">Paragraph 1 content</span>
          </label>
          <textarea className="textarea textarea-bordered w-full" rows="3" placeholder="(e.g. Short description of yourself)"></textarea>
        </div>
        <div className="mt-2">
          <label className="label">
            <span className="label-text">Paragraph 2 heading</span>
          </label>
          <input type="text" placeholder="(e.g. Mission statement)" className="input input-bordered w-full" />
        </div>
        <div className="mt-2">
          <label className="label">
            <span className="label-text">Paragraph 2 content</span>
          </label>
          <textarea className="textarea textarea-bordered w-full" rows="3" placeholder="(e.g. Summary of mission statement)"></textarea>
        </div>
        <button className="btn btn-primary w-full text-md mt-2">Submit</button>
      </form>
    </div>
  ) 
}

function DisclaimerEditSection() {
    return (
        <div>
        <Disclaimer/>
        <form className="my-2 mx-auto p-6 border border-slate-200 shadow-md rounded-md w-[98%]">
        <h1 className="text-2xl lg:text-3xl">Edit <span className="font-bold">Disclaimer</span> section</h1>
            <div className="mt-2">
            <label className="label">
                <span className="label-text">Heading</span>
            </label>
            <input type="text" placeholder="e.g. Risk exposure" className="input input-bordered w-full" />
            </div>
            <div className="mt-2">
            <label className="label">
                <span className="label-text">Short summary</span>
            </label>
            <textarea className="textarea textarea-bordered w-full" rows="3" placeholder="Short summary of disclaimer"></textarea>
            </div>
            <button className="btn btn-primary w-full text-md mt-2">Submit</button>
        </form>
        </div>
    )
}

function ServicesEditSection() {
    return (
        <div>
        <Service/>
        <form className="my-2 mx-auto p-6 border border-slate-200 shadow-md rounded-md w-[98%]">
            <h1 className="text-2xl lg:text-3xl">Edit <span className="font-bold">header</span></h1>
            <div className="mt-2">
            <label className="label">
                <span className="label-text">Heading</span>
            </label>
            <input type="text" placeholder="Header heading (e.g. company name)" className="input input-bordered w-full" />
            </div>
            <div className="mt-2">
            <label className="label">
                <span className="label-text">Short summary</span>
            </label>
            <textarea className="textarea textarea-bordered w-full" rows="3" placeholder="Short description of your service/website"></textarea>
            </div>
            <button className="btn btn-primary w-full text-md mt-2">Submit</button>
        </form>
        </div>
    )
}

function EightcapProfileEditSection() {
    return (
        <div>
        <EightcapProfile/>
        <form className="my-2 mx-auto p-6 border border-slate-200 shadow-md rounded-md w-[98%]">
            <h1 className="text-2xl lg:text-3xl">Edit <span className="font-bold">header</span></h1>
            <div className="mt-2">
            <label className="label">
                <span className="label-text">Heading</span>
            </label>
            <input type="text" placeholder="Header heading (e.g. company name)" className="input input-bordered w-full" />
            </div>
            <div className="mt-2">
            <label className="label">
                <span className="label-text">Short summary</span>
            </label>
            <textarea className="textarea textarea-bordered w-full" rows="3" placeholder="Short description of your service/website"></textarea>
            </div>
            <button className="btn btn-primary w-full text-md mt-2">Submit</button>
        </form>
        </div>
    )
}

function HistoryGalleryEditSection() {
    return (
        <div>
        <HistoryGallery/>
        <form className="my-2 mx-auto p-6 border border-slate-200 shadow-md rounded-md w-[98%]">
            <h1 className="text-2xl lg:text-3xl">Edit <span className="font-bold">header</span></h1>
            <div className="mt-2">
            <label className="label">
                <span className="label-text">Heading</span>
            </label>
            <input type="text" placeholder="Header heading (e.g. company name)" className="input input-bordered w-full" />
            </div>
            <div className="mt-2">
            <label className="label">
                <span className="label-text">Short summary</span>
            </label>
            <textarea className="textarea textarea-bordered w-full" rows="3" placeholder="Short description of your service/website"></textarea>
            </div>
            <button className="btn btn-primary w-full text-md mt-2">Submit</button>
        </form>
        </div>
    )
}

function SocialMediasEditSection() {
    return (
        <div>
        <SocialMedia/>
        <form className="my-2 mx-auto p-6 border border-slate-200 shadow-md rounded-md w-[98%]">
            <h1 className="text-2xl lg:text-3xl">Edit <span className="font-bold">header</span></h1>
            <div className="mt-2">
            <label className="label">
                <span className="label-text">Heading</span>
            </label>
            <input type="text" placeholder="Header heading (e.g. company name)" className="input input-bordered w-full" />
            </div>
            <div className="mt-2">
            <label className="label">
                <span className="label-text">Short summary</span>
            </label>
            <textarea className="textarea textarea-bordered w-full" rows="3" placeholder="Short description of your service/website"></textarea>
            </div>
            <button className="btn btn-primary w-full text-md mt-2">Submit</button>
        </form>
        </div>
    )
}

function ContactUsEditSection() {
    return (
        <div>
        <ContactUs/>
        <form className="my-2 mx-auto p-6 border border-slate-200 shadow-md rounded-md w-[98%]">
            <h1 className="text-2xl lg:text-3xl">Edit <span className="font-bold">header</span></h1>
            <div className="mt-2">
            <label className="label">
                <span className="label-text">Heading</span>
            </label>
            <input type="text" placeholder="Header heading (e.g. company name)" className="input input-bordered w-full" />
            </div>
            <div className="mt-2">
            <label className="label">
                <span className="label-text">Short summary</span>
            </label>
            <textarea className="textarea textarea-bordered w-full" rows="3" placeholder="Short description of your service/website"></textarea>
            </div>
            <button className="btn btn-primary w-full text-md mt-2">Submit</button>
        </form>
        </div>
    )
}

function TestimonialsEditSection() {
    return (
        <div>
        <Testimonials/>
        <form className="my-2 mx-auto p-6 border border-slate-200 shadow-md rounded-md w-[98%]">
            <h1 className="text-2xl lg:text-3xl">Edit <span className="font-bold">header</span></h1>
            <div className="mt-2">
            <label className="label">
                <span className="label-text">Heading</span>
            </label>
            <input type="text" placeholder="Header heading (e.g. company name)" className="input input-bordered w-full" />
            </div>
            <div className="mt-2">
            <label className="label">
                <span className="label-text">Short summary</span>
            </label>
            <textarea className="textarea textarea-bordered w-full" rows="3" placeholder="Short description of your service/website"></textarea>
            </div>
            <button className="btn btn-primary w-full text-md mt-2">Submit</button>
        </form>
        </div>
    )
}