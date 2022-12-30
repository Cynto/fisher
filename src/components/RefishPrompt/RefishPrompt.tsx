import React from 'react';
import { getDoc, doc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../Firebase';
import './RefishPrompt.css';

const RefishPrompt = (props: any) => {
  const {
    userObject,
    fishObject,
    setRefishPrompt,
    fillProfileFishArray,
    getFish,
  } = props;

  const handleRefish = async () => {
    const fishRef = doc(db, 'fish', fishObject.fishID);
    const fishDoc = await getDoc(fishRef);
    if (fishDoc.exists()) {
      const updatedFishObject = fishDoc.data();
      if (updatedFishObject.refishArray.indexOf(userObject.username) === -1) {
        updatedFishObject.refishArray.push(userObject.username);
        await updateDoc(fishRef, {
          refishArray: updatedFishObject.refishArray,
        });
      }
      const refishDate = Timestamp.now();
      const newFishRefObject = {
        createdAt: refishDate,
        createdBy: fishObject.username,
        fishID: fishObject.fishID,
        refish: true,
      };
      const newUserObject = userObject;

      newUserObject.fish.push(newFishRefObject);
      await updateDoc(doc(db, 'users', userObject.uid), {
        fish: newUserObject.fish,
      });
    }
    if (fillProfileFishArray) {
      await fillProfileFishArray();
    } else if (getFish) {
      getFish();
    }
  };
  return (
    <div
      role="link"
      tabIndex={0}
      onKeyDown={(e) => e.preventDefault()}
      onClick={(e) => e.preventDefault()}
      className="absolute-background-div"
    >
      <div
        role="link"
        tabIndex={0}
        onKeyDown={(e) => e.preventDefault()}
        onClick={(e) => e.preventDefault()}
        className="refish-prompt-container"
      >
        <button
          type="button"
          className="prompt-refish-button"
          onClick={(e) => {
            e.preventDefault();
            handleRefish();
            setRefishPrompt(false);
          }}
        >
          <i className="fas fa-retweet" /> Refish
        </button>
        <button type="button" className="prompt-quote-button">
          {' '}
          <i className="fas fa-pencil-alt" />
          Quote Fish
        </button>
        <button
          type="button"
          className="prompt-cancel-button"
          onClick={(e) => {
            e.preventDefault();
            setRefishPrompt(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RefishPrompt;
