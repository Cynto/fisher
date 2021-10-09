import React, { useState, useEffect } from 'react';
import handleLike from '../../api/HandleLike';
import handleDislike from '../../api/HandleDislike';
import RefishPrompt from '../RefishPrompt/RefishPrompt';
import UnrefishPrompt from '../UnrefishPrompt/UnrefishPrompt';
import './ProfileFishStats.css';

function ProfileFishStats(props: any) {
  const { item, userObject, setUserObjectFunc, fillProfileFishArray } = props;
  const [likeColorClass, setLikeColorClass] = useState(
    'likes-symbol-container',
  );
  const [likesNumber, setLikesNumber] = useState(item.likes.length);
  const [refishColorClass, setRefishColorClass] = useState('');
  const [refishPrompt, setRefishPrompt] = useState(false);
  const [unrefishPrompt, setUnrefishPrompt] = useState(false);

  useEffect(() => {
    if (
      userObject?.likes?.some((element: any) => element.fishID === item.fishID)
    ) {
      setLikeColorClass('likes-symbol-container-liked');
    }
  }, [userObject]);

  const clickHeart = async (e: any) => {
    if (
      userObject?.likes?.some((element: any) => element.fishID === item.fishID)
    ) {
      e.preventDefault();
      setLikesNumber((oldValue: number) => oldValue - 1);
      setLikeColorClass('likes-symbol-container');
      await handleDislike(item.fishID);
      if (fillProfileFishArray) {
        await fillProfileFishArray();
      }
      setUserObjectFunc();
    } else {
      e.preventDefault();
      setLikeColorClass('likes-symbol-container-liked');
      setLikesNumber((oldValue: number) => oldValue + 1);
      await handleLike(item.fishID);
      if (fillProfileFishArray) {
        await fillProfileFishArray();
      }
      setUserObjectFunc();
    }
  };
  useEffect(() => {
    if (
      item?.refishArray?.some((element: any) => element === userObject.username)
    ) {
      setRefishColorClass('refish-symbol-refished');
    }
  }, [item]);

  return (
    <div className="comments-refish-likes-container">
      {unrefishPrompt ? (
        <UnrefishPrompt
          userObject={userObject}
          fishObject={item}
          setUnrefishPrompt={setUnrefishPrompt}
          setRefishColorClass={setRefishColorClass}
          fillProfileFishArray={fillProfileFishArray}
        />
      ) : null}
      {refishPrompt ? (
        <RefishPrompt
          userObject={userObject}
          fishObject={item}
          setRefishPrompt={setRefishPrompt}
          setRefishColorClass={setRefishColorClass}
          fillProfileFishArray={fillProfileFishArray}
        />
      ) : null}
      <div
        className="comments-symbol-container single-container"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          e.preventDefault();
        }}
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <i className="fas fa-comments" />
        <p>{item?.comments?.length}</p>
      </div>
      <div
        className={`refish-symbol-container single-container ${refishColorClass}`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          e.preventDefault();
          if (
            item?.refishArray?.some(
              (element: any) => element === userObject.username,
            )
          ) {
            setUnrefishPrompt(true);
          } else {
            setRefishPrompt(true);
          }
        }}
        onClick={(e) => {
          e.preventDefault();
          if (
            item?.refishArray?.some(
              (element: any) => element === userObject.username,
            )
          ) {
            setUnrefishPrompt(true);
          } else {
            setRefishPrompt(true);
          }
        }}
      >
        <i className="fas fa-retweet" />
        <p>{item.refishArray.length}</p>
      </div>
      <div
        role="button"
        className={`${likeColorClass} single-container`}
        tabIndex={0}
        onClick={async (e) => clickHeart(e)}
        onKeyDown={async (e) => clickHeart(e)}
      >
        <i className="fas fa-heart" />
        <p>{likesNumber}</p>
      </div>
    </div>
  );
}

export default ProfileFishStats;
