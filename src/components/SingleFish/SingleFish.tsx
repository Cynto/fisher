import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import ProfileFishStats from '../ProfileFishStats/ProfileFishStats';
import './SingleFish.css';
import DeleteFishPrompt from '../DeleteFishPrompt/DeleteFishPrompt';

const SingleFish = (props: any) => {
  const {
    reply,
    profile,
    userObject,
    setUserObjectFunc,
    item,
    fillProfileFishArray,
  } = props;
  const [deletePrompt, setDeletePrompt] = useState(false);
  const navigate = useNavigate();
  return (
    <Link
      to={`/${item.username}/fish/${item.fishID}`}
      style={{ textDecoration: 'none' }}
    >
      <div
        className="total-single-fish-container"
        style={reply ? { borderBottom: '1px solid grey' } : {}}
      >
        {deletePrompt ? (
          <DeleteFishPrompt
            userObject={userObject}
            item={item}
            setDeletePrompt={setDeletePrompt}
            setUserObjectFunc={setUserObjectFunc}
            fillProfileFishArray={fillProfileFishArray}
          />
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
              role="presentation"
              className="profile-pic-fish"
              alt="profile"
              onClick={(e) => {
                e.preventDefault();
                navigate(`/${item.username}`);
              }}
            />
          </div>
          <div className="right-fish-container">
            {item?.username === userObject.username ? (
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
              <button
                type="button"
                style={{
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  background: 'none',
                }}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/${item.username}`);
                }}
              >
                <h4>{item.name}</h4>
                <p>@{item.username}</p>
              </button>

              <span>·</span>
              <p>{item.date}</p>
            </div>
            {item.reply ? (
              <div
                className="replying-to-container"
                style={{ marginTop: '5px' }}
              >
                <p>Replying to</p>
                <p style={{ color: 'orange', marginLeft: '5px' }}>
                  @{item.replyUsername}
                </p>
              </div>
            ) : null}

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
