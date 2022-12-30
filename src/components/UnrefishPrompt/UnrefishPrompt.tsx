import React from 'react';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../Firebase';

const UnrefishPrompt = (props: any) => {
  const {
    userObject,
    fishObject,
    setUnrefishPrompt,
    setRefishColorClass,
    fillProfileFishArray,
    getFish,
  } = props;

  const handleUnrefish = async () => {
    const fishRef = doc(db, 'fish', fishObject.fishID);
    const fishDoc = await getDoc(fishRef);
    if (fishDoc.exists()) {
      const updatedFishObject = fishDoc.data();
      updatedFishObject.refishArray = updatedFishObject.refishArray.filter(
        (username: string) => username !== userObject.username,
      );
      await updateDoc(fishRef, {
        refishArray: updatedFishObject.refishArray,
      });

      const newUserObject = userObject;
      newUserObject.fish = newUserObject.fish.filter(
        (element: any) => element.fishID !== fishObject.fishID,
      );
      if (fishObject.username === userObject.username) {
        const newFishRefObject = {
          createdAt: fishObject.createdAt,
          createdBy: fishObject.username,
          fishID: fishObject.fishID,
          refish: false,
        };

        newUserObject.fish.push(newFishRefObject);
        await updateDoc(doc(db, 'users', userObject.uid), {
          fish: newUserObject.fish,
        });
      } else {
        await updateDoc(doc(db, 'users', userObject.uid), {
          fish: newUserObject.fish,
        });
      }
    }
    if (fillProfileFishArray) {
      await fillProfileFishArray();
    } else if (getFish) {
      await getFish();
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
          className="prompt-log-out-button"
          onClick={() => {
            setRefishColorClass('');
            setUnrefishPrompt(false);
            handleUnrefish();
          }}
        >
          Undo Refish{' '}
        </button>
        <button
          type="button"
          className="prompt-cancel-button"
          onClick={(e) => {
            e.preventDefault();
            setUnrefishPrompt(false);
          }}
        >
          Cancel{' '}
        </button>
      </div>
    </div>
  );
};

export default UnrefishPrompt;
