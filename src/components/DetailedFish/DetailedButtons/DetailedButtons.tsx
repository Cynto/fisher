import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import handleLike from '../../../api/HandleLike';
import handleDislike from '../../../api/HandleDislike';
import RefishPrompt from '../../RefishPrompt/RefishPrompt';
import './DetailedButtons.css';
import UnrefishPrompt from '../../UnrefishPrompt/UnrefishPrompt';

function DetailedButtons(props: any) {
  const { userObject, fishObject, setUserObjectFunc, getFish } = props;
  const [likeColorClass, setLikeColorClass] = useState('heart-symbol');
  const [likeNumber, setLikeNumber] = useState(0);
  const [refishPrompt, setRefishPrompt] = useState(false);
  const [unrefishPrompt, setUnrefishPrompt] = useState(false);
  const [refishColorClass, setRefishColorClass] = useState('');

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
      userObject.likes.some((element: any) => element.fishID === fishObject.fishID)
    ) {
      
      setLikeColorClass('heart-symbol-liked');
    }
  }, [userObject, fishObject]);

  useEffect(() => {
    setLikeNumber(fishObject?.likes?.length);
    if (
      fishObject?.refishArray?.some(
        (element: any) => element === userObject.username,
      )
    ) {
      setRefishColorClass('refish-symbol-refished');
    }
  }, [fishObject]);

  return (
    <div>
      {unrefishPrompt ? (
        <UnrefishPrompt
          userObject={userObject}
          fishObject={fishObject}
          setUnrefishPrompt={setUnrefishPrompt}
          setRefishColorClass={setRefishColorClass}
          getFish={getFish}
        />
      ) : null}
      {refishPrompt ? (
        <RefishPrompt
          userObject={userObject}
          fishObject={fishObject}
          setRefishPrompt={setRefishPrompt}
          setRefishColorClass={setRefishColorClass}
          getFish={getFish}
        />
      ) : null}
      <div className="detailed-stats-container">
        <p className="bold">{fishObject?.comments?.length}</p>
        <p className="grey-p">Comments</p>
        <p className="bold">{fishObject?.refishArray?.length}</p>
        <p className="grey-p">Refish</p>

        <p className="bold">{likeNumber}</p>
        <p className="grey-p">Likes</p>
      </div>
      <div className="comment-refish-like-container">
        <Link to={`/${fishObject.username}/fish/${fishObject.fishID}/reply`}>
          <i className="fas fa-comment" />
        </Link>
        <i
          role="button"
          aria-label="Refish button"
          tabIndex={0}
          className={`fas fa-retweet ${refishColorClass}`}
          onKeyDown={() => {
            if (
              fishObject?.refishArray?.some(
                (element: any) => element === userObject.username,
              )
            ) {
              setUnrefishPrompt(true);
            } else {
              setRefishPrompt(true);
            }
          }}
          onClick={() => {
            if (
              fishObject?.refishArray?.some(
                (element: any) => element === userObject.username,
              )
            ) {
              setUnrefishPrompt(true);
            } else {
              setRefishPrompt(true);
            }
          }}
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
