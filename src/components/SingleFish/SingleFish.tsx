import React, { useState } from 'react';
import {
  getDoc,
  doc,
  where,
  collection,
  query,
  getDocs,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';

import { db } from '../../Firebase';
import ProfileFishStats from '../ProfileFishStats/ProfileFishStats';
import './SingleFish.css';

function SingleFish(props: any) {
  const { profile, userObject, setUserObjectFunc, item, fillProfileFishArray } =
    props;
  const [deletePrompt, setDeletePrompt] = useState(false);

  const handleDelete = async () => {
    const userDoc1 = await getDoc(doc(db, 'users', userObject.uid));
    const updatedUserObject: any = userDoc1.data();

    const newUserObject = updatedUserObject;
    newUserObject.fish = newUserObject.fish.filter(
      (ele: any) => ele.fishID !== item.fishID,
    );

    setDoc(doc(db, 'users', newUserObject.uid), newUserObject);

    const itemRef = doc(db, 'fish', item.fishID);
    const itemDoc = await getDoc(itemRef);
    const itemObject = itemDoc.data();
    await itemObject?.likes.forEach(async (element: any) => {
      const q = query(
        collection(db, 'users'),
        where('username', '==', element),
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((userDoc: any) => {
        const user = userDoc.data();
        user.likes = user.likes.filter((ele: any) => ele !== item.fishID);
        setDoc(doc(db, 'users', user.uid), user);
      });
    });
    deleteDoc(itemRef);
    setUserObjectFunc();
  };
  return (
    <div className="total-single-fish-container">
      {deletePrompt ? (
        <div className="absolute-background-div">
          <div className="delete-prompt-container">
            <h3>Delete Fish?</h3>
            <p>
              This can’t be undone and it will be removed from your profile, the
              timeline of any accounts that follow you, and from Twitter search
              results.{' '}
            </p>
            <button
              type="button"
              className="prompt-delete-button"
              onClick={async () => {
                await handleDelete();
                setDeletePrompt(false);
                fillProfileFishArray();
              }}
            >
              Delete
            </button>
            <button
              type="button"
              className="prompt-cancel-button"
              onClick={() => setDeletePrompt(false)}
            >
              Cancel
            </button>
          </div>
        </div>
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
            className="profile-pic-fish"
            alt="profile"
          />
        </div>
        <div className="right-fish-container">
          {userObject?.fish?.some(
            (element: any) => element.fishID === item.fishID,
          ) ? (
            <button
              className="fas fa-trash delete-fish"
              type="button"
              onClick={() => setDeletePrompt(true)}
            >
              {' '}
            </button>
          ) : null}

          <div className="name-date-container">
            <h4>{item.name}</h4>
            <p>@{item.username}</p>
            <span>·</span>
            <p>{item.date}</p>
          </div>
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
  );
}

export default SingleFish;
