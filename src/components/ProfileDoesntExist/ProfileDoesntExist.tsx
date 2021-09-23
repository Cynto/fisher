import React from 'react';
import {useParams} from 'react-router-dom'
import './ProfileDoesntExist.css'

function ProfileDoesntExist() {
  const { username } = useParams<{ username: string }>();

  return (
    <div className="total-profile-page">
      <div className="profile-page">
        <div className="profile-inner">
          <div className="profile-top-container">
            <div className="profile-top">
              <div className="top-button-container">
                <a href="/home">
                  <button type="button">
                    <i className="fas fa-arrow-left" />
                  </button>
                </a>
              </div>
              <div className="name-fish">
                <h3>Profile</h3>
              </div>
            </div>
            <img
              className="profile-banner"
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwcHBwcHBwcHBwcHBw0HBwcHBw8ICQcNFREWFhURExMYHSggGBoxGxMTITEhJSkrLi4uFx8zODMtNygtLisBCgoKBgYGDg8PGisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIALcBFAMBIgACEQEDEQH/xAAWAAEBAQAAAAAAAAAAAAAAAAAAAQf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDSwERYFQBUFBAAUABFQFAAAAAARQAABBQBABQAEUBFAAAAAQAAAAABUAUAAAAAAAAAAEBRAFEAVBQBAFEAUQAFQBUUEAAAAAAABRAFEUAEBRAFEAVAAAAAAAAAAAAAAAAVFBAAAAAAAAVFQFQAUEAUQFQAAAAAAAAAAAAAAAAAFRQQAAAAAAAAABUAVBQBAAAAAAAAAAAAAAAAAAABUUEAAAAAAABUAAAAAAABUABQEFAQVABQEAAFAQUBAUEUARQBAAAAAAAAAAVABUAAABUUEFAAARUAAUAEAFAEFAABAUEAAAAAAAAAAAABQQABUUEUAEUBFAEUABFBFABFAAAQFBAAFQAAAAAAAAAABUABUUAQBRAFRUAVFBFAAAEUQFABAAAAAAAAAAAABUAAAAAVFARQEFQBQBAUAAARQAAAAQUBAAAAAAAAAAAAAAAAFEBRAFQAFQAABRAFEAFQBRFAAAAAAAABBQEFAEUBBQEFAQUBBQEFAQUBBQEFARQBBQAAH//Z"
              alt="profile banner"
            />
          </div>
          <div className="profile-info-container">
            <div className="left-info-container">
              <div className="profile-pic-container">
                <img
                  src="https://lh3.googleusercontent.com/proxy/1BBg2_oqmrXx59QeXZGDWw9w2XLbFKT6DA6zbT0SxoWFMFXk53T-2zFy27dczF-rbCfrFFfEmxuofAuBLYPFAu24CZk0Nvo55MyyPJBIsghG_3ztI_GWsAdAatSZWj0KuwcUrdojWi7BoqUdjg"
                  alt="profile-pic"
                />
              </div>
              <div className="name-username-container">
                <h3>@{username}</h3>
              </div>
            </div>
          </div>
          <div className="does-not-exist-container" >
            <h1>This account doesn&apos;t exist</h1>
            <p>Try searching for another</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDoesntExist;
