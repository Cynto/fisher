import React, { useRef, useState } from 'react';
import './CreateAccount.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {
  doc,
  setDoc,
  Timestamp,
  query,
  where,
  getDocs,
  collection,
} from 'firebase/firestore';
import { useHistory } from 'react-router-dom';
import { auth, db } from '../../Firebase';

function CreateAccount(props: any) {
  const nameRef = useRef(document.createElement('input'));
  const usernameRef = useRef(document.createElement('input'));
  const emailRef = useRef(document.createElement('input'));
  const passwordRef = useRef(document.createElement('input'));
  const confirmPasswordRef = useRef(document.createElement('input'));

  const [emailInUse, setEmailInUse] = useState(false);
  const [differentPassword, setDifferentPassword] = useState(false);
  const [usernameTaken, setUsernameTaken] = useState(false);

  const history = useHistory();

  const handleCreateAccount = async () => {
    const name = nameRef.current.value;
    const username = usernameRef.current.value;
    const usernameLower = username.toLowerCase();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    let taken = false;
    const q = query(
      collection(db, 'users'),
      where('usernameLower', '==', usernameLower),
    );
    const querySnapshot = await getDocs(q);
    // eslint-disable-next-line no-unused-vars
    querySnapshot.forEach((snap) => {
      taken = true;
    });
    setDifferentPassword(false);
    if (!taken) {
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const { user } = userCredential;
            const time = Timestamp.now();

            setDoc(doc(db, 'users', user.uid), {
              name,
              username,
              usernameLower,
              email,
              followers: [],
              following: [],
              fish: [],
              likes: [],
              profilePic:
                'https://firebasestorage.googleapis.com/v0/b/fisher-d459b.appspot.com/o/images%2Fdefault-profile-pic.jpg?alt=media&token=fb5374e5-67e3-4720-8951-6d8e665fd1d5',
              bannerPic:
                'https://firebasestorage.googleapis.com/v0/b/fisher-d459b.appspot.com/o/images%2Fdefault-banner-pic.jpg?alt=media&token=6dfc6e88-ee01-40a2-9462-c628ee15c83a',
              uid: user.uid,
              createdAt: time,
            });
            history.push('/');
          })
          .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
              setEmailInUse(true);
            }
          });
      } else {
        setDifferentPassword(true);
        const confirmPasswordInput: any =
          document.getElementById('confirm-password');
        confirmPasswordInput.value = '';
      }
    } else {
      setUsernameTaken(true);
    }
  };

  const { setHasAccount } = props;
  return (
    <div className="create-account-container">
      <button
        className="close-create-account"
        onClick={() => setHasAccount(true)}
        type="button"
      >
        X
      </button>
      <i className="fas fa-fish" />
      <div className="create-account-content-container">
        <h2>Create your account</h2>
        {emailInUse ? (
          <h3 style={{ color: 'orange' }}>Error: Email already in use!</h3>
        ) : null}
        {differentPassword ? (
          <h3 style={{ color: 'orange' }}>
            Error: Passwords didn&apos;t match!
          </h3>
        ) : null}
        {usernameTaken ? (
          <h3 style={{ color: 'orange' }}>Error: Username taken!</h3>
        ) : null}
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="group">
            <div className="input-container">
              <label htmlFor="create-name">
                <input
                  className="login-input"
                  id="create-name"
                  ref={nameRef}
                  type="text"
                  required
                />
                <div className="border-div" />
                <p>Name</p>
              </label>
            </div>
          </div>
          <div className="group">
            <div className="input-container">
              <label htmlFor="create-username">
                {' '}
                <input
                  className="login-input"
                  id="create-username"
                  ref={usernameRef}
                  type="text"
                  required
                />
                <div className="border-div" />
                <p>Username</p>
              </label>
            </div>
          </div>
          <div className="group">
            <div className="input-container">
              <label htmlFor="create-email">
                <input
                  className="login-input"
                  id="create-email"
                  ref={emailRef}
                  type="email"
                  required
                />
                <div className="border-div" />
                <p>Email</p>
              </label>
            </div>
          </div>
          <div className="group">
            <div className="input-container">
              <label htmlFor="create-password">
                <input
                  className="login-input"
                  id="create-password"
                  ref={passwordRef}
                  type="password"
                  required
                />
                <div className="border-div" />
                <p>Password</p>
              </label>
            </div>
          </div>
          <div className="group">
            <div className="input-container">
              <label htmlFor="confirm-password">
                <input
                  className="login-input"
                  id="confirm-password"
                  ref={confirmPasswordRef}
                  type="password"
                  required
                />
                <div className="border-div" />
                <p>Confirm Password</p>
              </label>
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
