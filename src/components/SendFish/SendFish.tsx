import React, { useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../Firebase';

import './SendFish.css';

function SendFish(props: any) {
  const { isHome, userObject } = props;
  const history = useHistory();
  const fishPicRef = useRef(document.createElement('input'));
  // eslint-disable-next-line no-unused-vars
  const [imgLink, setImgLink] = useState('');

  const locationObject = useLocation();
  const locationArray = locationObject.pathname.split('/');
  const [, locationString] = locationArray;

  const handleImageUpload = async () => {
    if (fishPicRef.current.files) {
      const photoData = fishPicRef.current.files[0];
      if (photoData) {
        const photoRef = ref(
          storage,
          `images/fish_images/${userObject.username}-fish`,
        );
        // eslint-disable-next-line no-unused-vars
        const uploadTask = await uploadBytesResumable(photoRef, photoData);

        getDownloadURL(
          ref(storage, `images/fish_images/${userObject.username}-fish`),
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
          <TextareaAutosize placeholder="What's happening?" maxLength={280} />

          {imgLink !== '' ? (
            <div className="image-upload-container">
              {' '}
              <img src={imgLink} alt="upload" />{' '}
              <button type="button">X</button>
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
            <button type="button">Send Fish</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SendFish;
