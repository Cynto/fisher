import React from 'react';
import { useParams } from 'react-router-dom';
import './ProfileDoesntExist.css';

const ProfileDoesntExist = () => {
  const { username } = useParams() as { username: string };

  return (
    <div className="total-profile-page">
      <div className="profile-page">
        <div className="profile-inner">
          <div className="profile-top-container">
            <div className="profile-top">
              <div className="top-button-container">
                <a href="/home">
                  <button type="button">
                    <i className="fas fa-arrow-left" />
                  </button>
                </a>
              </div>
              <div className="name-fish">
                <h3>Profile</h3>
              </div>
            </div>
            <img
              className="profile-banner"
              src="https://firebasestorage.googleapis.com/v0/b/fisher-d459b.appspot.com/o/images%2Forange-banner.jpeg?alt=media&token=f3a27c90-6308-4ecd-91be-362c270d8b03"
              alt="profile banner"
            />
          </div>
          <div className="profile-info-container">
            <div className="left-info-container">
              <div className="profile-pic-container">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/fisher-d459b.appspot.com/o/images%2Fwhite-background.jpg?alt=media&token=39606350-f42c-4b73-8a68-eb83d2bc1cc5"
                  alt="profile-pic"
                />
              </div>
              <div className="name-username-container">
                <h3>@{username}</h3>
              </div>
            </div>
          </div>
          <div className="does-not-exist-container">
            <h1>This account doesn&apos;t exist</h1>
            <p>Try searching for another</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDoesntExist;
