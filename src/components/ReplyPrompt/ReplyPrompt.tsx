import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './ReplyPrompt.css';

import SendFishInner from '../SendFishInner/SendFishInner';

const ReplyPrompt = (props: any) => {
  const { userObject, fishObject, setUserObjectFunc } = props;

  const navigate = useNavigate();

  return (
    <div className="absolute-background-div">
      <div className="send-reply-prompt-container">
        <button
          type="button"
          className="exit-fish-button"
          onClick={() =>
            navigate(`/${fishObject.username}/fish/${fishObject.fishID}`)
          }
        >
          X
        </button>
        <div className="original-fish-total-container">
          <div className="profile-pic-fish-container">
            <Link
              to={`/${fishObject.username}`}
              style={{ textDecoration: 'none' }}
            >
              <img
                src={fishObject.profilePic}
                className="profile-pic-fish"
                alt="profile"
              />
            </Link>
          </div>
          <div className="original-fish-content-container">
            <div className="name-date-container">
              <Link
                to={`/${fishObject.username}`}
                style={{ textDecoration: 'none', display: 'flex' }}
              >
                <h4>{fishObject.name}</h4>
                <p>@{fishObject.username}</p>
              </Link>
              <span>·</span>
              <p>{fishObject.date}</p>
            </div>
            <div className="fish-text-container">
              <p>{fishObject.fishText}</p>
            </div>
            <div className="replying-to-container">
              <p>Replying to</p>
              <p style={{ color: 'orange', marginLeft: '5px' }}>
                @{fishObject.username}
              </p>
            </div>
          </div>
        </div>
        <SendFishInner
          reply
          isHome={false}
          fishObject={fishObject}
          userObject={userObject}
          setUserObjectFunc={setUserObjectFunc}
        />
      </div>
    </div>
  );
};

export default ReplyPrompt;
