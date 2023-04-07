import { useState } from "react"
import { Testimonials } from "./Sections"

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

export function TestimonialForm() {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [content, setContent] = useState('');

  const updateName = e => {
    setName(e.target.value);
  }

  const updateCountry = e => {
    setCountry(e.target.value);
  }

  const updateContent = e => {
    setContent(e.target.value);
  }

  const postReview = e => {
    e.preventDefault();
    console.log('Post a review')
  }

  return (
    <form className="p-6 border border-slate-200 shadow-md rounded-sm w-full" onSubmit={postReview}>
      <h1 className="text-2xl lg:text-3xl">Enjoy our service? Leave us a review!</h1>
      <div className="mt-4 lg:mt-8">
        <input type="text" value={name} placeholder="Your name" className="input input-bordered w-full" required onChange={updateName}/>
      </div>
      <div className="mt-1 lg:mt-2">
        <input type="text" value={country} placeholder="Which country are you from?" className="input input-bordered w-full" required onChange={updateCountry}/>
      </div>
      <div className="mt-1 lg:mt-2">
        <textarea className="textarea textarea-bordered w-full" value={content} rows="6" placeholder="What do you think about our service?" required onChange={updateContent}></textarea>
      </div>
      <button className="btn bg-violet-700 border-violet-700 hover:bg-violet-900 hover:border-violet-900 w-full text-lg">Submit</button>
    </form>
  )
}