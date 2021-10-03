import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import uniqid from 'uniqid';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { setDoc, doc, Timestamp, getDoc } from 'firebase/firestore';
import { storage, db } from '../../Firebase';

function SendFishInner(props: any) {
  const {
    userObject,
    setUserObjectFunc,
    setSendFish,
    fillProfileArray,
    fishObject,
    reply,
    isHome,
    getFish,
  } = props;

  const fishPicRef = useRef(document.createElement('input'));
  // eslint-disable-next-line no-unused-vars
  const [imgLink, setImgLink] = useState('');
  const [ID, setID] = useState('');

  const history = useHistory();

  const handleFish = async () => {
    const userDoc = await getDoc(doc(db, 'users', userObject.uid));
    const updatedUserObject: any = userDoc.data();
    const fishText = document.getElementById(
      'fish-text',
    ) as HTMLTextAreaElement;
    const time = Timestamp.now();

    let fishID = ID;
    if (fishID === '') {
      fishID = uniqid();
    }
    if (fishText.value !== '' || imgLink !== '') {
      const newFishObject = {
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
        reply,
        replyUsername: reply ? fishObject.username : '',
        originalFishID: reply ? fishObject.fishID : '',
      };
      await setDoc(doc(db, 'fish', fishID), newFishObject);
      const userFish = {
        refish: false,
        fishID,
        createdBy: userObject.username,
        createdAt: time,
      };
      const newUserObject = updatedUserObject;
      newUserObject.fish.push(userFish);
      await setDoc(doc(db, 'users', updatedUserObject.uid), newUserObject);

      if (reply) {
        const updatedOriginalFishDoc = await getDoc(
          doc(db, 'fish', fishObject.fishID),
        );
        if (updatedOriginalFishDoc.exists()) {
          const updatedOriginalFish = updatedOriginalFishDoc.data();
          updatedOriginalFish.comments.push(fishID);
          await setDoc(doc(db, 'fish', fishObject.fishID), updatedOriginalFish);
        }
      }

      await setUserObjectFunc();
      if (fillProfileArray) {
        await fillProfileArray();
      }
      if (getFish) {
        getFish();
        const textArea = document.getElementById(
          'fish-text',
        ) as HTMLTextAreaElement;
        if (textArea) {
          textArea.value = '';
        }
      }
    }
  };

  const handleImageUpload = async () => {
    if (fishPicRef.current.files) {
      const photoData = fishPicRef.current.files[0];
      const photoID = uniqid();
      setID(photoID);
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
    <div
      style={reply ? {} : { marginTop: '30px' }}
      className={
        isHome
          ? 'send-fish-inner-container'
          : 'send-fish-inner-absolute-container'
      }
    >
      <div
        className="exit-fish-pic-container"
        style={reply ? {} : { justifyContent: 'center', marginTop: '30px' }}
      >
        {' '}
        {!reply ? (
          <button
            className="exit-fish-button"
            type="button"
            onClick={() => setSendFish(false)}
          >
            X
          </button>
        ) : null}
        <img src={userObject.profilePic} alt="profile" />
      </div>
      <div
        className="right-compose-fish-container"
        style={reply ? { marginRight: '10px' } : { marginTop: '10px' }}
      >
        <TextareaAutosize
          id="fish-text"
          placeholder={reply ? 'Fish your reply' : "What's happening?"}
          maxLength={280}
          style={reply ? { marginTop: 0 } : {}}
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
              if (reply) {
                history.push(
                  `/${fishObject.username}/fish/${fishObject.fishID}`,
                );
              } else {
                setSendFish(false);
              }
            }}
          >
            Send Fish
          </button>
        </div>
      </div>
    </div>
  );
}

export default SendFishInner;