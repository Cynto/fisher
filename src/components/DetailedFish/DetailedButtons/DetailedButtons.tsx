import React, { useState, useEffect } from 'react';
import handleLike from '../../../api/HandleLike';
import handleDislike from '../../../api/HandleDislike';
import RefishPrompt from '../../RefishPrompt/RefishPrompt';
import './DetailedButtons.css';

function DetailedButtons(props: any) {
  const { userObject, fishObject, setUserObjectFunc } = props;
  const [likeColorClass, setLikeColorClass] = useState('heart-symbol');
  const [likeNumber, setLikeNumber] = useState(0);
  const [refishPrompt, setRefishPrompt] = useState(false);

  const clickHeart = async () => {
    if (
      userObject.likes.some((element: any) => element === fishObject.fishID)
    ) {
      setLikeColorClass('heart-symbol');
      setLikeNumber((oldValue: number) => oldValue - 1);
      await handleDislike(fishObject.fishID);
      setUserObjectFunc();
    } else {
      setLikeColorClass('heart-symbol-liked');
      setLikeNumber((oldValue: number) => oldValue + 1);
      await handleLike(fishObject.fishID);
      setUserObjectFunc();
    }
  };
  useEffect(() => {
    if (
      userObject.likes.some((element: any) => element === fishObject.fishID)
    ) {
      setLikeColorClass('heart-symbol-liked');
    }
  }, [userObject]);

  useEffect(() => {
    setLikeNumber(fishObject?.likes?.length);
  }, [fishObject]);

  return (
    <div>
      {refishPrompt ? <RefishPrompt userObject={userObject} fishObject={fishObject} setRefishPrompt={setRefishPrompt}/> : null}
      <div className="detailed-stats-container">
        <p className="bold">{fishObject?.comments?.length}</p>
        <p className="grey-p">Comments</p>
        <p className="bold">{fishObject?.refishArray?.length}</p>
        <p className="grey-p">Refish</p>

        <p className="bold">{likeNumber}</p>
        <p className="grey-p">Likes</p>
      </div>
      <div className="comment-refish-like-container">
        <i className="fas fa-comment" />
        <i
          role="button"
          aria-label="Refish button"
          tabIndex={0}
          className="fas fa-retweet"
          onKeyDown={() => setRefishPrompt(true)}
          onClick={() => setRefishPrompt(true)}
        />

        <i
          role="button"
          tabIndex={0}
          className={`fas fa-heart ${likeColorClass}`}
          aria-label="Like button"
          onKeyDown={clickHeart}
          onClick={clickHeart}
        />
        <i />
      </div>
    </div>
  );
}

export default DetailedButtons;
