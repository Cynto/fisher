import React, { useRef } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { storage, db } from '../../Firebase';
import './EditProfile.css';

function EditProfile(props: any) {
  const { profile, setEditProfile, setProfileArray } = props;
  const bannerRef = useRef(document.createElement('input'));
  const profilePicRef = useRef(document.createElement('input'));

  const changeURL = async (bannerOrProfile: string, url: string) => {
    const userRef = doc(db, 'users', profile.uid);
    if (bannerOrProfile === 'banner') {
      await updateDoc(userRef, {
        bannerPic: url,
      });
    } else {
      await updateDoc(userRef, {
        profilePic: url,
      });
    }
    const userDoc = await getDoc(doc(db, 'users', profile.uid));
    const userObject = userDoc.data();
    setProfileArray((oldArray: any[]) => oldArray.map((profileObject) => {
      if (profileObject.uid === profile.uid) {
        return userObject;
      }
      return profileObject;
    }));
  };

  const handleUpload = (bannerOrProfile: string) => {
    if (bannerOrProfile === 'banner' && bannerRef.current.files) {
      const photoData = bannerRef.current.files[0];
      if (photoData) {
        const photoRef = ref(
          storage,
          `images/banners/${profile.username}-banner`,
        );
        // eslint-disable-next-line no-unused-vars
        const uploadTask = uploadBytesResumable(photoRef, photoData);

        getDownloadURL(
          ref(storage, `images/banners/${profile.username}-banner`),
        ).then((url: string) => changeURL('banner', url));
      }
    } else if (bannerOrProfile === 'profile' && profilePicRef.current.files) {
      const photoData = profilePicRef.current.files[0];
      if (photoData) {
        const photoRef = ref(
          storage,
          `images/profilePics/${profile.username}-pic`,
        );
        // eslint-disable-next-line no-unused-vars
        const uploadTask = uploadBytesResumable(photoRef, photoData);
        getDownloadURL(
          ref(storage, `images/profilePics/${profile.username}-pic`),
        ).then((url: string) => changeURL('profile', url));
      }
    }
  };

  return (
    <div className="edit-profile-container">
      <div className="top-edit-container">
        <div className="close-title-container">
          <button onClick={() => setEditProfile(false)} type="button">
            X
          </button>
          <h3>Edit Profile</h3>
        </div>

        <div className="save-container">
          <button type="button">Save</button>
        </div>
      </div>
      <div className="edit-banner-container">
        <div className="grey-div-banner" />

        <img src={profile.bannerPic} alt="banner" />
        <label className="fas fa-camera" htmlFor="banner-upload">
          <input
            onChange={() => handleUpload('banner')}
            ref={bannerRef}
            id="banner-upload"
            type="file"
          />
        </label>
      </div>
      <div className="edit-inner-container">
        <div className="edit-pic-container">
          <img src={profile.profilePic} alt="profile" />
          <div className="grey-div-pic" />
          <label className="fas fa-camera" htmlFor="pic-upload">
            <input
              onChange={() => handleUpload('profile')}
              ref={profilePicRef}
              id="pic-upload"
              type="file"
              accept=".jpeg, .jpg, .png, .webp"
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
