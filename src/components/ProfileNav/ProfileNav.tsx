import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './ProfileNav.css';

function ProfileNav(props: any) {
  const { profile } = props;
  const history = useHistory();
  return (
    <nav className="profile-nav">
      <NavLink
        className="profile-link"
        exact
        to={`/${profile.username}`}
        activeClassName="profile-link-selected"
        onClick={() => {
          history.push('/login');
        }}
      >
        Fish
      </NavLink>
      <NavLink
        to={`/${profile.username}/with_replies`}
        activeClassName="profile-link-selected"
        className="profile-link"
      >
        Fish & replies
      </NavLink>
      <NavLink
        to={`/${profile.username}/media`}
        activeClassName="profile-link-selected"
        className="profile-link"
      >
        Media
      </NavLink>
      <NavLink
        to={`/${profile.username}/likes`}
        activeClassName="profile-link-selected"
        className="profile-link"
      >
        Likes
      </NavLink>
    </nav>
  );
}

export default ProfileNav;
