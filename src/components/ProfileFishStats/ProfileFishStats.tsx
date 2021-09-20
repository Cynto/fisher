import React, { useState, useEffect } from 'react';
import handleLike from '../../api/HandleLike';
import handleDislike from '../../api/HandleDislike';

import './ProfileFishStats.css';

function ProfileFishStats(props: any) {
  const { item, userObject, setUserObjectFunc, fillProfileFishArray } = props;
  const [likeColorClass, setLikeColorClass] = useState(
    'likes-symbol-container',
  );
  const [likesNumber, setLikesNumber] = useState(item.likes.length);

  useEffect(() => {
    if (userObject?.likes?.some((element: string) => element === item.fishID)) {
      setLikeColorClass('likes-symbol-container-liked');
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
          className={likeColorClass}
          tabIndex={0}
          onClick={async () => {
            setLikesNumber((oldValue: number) => oldValue - 1);
            setLikeColorClass('likes-symbol-container');
            await handleDislike(item.fishID);
            await fillProfileFishArray();
            setUserObjectFunc();
          }}
          onKeyDown={async () => {
            setLikesNumber((oldValue: number) => oldValue - 1);

            setLikeColorClass('likes-symbol-container');

            await handleDislike(item.fishID);
            await fillProfileFishArray();
            setUserObjectFunc();
          }}
        >
          <i className="fas fa-heart" />
          <p>{likesNumber}</p>
        </div>
      ) : (
        <div
          role="button"
          className={likeColorClass}
          onClick={async () => {
            setLikeColorClass('likes-symbol-container-liked');
            setLikesNumber((oldValue: number) => oldValue + 1);
            await handleLike(item.fishID);
            await fillProfileFishArray();
            setUserObjectFunc();
          }}
          tabIndex={0}
          onKeyDown={async () => {
            setLikeColorClass('likes-symbol-container-liked');
            setLikesNumber((oldValue: number) => oldValue + 1);
            await handleLike(item.fishID);
            await fillProfileFishArray();
            setUserObjectFunc();
          }}
        >
          <i className="fas fa-heart" />
          <p>{likesNumber}</p>
        </div>
      )}
    </div>
  );
}

export default ProfileFishStats;
