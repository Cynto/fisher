import React from 'react';
import handleLike from '../../api/HandleLike';
import './ProfileFish.css';

function ProfileFish(props: any) {
  const { profile } = props;
  console.log(profile);
  return (
    <div className="all-fish-container">
      {profile.fish
        ? profile.fish.map((item: any) => (
            <div className="total-single-fish-container">
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
                  <div className="name-date-container">
                    <h4>{item.name}</h4>
                    <p>@{item.username}</p>
                  </div>
                  <div className="fish-text-container">
                    <p>{item.fishText}</p>
                  </div>
                  <div className="comments-refish-likes-container">
                    <div className="comments-symbol-container">
                      <i className="fas fa-comments" />
                      <p>{item.comments.length}</p>
                    </div>
                    <div className="refish-symbol-container">
                      <i className="fas fa-retweet" />
                      <p>{item.refishAmount.length}</p>
                    </div>
                    <div
                      role="button"
                      className="likes-symbol-container"
                      onClick={() => handleLike(item.id)}
                      tabIndex={0}
                      onKeyDown={() => handleLike(item.id)}
                    >
                      <i className="fas fa-heart" />
                      <p>{item.likes.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        : null}
    </div>
  );
}

export default ProfileFish;
