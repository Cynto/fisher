import React, {useState, useEffect} from 'react';
import format from 'date-fns/format';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { useHistory } from 'react-router-dom';
import { auth, db } from '../../Firebase';
import './InfoProfile.css';

function InfoProfile(props: any) {
  const { profile, setEditProfile, setProfileArray } = props;
  const [button, setButton] = useState(<button type="button">Follow</button>)

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
      const userToFollowRef = doc(db, 'users', profile.uid);
      await updateDoc(userToFollowRef, {
        followers: [
          ...profile.followers,
          { name: userObject.name, username: userObject.username },
        ],
      });

      setProfileArray((oldArray: any[]) =>
        oldArray.map((user) => {
          if (user.uid === auth.currentUser?.uid) {
            user.following.push({
              name: profile.name,
              username: profile.username,
            });
            return user;
          }
          return user;
        }),
      );
    }
  };
  
  useEffect(() => {
    setButton(
      <button
        className="follow-button profile-button"
        type="button"
        onClick={
          auth.currentUser
            ? handleFollow
            : () => {
                history.push('/login');
              }
        }
      >
        Follow
      </button>
    );
    if (auth.currentUser?.uid === profile.uid) {
      setButton(
        <button
          className="edit-profile-button"
          type="button"
          onClick={() => setEditProfile(true)}
        >
          Edit Profile
        </button>
      );
    }
    if (auth.currentUser) {
      const userDoc = getDoc(doc(db, 'users', auth.currentUser.uid));
      userDoc.then((snap: any) => {
        const data = snap.data();
        
        if(data.following.some((user: any) => user.username === profile.username)) {
          setButton(<button className="profile-button" type="button">Following</button>)
        }
        
      })
    }
  }, [])
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
            <p>Following</p>
          </div>
        </div>
      </div>
      <div className="right-info-container">{button}</div>
    </div>
  );
}

export default InfoProfile;
