export function DisplayCase({children, style=""}) {
  return (
    <div className={`flex flex-row flex-wrap ${style}`}>
      {children}
    </div>
  )
}

export function Card({header="", children, style="", highlighted=false}) {
  return (
    <div className={`bg-white w-full md:w-45% xl:w-30% mt-8 rounded-md ${highlighted ? 'shadow-xl border border-black' : 'shadow-md border border-slate-200'} ${style}`}>
      {header !== "" ?
      <div className="text-center font-semibold text-2xl border-b border-slate-200 py-2">
        {header}
      </div>
      : <div></div>}
      <div>
      <div className="p-4">
        {children}
      </div>
      </div>
    </div>
  )
}