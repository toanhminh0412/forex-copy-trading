import { useState } from "react";
import Link from 'next/link'
import {BiMenu} from "react-icons/bi";

export default function UpperNav({active="home"}) {
  const [smMenuOpened, setSmMenuOpened] = useState(false);
  
  return (
    <div className="bg-gradient-to-r from-violet-500 to-violet-900 shadow-lg fixed z-30 w-screen">
      <div className="px-2 py-3 lg:px-20 flex flex-row justify-between">
        <h1 className="text-white text-xl lg:text-3xl font-medium">ForexCopyTrade</h1>
        <div className="hidden lg:flex lg:flex-row">
          <Link href="/" className={`text-white ${active === "home" ? 'font-normal hover:font-semibold' : 'font-light hover:font-normal'} text-lg lg:text-xl my-auto mx-4`}>Home</Link>
          <Link href="/about" className={`text-white ${active === "about" ? 'font-normal hover:font-semibold' : 'font-light hover:font-normal'} text-lg lg:text-xl my-auto mx-4`}>About</Link>
          <Link href="/services" className={`text-white ${active === "services" ? 'font-normal hover:font-semibold' : 'font-light hover:font-normal'} text-lg lg:text-xl my-auto mx-4`}>Services</Link>
          <Link href="/contact-us" className={`text-white ${active === "contact-us" ? 'font-normal hover:font-semibold' : 'font-light hover:font-normal'} text-lg lg:text-xl my-auto mx-4`}>Contact us</Link>
        </div>
        <BiMenu size={30} className={`${smMenuOpened ? 'text-violet-200': 'text-white'} hover:text-violet-200 font-normal text-2xl my-auto lg:hidden`} onClick={() => {setSmMenuOpened(!smMenuOpened)}}/>
      </div>
      <div className="relative">
        <SmMenu opened={smMenuOpened} active={active}></SmMenu>
      </div>
    </div>
  );
}

function SmMenu({opened=false, active="home"}) {
  if (opened) {
    return (
      <div className="bg-violet-500 lg:hidden fixed top-14 left-0 z-40 w-screen">
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
      </div>
    )
  }
  return (<div></div>);
}