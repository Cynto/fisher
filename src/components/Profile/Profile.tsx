import React, { useEffect, useState } from 'react';
import { Route, useParams, Routes } from 'react-router-dom';
import './Profile.css';
import TopProfile from '../TopProfile/TopProfile';
import InfoProfile from '../InfoProfile/InfoProfile';

import ProfileNav from '../ProfileNav/ProfileNav';
import ProfileFish from '../ProfileFish/ProfileFish';
import ProfileLikes from '../ProfileLikes/ProfileLikes';
import EditProfile from '../EditProfile/EditProfile';
import ProfileDoesntExist from '../ProfileDoesntExist/ProfileDoesntExist';
import BigProfilePic from '../BigProfilePic/BigProfilePic';
import BigBanner from '../BigBanner/BigBanner';
import ProfileFishAndReplies from '../ProfileFishAndReplies/ProfileFishAndReplies';
import ProfileMedia from '../ProfileMedia/ProfileMedia';

const Profile = (props: any) => {
  const {
    // eslint-disable-next-line no-unused-vars
    profileArray,
    setProfileArray,
    userObject,
    setUserObjectFunc,
    fillProfileArray,
  } = props;
  const [profile, setProfile] = useState({ username: '', uid: '' });
  const [profileIsSet, setProfileIsSet] = useState(false);
  const [profileDoesExist, setProfileDoesExist] = useState(true);

  const { username } = useParams() as { username: string };

  const fillProfile = () => {
    const indexOfProfile = profileArray.findIndex(
      (element: any) => element.usernameLower === username.toLowerCase(),
    );

    if (indexOfProfile !== -1) {
      setProfile(profileArray[indexOfProfile]);
      setProfileIsSet(true);
      setProfileDoesExist(true);
    } else if (profileArray.length > 0) {
      setProfileDoesExist(false);
    }
  };

  useEffect(() => {
    fillProfile();
  }, [profileArray]);
  useEffect(() => {
    fillProfile();
  }, [username]);

  if (profileIsSet) {
    return (
      <div className="total-profile-page">
        <div className="profile-page">
          <div className="profile-inner">
            <TopProfile profile={profile} />
            <InfoProfile profile={profile} setProfileArray={setProfileArray} />
            <ProfileNav profile={profile} />
            <Routes>
              <Route
                path="/"
                element={
                  <ProfileFish
                    setUserObjectFunc={setUserObjectFunc}
                    userObject={userObject}
                    profile={profile}
                    fillProfileArray={fillProfileArray}
                    profileArray={profileArray}
                  />
                }
              />

              <Route
                path="/likes"
                element={
                  <ProfileLikes
                    setUserObjectFunc={setUserObjectFunc}
                    userObject={userObject}
                    profile={profile}
                    fillProfileArray={fillProfileArray}
                    profileArray={profileArray}
                  />
                }
              />
              {userObject.uid === profile.uid ? (
                <Route
                  path="/with_replies"
                  element={
                    <ProfileFishAndReplies
                      setUserObjectFunc={setUserObjectFunc}
                      userObject={userObject}
                      profile={profile}
                      fillProfileArray={fillProfileArray}
                      profileArray={profileArray}
                    />
                  }
                />
              ) : null}

              <Route
                path="/media"
                element={
                  <ProfileMedia
                    setUserObjectFunc={setUserObjectFunc}
                    userObject={userObject}
                    profile={profile}
                    fillProfileArray={fillProfileArray}
                    profileArray={profileArray}
                  />
                }
              />

              <Route
                path="/photo"
                element={<BigProfilePic profile={profile} />}
              />

              <Route path="/banner" element={<BigBanner profile={profile} />} />

              <Route
                path="/edit_profile"
                element={
                  <EditProfile
                    profileArray={profileArray}
                    setProfileArray={setProfileArray}
                    profile={profile}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    );
  }
  if (!profileDoesExist) {
    return <ProfileDoesntExist />;
  }
  return (
    <div className="total-profile-page">
      <div className="profile-page">
        <div className="profile-inner" />
      </div>
    </div>
  );
};

export default Profile;
