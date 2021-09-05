import React, {useState} from 'react';
import './Login.css';
import { auth } from '../../Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import CreateAccount from '../CreateAccount/CreateAccount';

function Login() {
  const [hasAccount, setHasAccount] = useState(true)
  return (
    <div className="login-page">
      {!hasAccount ? <CreateAccount setHasAccount={setHasAccount}/> : null}
      <div className="login-content-container">
        <i className="fas fa-fish"></i>
        
        <h1>Log in to Fisher</h1>
        <form>
          <div className="group">
            <div className="input-container">
              <input type="email" required></input>
              <label>Email</label>
            </div>
          </div>
          <div className="group">
            <div className="input-container">
              <input type="password" required></input>
              <label>Password</label>
            </div>
          </div>
          
          <button className="login-button" type="submit">Log In</button>
        </form>
        <div className="no-account">
          No account?
          <span onClick={() => setHasAccount(false)}>Sign up for Fisher</span>
        </div>
      </div>
    </div>
  );
}

export default Login;
