import Image from 'next/image';
import { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';

export function LightBox({src, opened=false, closeFunc}) {
  return (
    <div className={opened ? '' : 'hidden'}>
      <div className="fixed top-0 left-0 w-screen h-screen z-40 bg-black opacity-70"></div>
      <div className="fixed inset-0 w-72 h-128 lg:w-96 lg:h-[44rem] m-auto z-50">
        <Image src={src} alt="Stock graph" fill/>
      </div>
      <RxCross1 size={35} className="text-white hover:text-slate-200 fixed top-10 md:top-20 right-10 md:right-32 z-50" onClick={closeFunc}/>
    </div>
  )
}

export function GalleryImage({src, onClick = () => {}, style, selectedMode=false}) {
  const [selected, setSelected] = useState(false);
  
  if (selectedMode) {
    return (
      <div className={`relative border hover:border-2 border-black ${style}`} onClick={() => {setSelected(!selected); onClick();}}>
        <div className={`absolute z-30 bg-black w-full h-full top-0 left-0 opacity-50 ${selected ? "" : "hidden"}`}></div>
        <p className={`absolute inset-0 m-auto h-fit text-white z-40 text-center text-xl font-semibold ${selected ? "" : "hidden"}`}>Selected</p>
        <Image src={src} alt="Stock graph" fill/>
      </div>
    )
  } else {
    return (
      <div className={`relative border hover:border-2 border-black ${style}`} onClick={onClick}>
        <Image src={src} alt="Stock graph" fill/>
      </div>
    )
  }
}