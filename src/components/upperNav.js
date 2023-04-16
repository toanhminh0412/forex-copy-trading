import { useState, useEffect } from "react";
import Link from 'next/link'
import {BiMenu} from "react-icons/bi";

export default function UpperNav({active="home"}) {
  const [smMenuOpened, setSmMenuOpened] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false)
  const [loadLogout, setLoadLogout] = useState(false);

  useEffect(() => {
    setLoggedIn(window.localStorage.getItem('forexUserId') !== null);
  }, [])

  const logout = () => {
    setLoadLogout(true);
    const userId = window.localStorage.getItem('forexUserId');
    fetch('api/authenticate?' + new URLSearchParams({
      userId: userId ? userId : '',
      logOut: true,
    }))
    .then(res => res.json())
    .then(data => {
      setLoadLogout(false);
      console.log(data);
      if (data.success === "true") {
        window.localStorage.removeItem('forexUserId');
        window.location.href = "/";
      }
    })
  }
  
  return (
    <div className="bg-gradient-to-r from-violet-500 to-violet-900 shadow-lg fixed z-30 w-screen">
      <div className="px-2 py-3 lg:px-20 flex flex-row justify-between">
        <h1 className="text-white text-xl lg:text-3xl font-medium">ForexCopyTrade</h1>
        <div className="hidden lg:flex lg:flex-row">
          {loggedIn === true ? <Link href="/dashboard" className={`text-white ${active === "dashboard" ? 'font-normal hover:font-semibold' : 'font-light hover:font-normal'} text-lg lg:text-xl my-auto mx-4`}>Dashboard</Link> : <div></div>}
          <Link href="/" className={`text-white ${active === "home" ? 'font-normal hover:font-semibold' : 'font-light hover:font-normal'} text-lg lg:text-xl my-auto mx-4`}>Home</Link>
          <Link href="/about" className={`text-white ${active === "about" ? 'font-normal hover:font-semibold' : 'font-light hover:font-normal'} text-lg lg:text-xl my-auto mx-4`}>About</Link>
          <Link href="/services" className={`text-white ${active === "services" ? 'font-normal hover:font-semibold' : 'font-light hover:font-normal'} text-lg lg:text-xl my-auto mx-4`}>Services</Link>
          <Link href="/contact-us" className={`text-white ${active === "contact-us" ? 'font-normal hover:font-semibold' : 'font-light hover:font-normal'} text-lg lg:text-xl my-auto mx-4`}>Contact us</Link>
          {loggedIn === false ? <label htmlFor="login-modal" className="btn btn-primary text-white font-light hover:font-normal text-lg lg:text-xl my-auto mx-4">Login</label>:
          <button className={`${loadLogout === true ? 'loading' : ''} btn btn-primary text-white font-light hover:font-normal text-lg lg:text-xl my-auto mx-4`} onClick={logout}>Logout</button>}
        </div>
        <BiMenu size={30} className={`${smMenuOpened ? 'text-violet-200': 'text-white'} hover:text-violet-200 font-normal text-2xl my-auto lg:hidden`} onClick={() => {setSmMenuOpened(!smMenuOpened)}}/>
      </div>
      <div className="relative">
        <SmMenu opened={smMenuOpened} active={active} loggedIn={loggedIn} logOutFunc={logout} loadLogout={loadLogout}></SmMenu>
      </div>
    </div>
  );
}

function SmMenu({opened=false, active="home", loggedIn=false, logOutFunc, loadLogout=false}) {
  if (opened) {
    return (
      <div className="bg-violet-500 lg:hidden fixed top-14 left-0 z-40 w-screen">
        {loggedIn === true ? (
          <div className="py-2 border-b border-violet-700">
            <Link href="/dashboard" className={`text-white ${active === "dashboard" ? 'font-normal hover:font-semibold' : 'font-light hover:font-normal'} text-lg lg:text-xl mx-4`}>Dashboard</Link>
          </div>
        ) : <div></div>}
        <div className="py-2 border-b border-violet-700">
          <Link href="/" className={`text-white ${active === "home" ? 'font-normal hover:font-semibold' : 'font-light hover:font-normal'} text-lg lg:text-xl mx-4`}>Home</Link>
        </div>
        <div className="py-2 border-b border-violet-700">
          <Link href="/about" className={`text-white ${active === "about" ? 'font-normal hover:font-semibold' : 'font-light hover:font-normal'} text-lg lg:text-xl mx-4`}>About</Link>
        </div>
        <div className="py-2 border-b border-violet-700">
          <Link href="/services" className={`text-white ${active === "services" ? 'font-normal hover:font-semibold' : 'font-light hover:font-normal'} text-lg lg:text-xl mx-4`}>Services</Link>
        </div>
        <div className="py-2 border-b border-violet-700">
          <Link href="/contact-us" className={`text-white ${active === "contact-us" ? 'font-normal hover:font-semibold' : 'font-light hover:font-normal'} text-lg lg:text-xl mx-4`}>Contact us</Link>
        </div>
        {loggedIn === false ? (
          <div className="py-2 border-b border-violet-700">
            <label htmlFor="login-modal" className="btn btn-primary text-white font-light hover:font-normal text-lg lg:text-xl my-auto mx-4">Login</label>
          </div>
        ) : (
          <div className="py-2 border-b border-violet-700">
            <button className={`${loadLogout === true ? 'loading' : ''} btn btn-primary text-white font-light hover:font-normal text-lg lg:text-xl my-auto mx-4`} onClick={logOutFunc}>Logout</button>
          </div>
        )}
      </div>
    )
  }
  return (<div></div>);
}