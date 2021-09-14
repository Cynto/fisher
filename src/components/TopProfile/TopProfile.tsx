import React from 'react';
import { Link } from 'react-router-dom';
import './TopProfile.css';

function TopProfile(props: any) {
  const { profile } = props;
  return (
    <div className="profile-top-container">
      <div className="profile-top">
        <div className="top-button-container">
          <Link to="/home">
            <button type="button">
              <i className="fas fa-arrow-left" />
            </button>
          </Link>
        </div>

        <div className="name-fish">
          <h3>{profile.name}</h3>
          <p>{profile.fish.length} Fish</p>
        </div>
      </div>
      <img
        className="profile-banner"
        src={profile.bannerPic}
        alt="profile-banner"
      />
    </div>
  );
}

export default TopProfile;
