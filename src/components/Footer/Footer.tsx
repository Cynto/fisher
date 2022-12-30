import React from 'react';
import './Footer.css';

const Footer = () => (
  <footer>
    <div className="left-footer">
      <h3>Made By Luca</h3>
      <a href="https://github.com/Cynto" rel="noreferrer" target="_blank">
        <i className="fab fa-github" />
      </a>
    </div>
    <div className="right-footer">
      <h3>GitHub Repository</h3>

      <a
        href="https://github.com/Cynto/fisher"
        rel="noreferrer"
        target="_blank"
      >
        <i className="fab fa-github-square" />
      </a>
    </div>
  </footer>
);

export default Footer;
