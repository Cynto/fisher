import React, { useState, useEffect } from 'react';
import format from 'date-fns/format';
import { Link, useHistory } from 'react-router-dom';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';

import { auth, db } from '../../Firebase';
import './InfoProfile.css';

function InfoProfile(props: any) {
  const { profile } = props;
  const [button, setButton] = useState(<button type="button">Follow</button>);

  const createdAt = format(profile.createdAt.toDate(), 'MMMM y');
  const history = useHistory();

  const handleFollow = async () => {
    if (auth.currentUser) {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
      const userObject: any = userDoc.data();
      await updateDoc(userRef, {
        following: [
          ...userObject.following,
          { name: profile.name, username: profile.username },
        ],
      });
      const userToUnfollowRef = doc(db, 'users', profile.uid);
      await updateDoc(userToUnfollowRef, {
        followers: [
          ...profile.followers,
          { name: userObject.name, username: userObject.username },
        ],
      });
    }
  };
  const handleUnfollow = async () => {
    if (auth.currentUser) {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
      const userObject: any = userDoc.data();
      const indexToDelete = userObject.following.findIndex(
        (user: any) => user.username === profile.username,
      );
      userObject.following.splice(indexToDelete, 1);

      await setDoc(userRef, userObject);

      const userToUnfollowRef = doc(db, 'users', profile.uid);
      const userToUnfollowDoc = await getDoc(doc(db, 'users', profile.uid));
      const userToUnfollowObject: any = userToUnfollowDoc.data();
      const followListIndex = userToUnfollowObject.followers.findIndex(
        (user: any) => user.username === auth.currentUser?.uid,
      );
      userToUnfollowObject.followers.splice(followListIndex, 1);

      await setDoc(userToUnfollowRef, userToUnfollowObject);
    }
  };
  let follow: any;
  let following: any;
  const unfollow = (
    <button
      className="follow-unfollow unfollow"
      type="button"
      onMouseLeave={() => setButton(following)}
      onClick={() => {
        handleUnfollow();
        setButton(follow);
      }}
    >
      Unfollow
    </button>
  );
  following = (
    <button
      className="follow-unfollow follow"
      type="button"
      onMouseEnter={() => setButton(unfollow)}
      onClick={() => {
        handleUnfollow();
        setButton(follow);
      }}
    >
      Following
    </button>
  );
  follow = (
    <button
      className="follow-button profile-button"
      type="button"
      onClick={
        auth.currentUser
          ? () => {
              handleFollow();
              setButton(following);
            }
          : () => {
              history.push('/login');
            }
      }
    >
      Follow
    </button>
  );

  useEffect(() => {
    setButton(follow);
    if (auth.currentUser?.uid === profile.uid) {
      setButton(
        <Link to={`/${profile.username}/edit_profile`}>
          <button className="edit-profile-button" type="button">
            Edit Profile
          </button>
        </Link>,
      );
    }
    if (auth.currentUser) {
      const userDoc = getDoc(doc(db, 'users', auth.currentUser.uid));
      userDoc.then((snap: any) => {
        const data = snap.data();

        if (
          data.following.some((user: any) => user.username === profile.username)
        ) {
          setButton(
            <button
              className="follow-unfollow follow"
              type="button"
              onMouseEnter={() => setButton(unfollow)}
            >
              Following
            </button>,
          );
        }
      });
    }
  }, []);
  return (
    <div className="profile-info-container">
      <div className="left-info-container">
        <div className="profile-pic-container">
          <img src={profile.profilePic} alt="profile-pic" />
        </div>
        <div className="name-username-container">
          <h3>{profile.name}</h3>
          <p>{`@${profile.username}`}</p>
        </div>
        <div className="bio-container">
          <p>{profile.bio}</p>
        </div>
        <div className="joined-container">
          <i className="fas fa-calendar-week" />
          <p>{`Joined ${createdAt}`}</p>
        </div>
        <div className="followers-following-container">
          <div className="following-container">
            <h4>{profile.following.length}</h4>
            <p>Following</p>
          </div>
          <div className="followers-container">
            <h4>{profile.followers.length}</h4>
            <p>Followers</p>
          </div>
        </div>
      </div>
      <div className="right-info-container">{button}</div>
    </div>
  );
}

export default InfoProfile;
