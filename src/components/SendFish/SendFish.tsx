import React, { useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import uniqid from 'uniqid';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { setDoc, doc, Timestamp } from 'firebase/firestore';
import { storage, db } from '../../Firebase';

import './SendFish.css';

function SendFish(props: any) {
  const { isHome, userObject, setUserObjectFunc } = props;
  const history = useHistory();
  const fishPicRef = useRef(document.createElement('input'));
  // eslint-disable-next-line no-unused-vars
  const [imgLink, setImgLink] = useState('');

  const locationObject = useLocation();
  const locationArray = locationObject.pathname.split('/');
  const [, locationString] = locationArray;

  const handleFish = async () => {
    const fishText = document.getElementById(
      'fish-text',
    ) as HTMLTextAreaElement;
    const fishID = uniqid();
    const time = Timestamp.now();
    const fishObject = {
      comments: [],
      likes: [],
      name: userObject.name,
      username: userObject.username,
      profilePic: userObject.profilePic,
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
    const newUserObject = userObject;
    newUserObject.fish.push(userFish);
    await setDoc(doc(db, 'users', userObject.uid), newUserObject);
    setUserObjectFunc()
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
            onClick={() => history.push(`/${locationString}`)}
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
              onClick={() => {
                handleFish();
                history.push(`/${locationString}`);
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
