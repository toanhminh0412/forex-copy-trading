export function OutlineButton({color, style="", text, link="", target=""}) {
  if (link) {
    return (
      <a href={link} target={target} className={`text-${color} border hover:border-2 font-semilight hover:font-semibold border-${color} rounded-sm p-2 w-fit cursor-default ${style}`}>{text}</a>
    )
  } else {
    return (
      <span className={`text-${color} border hover:border-2 font-semilight hover:font-semibold border-${color} rounded-sm p-2 w-fit cursor-default ${style}`}>{text}</span>
    )
  }
}

export function TagButton({text="", style="", active=false, onClick}) {
  return (
    <span className={`${active ? 'bg-slate-300 hover:bg-slate-400' : 'bg-slate-200 hover:bg-slate-300'} duration-100 rounded-xl cursor-default text-md md:text-lg px-2 md:px-4 py-2 ${style}`} onClick={onClick}>{text}</span>
  )
}