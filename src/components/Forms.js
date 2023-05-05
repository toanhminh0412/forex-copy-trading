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

export function AccountForm({modalId=null, submitFun=()=>{}, accountId=undefined, accountUsername=undefined, accountAdmin=undefined, accountStatus=undefined, changePassword=false}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [admin, setAdmin] = useState(accountAdmin ? true : false);
  const [status, setStatus] = useState(accountStatus ? accountStatus : 'Active');
  const [currentPassword, setCurrentPassword] = useState("");

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const updateUsername = e => {
    setUsername(e.target.value);
  }

  const updatePassword = e => {
    setPassword(e.target.value);
  }

  const updateConfirmPassword = e => {
    setConfirmPassword(e.target.value);
  }

  const updateStatus = e => {
    setStatus(e.target.value);
  }

  const updateCurrentPassword = e => {
    setCurrentPassword(e.target.value);
  }

  const resetStates = () => {
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setAdmin(false);
    setStatus('Active');
    setCurrentPassword('');
  }

  const createAccount = e => {
    e.preventDefault();
    const newAccount = {
      username: username,
      password: password,
      isAdmin: admin,
      status: status
    }
    fetch('/api/authenticate', {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newAccount: newAccount
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        submitFun(data.accounts);
        resetStates();
        setSuccessMessage(data.message);
        setTimeout(() => {setSuccessMessage('')}, 5000);
      } else {
        setErrorMessage(data.message);
        setTimeout(() => {setErrorMessage('')}, 5000);
      }
    })
  }

  const editAccount = e => {
    e.preventDefault();
    console.log(admin);
    console.log(status);
    fetch('/api/authenticate', {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accountId: accountId,
        isAdmin: admin,
        status: status
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        submitFun(data.accounts);
        setSuccessMessage(data.message);
        setTimeout(() => {setSuccessMessage('')}, 5000);
      } else {
        setErrorMessage(data.message);
        setTimeout(() => {setErrorMessage('')}, 5000);
      }
    })
  }

  const changeAccountPassword = e => {
    e.preventDefault();
    const username = window.localStorage.getItem('forexUsername');
    if (username === undefined) {
      setErrorMessage("User isn't logged in. Therefore, can't change password");
      return;
    }
    fetch('/api/authenticate', {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        currentPassword: currentPassword,
        newPassword: password
      })
    })
    .then(res => res.json())
    .then(data => {
      resetStates();
      if (data.success) {
        setSuccessMessage(data.message);
        setTimeout(() => {setSuccessMessage('')}, 5000);
      } else {
        setErrorMessage(data.message);
        setTimeout(() => {setErrorMessage('')}, 5000);
      }
    })
  }

  if (changePassword) {
    return(
      <form onSubmit={changeAccountPassword} className="max-h-[70vh]">
        <h3 className="font-bold text-lg">Change password</h3>
        {successMessage !== "" ? <div className="alert alert-success my-2">{successMessage}</div> : <div></div>}
        {errorMessage !== "" ? <div className="alert alert-error my-2">{errorMessage}</div> : <div></div>}
        <div className='form-control mt-3'>
          <label>Current password:</label>
          <input type="password" className="input input-bordered w-full max-w-md" minLength="8" placeholder='Your current password' value={currentPassword} onChange={updateCurrentPassword}/>
        </div>
        <div className='form-control mt-3'>
          <label>Password:</label>
          <input type="password" className="input input-bordered w-full max-w-md" minLength="8" placeholder='New password' value={password} onChange={updatePassword}/>
        </div>
        <div className='form-control mt-3'>
          <label>Confirm password:</label>
          <input type="password" className="input input-bordered w-full max-w-md" minLength="8" placeholder='Confirm new password' value={confirmPassword} onChange={updateConfirmPassword}/>
          {password !== '' && password === confirmPassword ? <div className="font-light text-green-500 mt-1">Password match!</div> : <div></div>}
        </div>
        <div className="mt-3 w-fit ml-auto pb-4">
          {modalId !== null ? <label htmlFor={modalId} className="btn btn-error text-white">Close</label> : <div></div>}
          <input type="submit" className={`btn ${currentPassword !== '' && password !== '' && password !== '' && password === confirmPassword ? '' : 'btn-disabled'} ml-1`} value="Submit"></input>
        </div>
      </form>
    )
  } else if (accountId) {
    return(
      <form onSubmit={editAccount} className="max-h-[70vh]">
        <h3 className="font-bold text-lg">Edit account</h3>
        {successMessage !== "" ? <div className="alert alert-success my-2">{successMessage}</div> : <div></div>}
        {errorMessage !== "" ? <div className="alert alert-error my-2">{errorMessage}</div> : <div></div>}
        <div className='form-control mt-3'>
          <label>Username:</label>
          <input type="text" className="input input-bordered w-full max-w-md" value={accountUsername} readOnly/>
          <div className='font-light mt-1'>Read-only username</div>
        </div>
        <div className="form-control mt-3">
          <div className="flex flex-row">
            <input type="checkbox" className="checkbox" checked={admin} onChange={() => {setAdmin(!admin)}}/>
            <span className="ml-2">Admin</span>
          </div>
          <div className='font-light mt-1'>Check this box to make this account an admin account</div>
        </div>
        <div className='form-control mt-3'>
          <label>Status:</label>
          <select className="select select-bordered w-full max-w-md" onChange={updateStatus} defaultValue={status}>
            <option value="Active">Active</option>
            <option value="Dormant">Dormant</option>
          </select>
          <div className='font-light mt-1'>Activate/deactivate account</div>
        </div>
        <div className="mt-3 w-fit ml-auto pb-4">
          {modalId !== null ? <label htmlFor={modalId} className="btn btn-error text-white">Close</label> : <div></div>}
          <input type="submit" className={`btn ml-1`} value="Submit"></input>
        </div>
      </form>
    )
  } else {
    return (
      <form onSubmit={createAccount} className="max-h-[70vh]">
        <h3 className="font-bold text-lg">Create an account</h3>
        {successMessage !== "" ? <div className="alert alert-success my-2">{successMessage}</div> : <div></div>}
        {errorMessage !== "" ? <div className="alert alert-error my-2">{errorMessage}</div> : <div></div>}
        <div className='form-control mt-3'>
          <label>Username:</label>
          <input type="text" className="input input-bordered w-full max-w-md" placeholder='Username' value={username} onChange={updateUsername}/>
          <div className='font-light mt-1'>User can&apos;t change this later</div>
        </div>
        <div className='form-control mt-3'>
          <label>Password:</label>
          <input type="password" className="input input-bordered w-full max-w-md" minLength="8" placeholder='Password' value={password} onChange={updatePassword}/>
          <div className='font-light mt-1'>User can change this later</div>
        </div>
        <div className='form-control mt-3'>
          <label>Confirm password:</label>
          <input type="password" className="input input-bordered w-full max-w-md" minLength="8" placeholder='Confirm password' value={confirmPassword} onChange={updateConfirmPassword}/>
          {password !== '' && password === confirmPassword ? <div className="font-light text-green-500 mt-1">Password match!</div> : <div></div>}
        </div>
        <div className="form-control mt-3">
          <div className="flex flex-row">
            <input type="checkbox" className="checkbox" checked={admin} onChange={() => {setAdmin(!admin)}}/>
            <span className="ml-2">Admin</span>
          </div>
          <div className='font-light mt-1'>Check this box to make this account an admin account</div>
        </div>
        <div className='form-control mt-3'>
          <label>Status:</label>
          <select className="select select-bordered w-full max-w-md" onChange={updateStatus} defaultValue={status}>
            <option value="Active">Active</option>
            <option value="Dormant">Dormant</option>
          </select>
          <div className='font-light mt-1'>Activate/deactivate account</div>
        </div>
        <div className="mt-3 w-fit ml-auto pb-4">
          {modalId !== null ? <label htmlFor={modalId} className="btn btn-error text-white">Close</label> : <div></div>}
          <input type="submit" className={`btn ${username !== '' && password !== '' && password !== '' && password === confirmPassword ? '' : 'btn-disabled'} ml-1`} value="Submit"></input>
        </div>
      </form>
    )
  }
}