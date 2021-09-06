import React, { useState, useRef } from 'react';
import './Login.css';
import { auth } from '../../Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import CreateAccount from '../CreateAccount/CreateAccount';
import { useHistory } from 'react-router-dom';

function Login() {
  const emailRef = useRef(document.createElement('input'));
  const passwordRef = useRef(document.createElement('input'));
  const [hasAccount, setHasAccount] = useState(true);
  const [userNotFound, setUserNotFound] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);

  let history = useHistory();
  const handleLogin = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    setUserNotFound(false);
    setWrongPassword(false);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        history.push('/');
      })
      .catch((error) => {
        console.log(error.code);
        if (error.code === 'auth/user-not-found') {
          setUserNotFound(true);
        }
        if (error.code === 'auth/wrong-password') {
          setWrongPassword(true);
          const passwordInput: any = document.getElementById('password-input');
          passwordInput.value = '';
        }
      });
  };
  return (
    <div
      className="login-page"
      style={
        !hasAccount
          ? { backgroundColor: 'rgba(0, 0, 0, 0.4)', minHeight: '125vh' }
          : { backgroundColor: 'white', minHeight: '100vh' }
      }
    >
      {!hasAccount ? <CreateAccount setHasAccount={setHasAccount} /> : null}

      <div className="login-content-container">
        <i className="fas fa-fish"></i>

        <h1>Log in to Fisher</h1>
        {userNotFound ? (
          <h3 style={{ color: 'orange' }}>
            Error: No account with this email exists!{' '}
          </h3>
        ) : null}
        {wrongPassword ? (
          <h3 style={{ color: 'orange' }}>Error: Incorrect Password! </h3>
        ) : null}
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="group">
            <div className="input-container">
              <input
                id="email-input"
                ref={emailRef}
                type="email"
                required
              ></input>
              <label>Email</label>
            </div>
          </div>
          <div className="group">
            <div className="input-container">
              <input
                id="password-input"
                ref={passwordRef}
                type="password"
                required
              ></input>
              <label>Password</label>
            </div>
          </div>

          <button className="login-button" type="submit" onClick={handleLogin}>
            Log In
          </button>
        </form>
        <div className="no-account">
          No account?
          <span
            onClick={() => {
              setHasAccount(false);
            }}
          >
            Sign up for Fisher
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
