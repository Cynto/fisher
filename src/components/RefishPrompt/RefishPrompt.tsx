import React from 'react';
import { getDoc, doc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../Firebase';
import './RefishPrompt.css';

function RefishPrompt(props: any) {
  const { userObject, fishObject, setRefishPrompt } = props;
  console.log(userObject, fishObject);
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
      const refishDate = Timestamp.now()
      const newFishRefObject = {
        createdAt: refishDate,
        createdBy: fishObject.username,
        fishID: fishObject.fishID,
        refish: true,
      };
      const newUserObject = userObject;
      newUserObject.fish = newUserObject.fish.filter(
        (element: any) => element.fishID !== fishObject.fishID,
      );
      newUserObject.fish.push(newFishRefObject);
      await updateDoc(doc(db, 'users', userObject.uid), {
        fish: newUserObject.fish,
      });
    }
  };
  return (
    <div className="absolute-background-div">
      <div className="refish-prompt-container">
        <button
          type="button"
          className="prompt-refish-button"
          onClick={handleRefish}
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
          onClick={() => setRefishPrompt(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default RefishPrompt;