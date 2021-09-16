import React, { useState, useEffect } from 'react';
import handleLike from '../../api/HandleLike';
import handleDislike from '../../api/HandleDislike';

function ProfileFishStats(props: any) {
  const { item, userObject, setUserObjectFunc } = props;
  const [likeColor, setLikeColor] = useState({ color: 'rgb(83, 100, 113)' });

  useEffect(() => {
    
    if (userObject.likes.some((element: string) => element === item.id)) {
     
      setLikeColor({ color: 'red' });
    }
  }, [userObject]);
  return (
    <div className="comments-refish-likes-container">
      <div className="comments-symbol-container">
        <i className="fas fa-comments" />
        <p>{item.comments.length}</p>
      </div>
      <div className="refish-symbol-container">
        <i className="fas fa-retweet" />
        <p>{item.refishAmount.length}</p>
      </div>
      {userObject.likes.some((element: string) => element === item.id) ? (
        <div
          role="button"
          className="likes-symbol-container"
          tabIndex={0}
          onClick={async () => {
            setLikeColor({ color: 'rgb(83, 100, 113)' });
            await handleDislike(item.id);
            setUserObjectFunc();
          }}
          onKeyDown={async () => {
            setLikeColor({ color: 'rgb(83, 100, 113)' });
            await handleDislike(item.id);
            setUserObjectFunc();
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
            await handleLike(item.id);
            setUserObjectFunc();
          }}
          tabIndex={0}
          onKeyDown={async () => {
            setLikeColor({ color: 'red' });
            await handleLike(item.id);
            setUserObjectFunc();
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
