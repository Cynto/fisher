import React from 'react';
import { signOut } from 'firebase/auth';
import { useHistory } from 'react-router-dom';
import { auth } from '../../Firebase';

import './SignOutPrompt.css';

function SignOutPrompt(props: any) {
  const {setSignOutPrompt} = props;
  const history = useHistory();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        history.push('/login');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="absolute-background-div">
      <div className="sign-out-container">
        <h3>Are you sure you want to log out?</h3>
        <button
          type="button"
          className="prompt-log-out-button"
          onClick={handleSignOut}
        >
          Log out
        </button>
        <button type="button" className="prompt-cancel-button" onClick={() => setSignOutPrompt(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default SignOutPrompt;
