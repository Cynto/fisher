import React, { useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import uniqid from 'uniqid';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { setDoc, doc, Timestamp, getDoc } from 'firebase/firestore';
import { storage, db } from '../../Firebase';

import './SendFish.css';

function SendFish(props: any) {
  const { isHome, userObject, setUserObjectFunc, setSendFish, fillProfileArray} = props;
  const fishPicRef = useRef(document.createElement('input'));
  // eslint-disable-next-line no-unused-vars
  const [imgLink, setImgLink] = useState('');


  const handleFish = async () => {
    const userDoc = await getDoc(doc(db, 'users', userObject.uid))
    const updatedUserObject: any = userDoc.data()
    const fishText = document.getElementById(
      'fish-text',
    ) as HTMLTextAreaElement;
    const fishID = uniqid();
    const time = Timestamp.now();
    const fishObject = {
      comments: [],
      likes: [],
      name: updatedUserObject.name,
      username: updatedUserObject.username,
      profilePic: updatedUserObject.profilePic,
      refishArray: [],
      fishText: fishText.value,
      imgLink,
      fishID,
      createdAt: time,
    };
    await setDoc(doc(db, 'fish', fishID), fishObject);
    const userFish = {
      refish: false,
      fishID,
      createdBy: userObject.username,
      createdAt: time,
    };
    const newUserObject = updatedUserObject;
    newUserObject.fish.push(userFish);
    await setDoc(doc(db, 'users', updatedUserObject.uid), newUserObject);
    await setUserObjectFunc();
    await fillProfileArray();
  };

  const handleImageUpload = async () => {
    if (fishPicRef.current.files) {
      const photoData = fishPicRef.current.files[0];
      const photoID = uniqid();
      if (photoData) {
        const photoRef = ref(
          storage,
          `images/fish_images/${userObject.username}-${photoID}`,
        );
        // eslint-disable-next-line no-unused-vars
        const uploadTask = await uploadBytesResumable(photoRef, photoData);

        getDownloadURL(
          ref(storage, `images/fish_images/${userObject.username}-${photoID}`),
        ).then((url: string) => setImgLink(url));
      }
    }
  };

  return (
    <div className={isHome ? '' : 'absolute-background-div'}>
      <div
        className={
          isHome ? 'send-fish-normal-container' : 'send-fish-absolute-container'
        }
      >
        <div className="exit-fish-pic-container">
          {' '}
          <button
            className="exit-fish-button"
            type="button"
            onClick={() => setSendFish(false)}
          >
            X
          </button>
          <img src={userObject.profilePic} alt="profile" />
        </div>
        <div className="right-compose-fish-container">
          <TextareaAutosize
            id="fish-text"
            placeholder="What's happening?"
            maxLength={280}
          />

          {imgLink !== '' ? (
            <div className="image-upload-container">
              {' '}
              <img src={imgLink} alt="upload" />{' '}
              <button type="button" onClick={() => setImgLink('')}>
                X
              </button>
            </div>
          ) : null}

          <div className="bottom-right-fish-container">
            <label className="far fa-images" htmlFor="pic-upload">
              <input
                ref={fishPicRef}
                id="pic-upload"
                type="file"
                accept=".jpeg, .jpg, .png, .webp"
                onChange={handleImageUpload}
              />
            </label>
            <button
              type="button"
              onClick={async () => {
                
                await handleFish();
                setSendFish(false);
              }}
            >
              Send Fish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SendFish;
