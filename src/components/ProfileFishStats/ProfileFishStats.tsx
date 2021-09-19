import React, { useState, useEffect } from 'react';
import handleLike from '../../api/HandleLike';
import handleDislike from '../../api/HandleDislike';

import './ProfileFishStats.css'

function ProfileFishStats(props: any) {
  const { item, userObject, setUserObjectFunc, fillProfileFishArray } = props;
  const [likeColor, setLikeColor] = useState({ color: 'rgb(83, 100, 113)' });

  useEffect(() => {
    
    if (userObject?.likes?.some((element: string) => element === item.fishID)) {
      setLikeColor({ color: 'red' });
    }
  }, [userObject]);
 
  return (
    <div className="comments-refish-likes-container">
      <div className="comments-symbol-container">
        <i className="fas fa-comments" />
        <p>{item?.comments?.length}</p>
      </div>
      <div className="refish-symbol-container">
        <i className="fas fa-retweet" />
        <p>{item.refishArray.length}</p>
      </div>
      {userObject?.likes?.some((element: string) => element === item.fishID) ? (
        <div
          role="button"
          className="likes-symbol-container"
          tabIndex={0}
          onClick={async () => {
            setLikeColor({ color: 'rgb(83, 100, 113)' });
            await handleDislike(item.fishID);
            setUserObjectFunc();
            fillProfileFishArray()

          }}
          onKeyDown={async () => {
            setLikeColor({ color: 'rgb(83, 100, 113)' });
            await handleDislike(item.fishID);
            setUserObjectFunc();
            fillProfileFishArray()
          }}
          style={likeColor}
        >
          <i className="fas fa-heart" />
          <p>{item.likes.length}</p>
        </div>
      ) : (
        <div
          role="button"
          className="likes-symbol-container"
          onClick={async () => {
            setLikeColor({ color: 'red' });
            await handleLike(item.fishID);
            setUserObjectFunc();
            fillProfileFishArray()

          }}
          tabIndex={0}
          onKeyDown={async () => {
            setLikeColor({ color: 'red' });
            await handleLike(item.fishID);
            setUserObjectFunc();
            fillProfileFishArray()

          }}
          style={likeColor}
        >
          <i className="fas fa-heart" />
          <p>{item.likes.length}</p>
        </div>
      )}
    </div>
  );
}

export default ProfileFishStats;
