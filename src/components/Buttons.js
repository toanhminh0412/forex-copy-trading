import { BiLeftArrow, BiRightArrow } from "react-icons/bi"
import Link from 'next/link'


export function OutlineButton({color, style="", text, link="", target=""}) {
  if (link) {
    return (
      <Link href={link} target={target} className={`text-${color} border hover:border-2 font-semilight hover:font-semibold border-${color} rounded-sm p-2 w-fit cursor-default ${style}`}>{text}</Link>
    )
  } else {
    return (
      <span className={`text-${color} border hover:border-2 font-semilight hover:font-semibold border-${color} rounded-sm p-2 w-fit cursor-default ${style}`}>{text}</span>
    )
  }
}

export function TagButton({text="", style="", active=false, onClick}) {
  return (
    <span className={`${active ? 'bg-slate-300 hover:bg-slate-400 shadow-inner' : 'bg-slate-200 hover:bg-slate-300'} inline-block duration-100 rounded-xl cursor-default text-md md:text-lg px-2 md:px-4 py-2 whitespace-nowrap ${style}`} onClick={onClick}>{text}</span>
  )
}

export function CarouselButton({ side="left", style="", onClick}) {
  if (side === "left") {
    return (
      <BiLeftArrow className={`text-xl md:text-2xl absolute my-auto left-0 md:left-4 hover:text-slate-500 duration-100 ${style}`} onClick={onClick}/>
    )
  } else {
    return (
      <BiRightArrow className={`text-xl md:text-2xl absolute my-auto right-0 md:right-4 hover:text-slate-500 duration-100 ${style}`} onClick={onClick}/>
    )
  }
}