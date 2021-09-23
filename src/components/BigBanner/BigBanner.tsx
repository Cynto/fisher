import React from 'react';
import { useHistory } from 'react-router-dom';
import './BigBanner.css';

function BigBanner(props: any) {
  const { profile } = props;
  const history = useHistory();
  return (
    <div role="link" tabIndex={0} className="absolute-background-div" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(0, 0, 0, 0.9)'}} onKeyDown={() => history.push(`/${profile.username}`)} onClick={() => history.push(`/${profile.username}`)}>
      <div className="big-banner-container">
        <img
          className="big-banner"
          src={profile.bannerPic}
          alt="profile"
        />
      </div>
    </div>
  );
}

export default BigBanner;
