import React from 'react';
import { Link } from 'react-router-dom';
import './TopProfile.css';

function TopProfile(props: any) {
  const { profile } = props;
  return (
    <div>
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
          <p>0 Fish</p>
        </div>
      </div>
      <img
        className="profile-banner"
        src="https://www.bannerbatterien.com/upload/filecache/Banner-Batterien-Windrder2-web_06b2d8d686e91925353ddf153da5d939.webp"
        alt="profile-banner"
      />
    </div>
  );
}

export default TopProfile;
