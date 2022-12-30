import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { storage, db } from '../../Firebase';
import './EditProfile.css';

const EditProfile = (props: any) => {
  const { profile, setEditProfile, setProfileArray} = props;
  const bannerRef = useRef(document.createElement('input'));
  const profilePicRef = useRef(document.createElement('input'));
  const nameRef = useRef(document.createElement('input'));
  const bioRef = useRef(document.createElement('textarea'));


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
    const newUserObject = userDoc.data();
    setProfileArray((oldArray: any[]) =>
      oldArray.map((profileObject) => {
        if (profileObject.uid === profile.uid) {
          return newUserObject;
        }
        return profileObject;
      }),
    );
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
 

  const handleFormSubmit = async () => {
    const name = nameRef.current.value;
    const bio = bioRef.current.value;
    const userRef = doc(db, 'users', profile.uid);
    if (name !== '' && name !== profile.name) {
      await updateDoc(userRef, {
        name,
      });
    }
    if (bio !== '' && bio !== profile.bio) {
      await updateDoc(userRef, {
        bio,
      });
    }
    const userDoc = await getDoc(doc(db, 'users', profile.uid));
    const newUserObject = userDoc.data();
    setProfileArray((oldArray: any[]) =>
      oldArray.map((profileObject) => {
        if (profileObject.uid === profile.uid) {
          return newUserObject;
        }
        return profileObject;
      }),
    );
  };

  return (
    <div className="absolute-background-div">
      <div className="edit-profile-container">
        <div className="top-edit-container">
          <div className="close-title-container">
            <Link to={`/${profile.username}`}>
              <button type="button">X</button>
            </Link>
            <h3>Edit Profile</h3>
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
              accept=".jpeg, .jpg, .png, .webp"
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
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="edit-group">
              <div className="input-container">
                <input
                  ref={nameRef}
                  defaultValue={profile.name}
                  id="name"
                  type="text"
                />
                <div className="edit-border-div" />
                <p>Name</p>
              </div>
            </div>
            <div className="edit-group group-textarea">
              <div className="input-container text-area-container">
                <textarea
                  id="bio-textarea"
                  maxLength={160}
                  defaultValue={profile.bio}
                  ref={bioRef}
                />
                <div id="bio-border" className="edit-border-div" />
                <p>Bio</p>
              </div>
            </div>
            <div className="save-container">
              <button
                type="submit"
                onClick={() => {
                  setEditProfile(false);
                  handleFormSubmit();
                }}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
