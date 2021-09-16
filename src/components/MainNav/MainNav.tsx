import React from 'react';
import { useLocation, Link } from 'react-router-dom';

import './MainNav.css';

function MainNav(props: any) {
  const { userObject } = props;
  const location = useLocation();
  const locationToUse = location.pathname;

  return (
    <div className="main-nav-container">
      <nav className="main-nav">
        <Link to="/home">
          <i className="fas fa-fish orange-hover" />
        </Link>
        <Link to="/home">
          <i className="fas fa-home" style={{ color: 'black' }} />
        </Link>
        <Link to={`/${userObject.username}`}>
          <i className="fas fa-user-circle" style={{ color: 'black' }} />
        </Link>

        <Link to={`${locationToUse}/compose_fish`}>
          <i className="fas fa-feather-alt orange-hover" />
        </Link>
      </nav>
    </div>
  );
}

export default MainNav;
