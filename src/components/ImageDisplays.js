import Image from 'next/image';
import { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';

export function LightBox({src, opened=false, closeFunc}) {
  return (
    <div className={opened ? '' : 'hidden'}>
      <div className="fixed top-0 left-0 w-screen h-screen z-40 bg-black opacity-70"></div>
      <div className="fixed inset-0 w-72 h-128 m-auto z-50">
        <Image src={src} alt="Stock graph" fill/>
      </div>
      <RxCross1 size={35} className="text-white hover:text-slate-200 fixed top-10 md:top-20 right-10 md:right-32 z-50" onClick={closeFunc}/>
    </div>
  )
}