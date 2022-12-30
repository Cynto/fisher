import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './ProfileNav.css';

const ProfileNav = (props: any) => {
  const { profile } = props;
  const navigate = useNavigate();
  return (
    <nav className="profile-nav">
      <NavLink end
        to={`/${profile.username}`}
        className={({isActive}) =>
          isActive ? 'profile-link-selected' : 'profile-link'
        }
        onClick={() => {
          navigate('/login');
        }}
      >
        Fish
      </NavLink>
      <NavLink
        to={`/${profile.username}/with_replies`}
        className={({isActive}) =>
          isActive ? 'profile-link-selected' : 'profile-link'
        }
      >
        Fish & replies
      </NavLink>
      <NavLink
        to={`/${profile.username}/media`}
        className={({isActive}) =>
          isActive ? 'profile-link-selected' : 'profile-link'
        }
      >
        Media
      </NavLink>
      <NavLink
        to={`/${profile.username}/likes`}
        className={({isActive}) =>
          isActive ? 'profile-link-selected' : 'profile-link'
        }
      >
        Likes
      </NavLink>
    </nav>
  );
};

export default ProfileNav;
