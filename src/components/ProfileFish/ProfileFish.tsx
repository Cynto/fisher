import React from 'react';

import './ProfileFish.css';
import ProfileFishStats from '../ProfileFishStats/ProfileFishStats';

function ProfileFish(props: any) {
  const { profile, userObject, setUserObjectFunc } = props;

  

  
  return (
    <div className="all-fish-container">
      {profile.fish
        ? profile.fish.map((item: any) => (
            <div className="total-single-fish-container" key={item.id}>
              {item.refish ? (
                <div className="refish-container">
                  <i className="fas fa-retweet" />
                  <p>{`${profile.name} Refished`}</p>{' '}
                </div>
              ) : null}

              <div className="single-fish-container">
                <div className="profile-pic-fish-container">
                  <img
                    src={item.profilePic}
                    className="profile-pic-fish"
                    alt="profile"
                  />
                </div>
                <div className="right-fish-container">
                  <div className="name-date-container">
                    <h4>{item.name}</h4>
                    <p>@{item.username}</p>
                  </div>
                  <div className="fish-text-container">
                    <p>{item.fishText}</p>
                  </div>
                  <ProfileFishStats
                    item={item}
                    userObject={userObject}
                    setUserObjectFunc={setUserObjectFunc}
                  />
                </div>
              </div>
            </div>
          ))
        : null}
    </div>
  );
}

export default ProfileFish;
