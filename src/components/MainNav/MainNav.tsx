import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../Firebase';
import SignOutPrompt from '../SignOutPrompt/SignOutPrompt';
import SendFish from '../SendFish/SendFish';

import './MainNav.css';

function MainNav(props: any) {
  const { userObject, setUserObjectFunc, fillProfileArray } = props;
  const [signOutPrompt, setSignOutPrompt] = useState(false);
  const [sendFish, setSendFish] = useState(false);

  return (
    <div className="main-nav-container">
      {signOutPrompt ? (
        <SignOutPrompt setSignOutPrompt={setSignOutPrompt} />
      ) : null}
      {sendFish ? (
        <SendFish
          userObject={userObject}
          isHome={false}
          setUserObjectFunc={setUserObjectFunc}
          fillProfileArray={fillProfileArray}
          setSendFish={setSendFish}
        />
      ) : null}
      <nav className="main-nav">
        <Link to="/home">
          <i className="fas fa-fish orange-hover" />
        </Link>
        <Link to="/home">
          <i className="fas fa-home" style={{ color: 'black' }} />
        </Link>
        <Link to={auth.currentUser ? `/${userObject.username}` : '/login'}>
          <i className="fas fa-user-circle" style={{ color: 'black' }} />
        </Link>

        <i
          className="fas fa-feather-alt orange-hover"
          role="button"
          tabIndex={0}
          onKeyDown={() => setSendFish(true)}
          onClick={() => setSendFish(true)}
          aria-label="Send Fish"
        />

        <i
          role="button"
          tabIndex={0}
          className="fas fa-sign-out-alt"
          onKeyDown={() => setSignOutPrompt(true)}
          onClick={() => setSignOutPrompt(true)}
          aria-label="Sign out"
        />
      </nav>
    </div>
  );
}

export default MainNav;
