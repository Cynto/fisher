import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useParams, Link } from 'react-router-dom';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from 'firebase/firestore';
import { db } from '../../Firebase';
import './DetailedFish.css';

function DetailedFish() {
  const [profile, setProfile] = useState<any>({});
  const [fishObject, setFishObject] = useState<any>({});
  const { username, fishID } =
    useParams<{ username: string; fishID: string }>();

  const getProfile = async () => {
    const q = query(
      collection(db, 'users'),
      where('usernameLower', '==', username.toLowerCase()),
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((document) => {
      setProfile(document.data());
    });
  };
  const getFish = async () => {
    const fishDoc = await getDoc(doc(db, 'fish', fishID));
    if (fishDoc.exists()) {
      const newFishObject = fishDoc.data();
      const dateUnformatted = newFishObject.createdAt.toDate();
      const dateFormatted = format(dateUnformatted, 'p · d MMM, y');
      newFishObject.date = dateFormatted;
      setFishObject(newFishObject);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  useEffect(() => {
    if (profile !== {}) {
      getFish();
    }
  }, [profile]);
  return (
    <div className="detailed-fish-container">
      <div className="profile-top">
        <div className="top-button-container">
          <button type="button" onClick={() => window.history.back()}>
            <i className="fas fa-arrow-left" />
          </button>
          <h2 id="detailed-fish-title">Fish</h2>
        </div>
      </div>
      <div className="detailed-profile-name-container">
        <img
          src={profile.profilePic}
          alt="profile"
          className="detailed-profile-pic"
        />
        <Link to={`/${username}`} style={{ textDecoration: 'none' }}>
          <div className="detailed-name-username-container">
            <h4>{profile.name}</h4>
            <p>@{profile.username}</p>
          </div>
        </Link>
      </div>
      <div className="detailed-fish-text-container">
        <p>{fishObject.fishText}</p>
      </div>
      {fishObject.imgLink !== '' ? (
        <div className="detailed-fish-image-container">
          <img src={fishObject.imgLink} alt="User uploaded" />
        </div>
      ) : null}
      <div className="detailed-date-container">
        <p>{fishObject.date}</p>
      </div>
      <div className="detailed-stats-container">
        <p className="bold">{fishObject?.comments?.length}</p>
        <p className="grey-p">Comments</p>
        <p className="bold">{fishObject?.refishArray?.length}</p>
        <p className="grey-p">Refish</p>

        <p className="bold">{fishObject?.likes?.length}</p>
        <p className="grey-p">Likes</p>
      </div>
    </div>
  );
}

export default DetailedFish;
