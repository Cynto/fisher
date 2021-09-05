import React, {useRef} from 'react';
import './CreateAccount.css';
import { auth } from '../../Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function CreateAccount(props: any) {
  const emailRef = useRef(document.createElement('input'))
  const passwordRef = useRef(document.createElement('input'))
  const handleCreateAccount = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    createUserWithEmailAndPassword(auth, email, password)
  }
  const { setHasAccount } = props;
  return (
    <div className="create-account-container">
      <button
        className="close-create-account"
        onClick={() => setHasAccount(true)}
      >
        X
      </button>
      <i className="fas fa-fish"></i>
      <div className="create-account-content-container">
        <h2>Create your account</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="group">
            <div className="input-container">
              <input ref={emailRef} type="email" required></input>
              <label>Email</label>
            </div>
          </div>
          <div className="group">
            <div className="input-container">
              <input ref={passwordRef} type="password" required></input>
              <label>Password</label>
            </div>
          </div>

          <button className="login-button" type="submit" onClick={handleCreateAccount}>
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;
