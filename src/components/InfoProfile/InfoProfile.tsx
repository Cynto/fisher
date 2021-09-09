import React from 'react';
import './InfoProfile.css';
import format from 'date-fns/format';

function InfoProfile(props: any) {
  const { profile } = props;

  const createdAt = format(profile.createdAt.toDate(), 'MMMM y');

  console.log(createdAt);

  return (
    <div className="profile-info-container">
      <div className="left-info-container">
        <div className="profile-pic-container">
          <img
            src="https://pbs.twimg.com/profile_images/1247959483273248779/JCaoUXeF_400x400.jpg"
            alt="profile-pic"
          />
        </div>
        <div className="name-username-container">
          <h3>{profile.name}</h3>
          <p>{`@${profile.username}`}</p>
        </div>
        <div className="joined-container">
          <i className="fas fa-calendar-week" />
          <p>{`Joined ${createdAt}`}</p>
        </div>
      </div>
    </div>
  );
}

export default InfoProfile;
