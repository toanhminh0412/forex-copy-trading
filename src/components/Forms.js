export function Input({type="text", text="", placeholder="", required=false, style="", value="", onChange, disabled=false}) {
  if (type === "submit") {
    return (
      <input type="submit" value={text} className={`py-3 rounded-sm bg-slate-200 ${disabled===false ? 'hover:bg-slate-300' : ''} border border-slate-100 shadow-md font-semibold text-xl ${style}`} disabled={disabled===true}></input>
    )
  }
  return (
    <input type={type} value={value} onChange={onChange} placeholder={placeholder} className={`px-4 py-2 text-lg rounded-sm border border-slate-100 w-fit h-fit ${style}`} required={required}></input>
  )
}

export function Textarea({rows="4", cols="10", placeholder="", required=false, style="", value="", onChange}) {
    return (
      <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows} cols={cols} className={`px-4 py-2 text-lg rounded-sm border border-slate-100 ${style}`} required={required}></textarea>
    )
  }