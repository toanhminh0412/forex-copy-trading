import { useState } from "react"
import { Testimonials } from "./Sections"
import { SuccessAlert, DangerAlert } from "./Alerts"

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

export function TestimonialForm({style=""}) {
  const [firstName, setFirstName] = useState('');
  const [lastInitial, setLastInitial] = useState('');
  const [country, setCountry] = useState('');
  const [content, setContent] = useState('');
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const updateFirstName = e => {
    setFirstName(e.target.value);
  }

  const updateLastInitial = e => {
    setLastInitial(e.target.value);
  }

  const updateCountry = e => {
    setCountry(e.target.value);
  }

  const updateContent = e => {
    setContent(e.target.value);
  }

  const postReview = e => {
    e.preventDefault();
    setDisableSubmit(true);
    console.log(firstName);
    console.log(lastInitial);
    console.log(country);
    console.log(content);
    fetch('/api/review', {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastInitial: lastInitial,
        country: country,
        content: content
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.success) {
        setSuccessMessage("We have received your review and will view it soon. Thank you!")
      } else {
        setDisableSubmit(false);
        setErrorMessage("Failed to submit the review. Please contact us at realfxcopier@gmail.com for support!")
      }
    })
  }

  return (
    <form className={`p-6 border border-slate-200 shadow-md rounded-sm w-full ${style}`} onSubmit={postReview}>
      <h1 className="text-2xl lg:text-3xl">Enjoy our service? Leave us a review!</h1>
      {successMessage !== '' ? <SuccessAlert heading="Success!" message={successMessage} style="mt-4 mb-2"/> : <div></div>}
      {errorMessage !== '' ? <DangerAlert heading="Failed!" message={errorMessage} style="mt-4 mb-2"/> : <div></div>}
      <div className="mt-4 lg:mt-8 flex flex-row justify-between">
        <input type="text" value={firstName} placeholder="First name" className="input input-bordered w-[49%]" required onChange={updateFirstName}/>
        <input type="text" value={lastInitial} placeholder="Last initial" maxLength={1} className="input input-bordered w-[49%]" required onChange={updateLastInitial}/>
      </div>
      <div className="mt-1 lg:mt-2">
        <input type="text" value={country} placeholder="Which country are you from?" className="input input-bordered w-full" required onChange={updateCountry}/>
      </div>
      <div className="mt-1 lg:mt-2">
        <textarea className="textarea textarea-bordered w-full" value={content} rows="6" placeholder="What do you think about our service?" required onChange={updateContent}></textarea>
      </div>
      <button className={`btn ${disableSubmit === true ? 'btn-disabled' : ''} bg-violet-700 border-violet-700 hover:bg-violet-900 hover:border-violet-900 w-full text-lg`}>Submit</button>
    </form>
  )
}