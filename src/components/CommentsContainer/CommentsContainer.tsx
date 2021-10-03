import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../Firebase';
import createTimeStamp from '../../api/CreateTimestamp';
import DeleteFishPrompt from '../DeleteFishPrompt/DeleteFishPrompt';
import ProfileFishStats from '../ProfileFishStats/ProfileFishStats';

function CommentsContainer(props: any) {
  const { userObject, fishObject, setUserObjectFunc } = props;
  const [commentsArray, setCommentsArray] = useState<any>([]);
  const [deletePrompt, setDeletePrompt] = useState(false);

  const fillCommentsArray = async () => {
    const newArray: any = [];
    console.log(fishObject)
    await Promise.all(
      fishObject.comments.map(async (fishID: string) => {
        console.log(fishID)
        const commentRef = await getDoc(doc(db, 'fish', fishID));
        if (commentRef.exists()) {
          const commentObject = commentRef.data();

          commentObject.date = createTimeStamp(commentObject);

          newArray.push(commentObject);
        }
      }),
    );
    newArray.reverse()
    setCommentsArray(newArray);
    console.log(newArray)
  };
  useEffect(() => {
    if (fishObject.comments?.length > 0) {
      fillCommentsArray();
    }
  }, [fishObject]);
  return (
    <div className="comments-container">
      {commentsArray.map((item: any) => (
        <div className="single-fish-container" style={{marginTop: '10px', borderBottom: '1px solid grey'}}>
          {deletePrompt ? (
            <DeleteFishPrompt
              userObject={userObject}
              item={item}
              setDeletePrompt={setDeletePrompt}
              setUserObjectFunc={setUserObjectFunc}
            />
          ) : null}
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
            <ProfileFishStats
              item={item}
              userObject={userObject}
              setUserObjectFunc={setUserObjectFunc}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentsContainer;
