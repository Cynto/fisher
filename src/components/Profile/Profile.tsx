import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import './Profile.css';
import { auth } from '../../Firebase';
import TopProfile from '../TopProfile/TopProfile';
import InfoProfile from '../InfoProfile/InfoProfile';
import EditProfile from '../EditProfile/EditProfile';
import ProfileNav from '../ProfileNav/ProfileNav';
import ProfileFish from '../ProfileFish/ProfileFish';

function Profile(props: any) {
  const { profile, profileArray, setProfileArray } = props;
  console.log(profile);
  console.log(auth.currentUser);
  const [editProfile, setEditProfile] = useState(false);
  return (
    <div className="total-profile-page">
      {editProfile ? (
        <EditProfile
          profileArray={profileArray}
          setProfileArray={setProfileArray}
          profile={profile}
          setEditProfile={setEditProfile}
        />
      ) : null}
      <div
        style={
          editProfile
            ? { backgroundColor: 'rgba(0, 0, 0, 0.4)', minHeight: '125vh' }
            : { backgroundColor: 'white', minHeight: '100vh' }
        }
        className="profile-page"
      >
        <div className="profile-inner">
          <TopProfile profile={profile} />
          <InfoProfile profile={profile} setEditProfile={setEditProfile} setProfileArray={setProfileArray}/>
          <ProfileNav profile={profile} />
          <Route exact path={`/${profile.username}`}>
            <ProfileFish profile={profile}/>
          </Route>
        </div>
      </div>
    </div>
  );
}

export default Profile;
