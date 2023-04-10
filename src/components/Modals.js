import { useState } from "react";
import { DangerAlert } from "./Alerts";

export function LoginModal() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const updateUsername = e => {
    setUsername(e.target.value);
  }

  const updatePassword = e => {
    setPassword(e.target.value)
  }

  const login = e => {
    e.preventDefault();

    if (username === process.env.NEXT_PUBLIC_USERNAME && password === process.env.NEXT_PUBLIC_PASSWORD) {
      window.localStorage.setItem('forex_trade_login', true)
      window.location.href = '/';
      return
    }

    setErrorMessage("Username or password is incorrect. Please try again.")
  }

  return (
    <div>
      <input type="checkbox" id="login-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-xl lg:text-2xl">Login as admin</h3>
          {errorMessage === '' ? (<div></div>) : <DangerAlert heading="Login failed!" message={errorMessage} style="mt-6"/>}
          <form className="mt-6" onSubmit={login}>
            <input type="text" value={username} placeholder="Username" className="input input-bordered w-full" required onChange={updateUsername}/>
            <input type="password" value={password} placeholder="password" className="input input-bordered w-full mt-2" required onChange={updatePassword}/>
            <div className="modal-action">
              <label htmlFor="login-modal" className="btn btn-error text-white hover:bg-red-700">Cancel</label>
              <input type="submit" className="btn" value="Login"/>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}