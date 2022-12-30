import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BigBanner.css';

const BigBanner = (props: any) => {
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
        background: 'rgba(0, 0, 0, 0.9)',
      }}
      onKeyDown={() => navigate(`/${profile.username}`)}
      onClick={() => navigate(`/${profile.username}`)}
    >
      <div className="big-banner-container">
        <img className="big-banner" src={profile.bannerPic} alt="profile" />
      </div>
    </div>
  );
};

export default BigBanner;
