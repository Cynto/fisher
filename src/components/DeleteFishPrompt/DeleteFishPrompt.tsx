import React from 'react';
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
import {
  ref,
  deleteObject,
} from 'firebase/storage';
import { db, storage } from '../../Firebase';
import './DeleteFishPrompt.css';

const DeleteFishPrompt = (props: any) => {
  const {
    userObject,
    item,
    setDeletePrompt,
    fillProfileFishArray,
    setUserObjectFunc,
  } = props;

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
    if (itemDoc.exists()) {
      const itemObject = itemDoc.data();
      if(itemObject.imgLink !== '') {
        const photoRef = ref(storage, `images/fish_images/${itemObject.username}-${itemObject.fishID}`)
        await deleteObject(photoRef)
      }
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
      itemObject?.comments.forEach(async (element: any) => {
        const q = query(collection(db, 'fish'), where('fishID', '==', element));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((fishDoc: any) => {
          deleteDoc(doc(db, 'fish', fishDoc.data().fishID));
        });
      });
      if (itemObject.reply) {
        const originalFishDoc = await getDoc(
          doc(db, 'fish', itemObject.originalFishID),
        );
        if (originalFishDoc.exists()) {
          const updatedOriginalFishObject = originalFishDoc.data();
          updatedOriginalFishObject.comments =
            updatedOriginalFishObject.comments.filter(
              (element: string) => element !== itemObject.fishID,
            );
          setDoc(
            doc(db, 'fish', itemObject.originalFishID),
            updatedOriginalFishObject,
          );
        }
      }
      deleteDoc(itemRef);
    }

    setUserObjectFunc();
  };
  return (
    <div className="absolute-background-div">
      <div
        role="menu"
        tabIndex={0}
        className="delete-prompt-container"
        onKeyDown={(e) => e.preventDefault()}
        onClick={(e) => e.preventDefault()}
      >
        <h3 style={{ color: 'black' }}>Delete Fish?</h3>
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
  );
}

export default DeleteFishPrompt;
