import React from 'react';
import { useHistory } from 'react-router-dom';
import './BigProfilePic.css';

function BigProfilePic(props: any) {
  const { profile } = props;
  const history = useHistory();
  return (
    <div role="link" tabIndex={0} className="absolute-background-div" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(38, 30, 29, 0.9)'}} onKeyDown={() => history.push(`/${profile.username}`)} onClick={() => history.push(`/${profile.username}`)}>
      <div className="big-profile-pic-container">
        <img
          className="big-profile-pic"
          src={profile.profilePic}
          alt="profile"
        />
      </div>
    </div>
  );
}

export default BigProfilePic;
