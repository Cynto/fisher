import React, { useState, useRef } from 'react';
import './Login.css';
import { useHistory } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase';
import CreateAccount from '../CreateAccount/CreateAccount';

function Login() {
  const emailRef = useRef(document.createElement('input'));
  const passwordRef = useRef(document.createElement('input'));
  const [hasAccount, setHasAccount] = useState(true);
  const [userNotFound, setUserNotFound] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);

  const history = useHistory();
  const handleLogin = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    setUserNotFound(false);
    setWrongPassword(false);

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        history.push('/home');
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
          ? { backgroundColor: 'rgba(0, 0, 0, 0.4)', minHeight: '125vh', minWidth: '100vw' }
          : { backgroundColor: 'white', minHeight: '100vh' }
      }
    >
      {!hasAccount ? <CreateAccount setHasAccount={setHasAccount} /> : null}

      <div className="login-content-container">
        <i className="fas fa-fish" />

        <h1>Log in to Fisher</h1>
        {userNotFound ? (
          <h3 style={{ color: 'orange' }}>
            Error: No account with this email exists!
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
              <label htmlFor="email-input">
                <input className="login-input" id="email-input" ref={emailRef} type="email" required />
                <div className="border-div" />

                <p>Email</p>
              </label>
            </div>
          </div>
          <div className="group">
            <div className="input-container">
              <label htmlFor="password-input">
                <input
                  className="login-input"
                  id="password-input"
                  ref={passwordRef}
                  type="password"
                  required
                />
                <div className="border-div" />

                <p>Password</p>
              </label>
            </div>
          </div>

          <button className="login-button" type="submit" onClick={handleLogin}>
            Log In
          </button>
        </form>
        <div className="no-account">
          No account?
          <span
            key={1}
            onClick={() => {
              setHasAccount(false);
            }}
            onKeyDown={() => {
              setHasAccount(false);
            }}
            role="link"
            tabIndex={0}
          >
            Sign up for Fisher
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
