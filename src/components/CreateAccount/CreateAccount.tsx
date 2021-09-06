import React, { useRef, useState } from 'react';
import './CreateAccount.css';
import { auth, db } from '../../Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { useHistory } from 'react-router-dom';

function CreateAccount(props: any) {
  const nameRef = useRef(document.createElement('input'));
  const emailRef = useRef(document.createElement('input'));
  const passwordRef = useRef(document.createElement('input'));
  const confirmPasswordRef = useRef(document.createElement('input'));

  const [emailInUse, setEmailInUse] = useState(false);
  const [differentPassword, setDifferentPassword] = useState(false);

  const handleCreateAccount = () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    setDifferentPassword(false)
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential.user);
          const user = userCredential.user;
          const time = Timestamp.now();
          setDoc(doc(db, 'users', user.uid), {
            name,
            email,
            uid: user.uid,
            createdAt: time,
          });
          history.push('/');
        })
        .catch((error) => {
          console.log(error);
          if (error.code === 'auth/email-already-in-use') {
            setEmailInUse(true);
          }
        });
    } else {
      setDifferentPassword(true);
      const confirmPasswordInput: any = document.getElementById('confirm-password');
      confirmPasswordInput.value = '';
    }
  };
  let history = useHistory();
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
        {emailInUse ? (
          <h3 style={{ color: 'orange' }}>Error: Email already in use!</h3>
        ) : null}
        {differentPassword ? (
          <h3 style={{ color: 'orange' }}>Error: Passwords didn't match!</h3>
        ) : null}
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="group">
            <div className="input-container">
              <input ref={nameRef} type="text" required></input>
              <label>Name</label>
            </div>
          </div>
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
          <div className="group">
            <div className="input-container">
              <input
                id="confirm-password"
                ref={confirmPasswordRef}
                type="password"
                required
              ></input>
              <label>Confirm Password</label>
            </div>
          </div>

          <button
            className="login-button"
            type="submit"
            onClick={() => {
              handleCreateAccount();
            }}
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;
