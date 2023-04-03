import { useState } from "react";
import {BiMenu} from "react-icons/bi";

export default function UpperNav() {
  const [smMenuOpened, setSmMenuOpened] = useState(false);
  
  return (
    <div className="bg-violet-700 shadow-lg">
      <div className="px-2 py-3 lg:px-20 flex flex-row justify-between">
        <h1 className="text-white text-xl lg:text-3xl font-medium">ForexCopyTrade</h1>
        <div className="hidden lg:flex lg:flex-row">
          <a href="#" className="text-white font-light hover:font-normal text-lg lg:text-xl my-auto mx-4">Home</a>
          <a href="#" className="text-white font-light hover:font-normal text-lg lg:text-xl my-auto mx-4">About</a>
          <a href="#" className="text-white font-light hover:font-normal text-lg lg:text-xl my-auto mx-4">Services</a>
          <a href="#" className="text-white font-light hover:font-normal text-lg lg:text-xl my-auto mx-4">Contact us</a>
        </div>
        <BiMenu size={30} className={`${smMenuOpened ? 'text-violet-200': 'text-white'} hover:text-violet-200 font-normal text-2xl my-auto lg:hidden`} onClick={() => {setSmMenuOpened(!smMenuOpened)}}/>
      </div>
      <div className="relative">
        <SmMenu opened={smMenuOpened}></SmMenu>
      </div>
    </div>
  );
}

function SmMenu({opened=false}) {
  if (opened) {
    return (
      <div className="bg-violet-500 lg:hidden fixed top-14 left-0 z-40 w-screen">
        <div className="py-2 border-b border-violet-700">
          <a href="#" className="text-white font-light hover:font-normal text-lg lg:text-xl mx-4">Home</a>
        </div>
        <div className="py-2 border-b border-violet-700">
          <a href="#" className="text-white font-light hover:font-normal text-lg lg:text-xl mx-4">About</a>
        </div>
        <div className="py-2 border-b border-violet-700">
          <a href="#" className="text-white font-light hover:font-normal text-lg lg:text-xl mx-4">Services</a>
        </div>
        <div className="py-2 border-b border-violet-700">
          <a href="#" className="text-white font-light hover:font-normal text-lg lg:text-xl mx-4">Contact us</a>
        </div>
      </div>
    )
  }
  return (<div></div>);
}