import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BigProfilePic.css';

const BigProfilePic = (props: any) => {
  const { profile } = props;
  const navigate = useNavigate();
  return (
    <div
      role="link"
      tabIndex={0}
      className="absolute-background-div"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(38, 30, 29, 0.9)',
      }}
      onKeyDown={() => navigate(`/${profile.username}`)}
      onClick={() => navigate(`/${profile.username}`)}
    >
      <div className="big-profile-pic-container">
        <img
          className="big-profile-pic"
          src={profile.profilePic}
          alt="profile"
        />
      </div>
    </div>
  );
};

export default BigProfilePic;
