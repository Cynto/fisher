import React, { useState } from 'react';
import ProfileFishStats from '../ProfileFishStats/ProfileFishStats';

import './SingleFish.css';

function SingleFish(props: any) {
  const { profile, userObject, setUserObjectFunc, item } = props;
  const [deletePrompt, setDeletePrompt] = useState(false);

  const handleDelete = () => {};
  console.log(handleDelete);
  return (
    <div className="total-single-fish-container">
      {deletePrompt ? (
        <div className="absolute-background-div">
          <div className="delete-prompt-container">
            <h3>Delete Fish?</h3>
            <p>
              This can’t be undone and it will be removed from your profile, the
              timeline of any accounts that follow you, and from Twitter search
              results.{' '}
            </p>
            <button type="button" className="prompt-delete-button" >Delete</button>
            <button type="button" className="prompt-cancel-button" style={{}}>Cancel</button>

          </div>
        </div>
      ) : null}
      {item.refish ? (
        <div className="refish-container">
          <i className="fas fa-retweet" />
          <p>{`${profile.name} Refished`}</p>{' '}
        </div>
      ) : null}

      <div className="single-fish-container">
        <div className="profile-pic-fish-container">
          <img
            src={item.profilePic}
            className="profile-pic-fish"
            alt="profile"
          />
        </div>
        <div className="right-fish-container">
          <button
            className="fas fa-trash delete-fish"
            type="button"
            onClick={() => setDeletePrompt(true)}
          >
            {' '}
          </button>
          <div className="name-date-container">
            <h4>{item.name}</h4>
            <p>@{item.username}</p>
          </div>
          <div className="fish-text-container">
            <p>{item.fishText}</p>
          </div>
          {item.imgLink !== '' ? (
            <div className="fish-image-container">
              <img src={item.imgLink} alt="fish upload" />
            </div>
          ) : null}
          <ProfileFishStats
            item={item}
            userObject={userObject}
            setUserObjectFunc={setUserObjectFunc}
          />
        </div>
      </div>
    </div>
  );
}

export default SingleFish;
