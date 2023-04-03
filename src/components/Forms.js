export function Input({type="text", text="", placeholder="", required=false, style=""}) {
  if (type === "submit") {
    return (
      <input type="submit" value={text} className={`py-3 rounded-sm bg-slate-200 hover:bg-slate-300 border border-slate-100 shadow-md font-semibold text-xl ${style}`}></input>
    )
  }
  return (
    <input type={type} placeholder={placeholder} className={`px-4 py-2 text-lg rounded-sm border border-slate-100 w-fit h-fit ${style}`} required={required}></input>
  )
}

export function Textarea({rows="4", cols="10", placeholder="", required=false, style=""}) {
    return (
      <textarea placeholder={placeholder} rows={rows} cols={cols} className={`px-4 py-2 text-lg rounded-sm border border-slate-100 ${style}`} required={required}></textarea>
    )
  }