import React, { useEffect, useState } from 'react';
import { Route, useParams } from 'react-router-dom';
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

function Profile(props: any) {
  const {
    // eslint-disable-next-line no-unused-vars
    profileArray,
    setProfileArray,
    userObject,
    setUserObjectFunc,
    fillProfileArray,
  } = props;
  const [profile, setProfile] = useState({ username: '' });
  const [profileIsSet, setProfileIsSet] = useState(false);
  const [profileDoesExist, setProfileDoesExist] = useState(true);

  const { username } = useParams<{ username: string }>();

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

  if (profileIsSet) {
    return (
      <div className="total-profile-page">
        <div className="profile-page">
          <div className="profile-inner">
            <TopProfile profile={profile} />
            <InfoProfile profile={profile} setProfileArray={setProfileArray} />
            <ProfileNav profile={profile} />
            <Route exact path="/:username">
              <ProfileFish
                setUserObjectFunc={setUserObjectFunc}
                userObject={userObject}
                profile={profile}
                fillProfileArray={fillProfileArray}
                profileArray={profileArray}
              />
            </Route>
            <Route exact path="/:username/likes">
              <ProfileLikes
                setUserObjectFunc={setUserObjectFunc}
                userObject={userObject}
                profile={profile}
                fillProfileArray={fillProfileArray}
                profileArray={profileArray}
              />
            </Route>
            <Route path="/:username/with_replies">
              <ProfileFishAndReplies
                setUserObjectFunc={setUserObjectFunc}
                userObject={userObject}
                profile={profile}
                fillProfileArray={fillProfileArray}
                profileArray={profileArray}
              />
            </Route>
            <Route path="/:username/media">
              <ProfileMedia
                setUserObjectFunc={setUserObjectFunc}
                userObject={userObject}
                profile={profile}
                fillProfileArray={fillProfileArray}
                profileArray={profileArray}
              />
            </Route>
            <Route path="/:username/photo">
              <BigProfilePic profile={profile} />
            </Route>
            <Route path="/:username/banner">
              <BigBanner profile={profile} />
            </Route>
            {userObject.username === profile.username ? (
              <Route path="/:username/edit_profile">
                <EditProfile
                  profileArray={profileArray}
                  setProfileArray={setProfileArray}
                  profile={profile}
                />
              </Route>
            ) : null}
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
}

export default Profile;
