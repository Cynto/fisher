import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import ProfileFishStats from '../ProfileFishStats/ProfileFishStats';
import './SingleFish.css';
import DeleteFishPrompt from '../DeleteFishPrompt/DeleteFishPrompt';

function SingleFish(props: any) {
  const { profile, userObject, setUserObjectFunc, item, fillProfileFishArray } =
    props;
  const [deletePrompt, setDeletePrompt] = useState(false);

  
  return (
    <Link
      to={`/${item.username}/fish/${item.fishID}`}
      style={{ textDecoration: 'none' }}
    >
      <div className="total-single-fish-container">
        {deletePrompt ? (
          <DeleteFishPrompt userObject={userObject} item={item} setDeletePrompt={setDeletePrompt} setUserObjectFunc={setUserObjectFunc} fillProfileFishArray={fillProfileFishArray}/>
        ) : null}
        {item.refish ? (
          <div className="refish-container">
            <i className="fas fa-retweet" />
            <p>{`${profile.name} Refished`}</p>{' '}
          </div>
        ) : null}

        <div className="single-fish-container">
          <div className="profile-pic-fish-container">
            <Link to={`/${item.username}`} style={{ textDecoration: 'none' }}>
              <img
                src={item.profilePic}
                className="profile-pic-fish"
                alt="profile"
              />
            </Link>
          </div>
          <div className="right-fish-container">
            {userObject?.fish?.some(
              (element: any) => element.fishID === item.fishID,
            ) ? (
              <button
                className="fas fa-trash delete-fish"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setDeletePrompt(true);
                }}
              >
                {' '}
              </button>
            ) : null}

            <div className="name-date-container">
              <Link
                to={`/${item.username}`}
                style={{ textDecoration: 'none', display: 'flex' }}
              >
                <h4>{item.name}</h4>
                <p>@{item.username}</p>
              </Link>
              <span>·</span>
              <p>{item.date}</p>
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
              fillProfileFishArray={fillProfileFishArray}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default SingleFish;
