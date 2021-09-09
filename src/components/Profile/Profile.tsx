import React from 'react';
import './Profile.css';
import { auth } from '../../Firebase';
import TopProfile from '../TopProfile/TopProfile';
import InfoProfile from '../InfoProfile/InfoProfile';

function Profile(props: any) {
  const { profile } = props;
  console.log(profile);
  console.log(auth.currentUser);
  return (
    <div className="profile-page">
      <div className="profile-inner">
        <TopProfile profile={profile} />
        <InfoProfile profile={profile} />
      </div>
    </div>
  );
}

export default Profile;
