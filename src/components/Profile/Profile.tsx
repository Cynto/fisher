import React from 'react';
import { Route } from 'react-router-dom';
import './Profile.css';
import TopProfile from '../TopProfile/TopProfile';
import InfoProfile from '../InfoProfile/InfoProfile';

import ProfileNav from '../ProfileNav/ProfileNav';
import ProfileFish from '../ProfileFish/ProfileFish';

function Profile(props: any) {
  
  const {
    profile,
    // eslint-disable-next-line no-unused-vars
    profileArray,
    setProfileArray,
    userObject,
    setUserObjectFunc,
    fillProfileArray,
  } = props;

  return (
    <div className="total-profile-page">
      <div className="profile-page">
        <div className="profile-inner">
          <TopProfile profile={profile} />
          <InfoProfile profile={profile} setProfileArray={setProfileArray} />
          <ProfileNav profile={profile} />
          <Route exact path={`/${profile.username}`}>
            <ProfileFish
              setUserObjectFunc={setUserObjectFunc}
              userObject={userObject}
              profile={profile}
              fillProfileArray={fillProfileArray}
            />
          </Route>
        </div>
      </div>
    </div>
  );
}

export default Profile;
