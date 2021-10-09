import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useParams, Link, Route, withRouter } from 'react-router-dom';
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
import DetailedButtons from './DetailedButtons/DetailedButtons';
import ReplyPrompt from '../ReplyPrompt/ReplyPrompt';
import CommentsContainer from '../CommentsContainer/CommentsContainer';
import SendFishInner from '../SendFishInner/SendFishInner';
import createTimeStamp from '../../api/CreateTimestamp';
import SingleFish from '../SingleFish/SingleFish';

function DetailedFish(props: any) {
  const { userObject, setUserObjectFunc } = props;
  const [profile, setProfile] = useState<any>({});
  const [fishObject, setFishObject] = useState<any>({});
  const [originalFishArray, setOriginalFishArray] = useState<any>([]);
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
  const getOriginal = async (item: any) => {
    console.log(item);
    if (item.reply) {
      const originalFishDoc = await getDoc(
        doc(db, 'fish', item.originalFishID),
      );
      if (originalFishDoc.exists()) {
        const originalFishObject = originalFishDoc.data();
        originalFishObject.date = createTimeStamp(originalFishObject);
        if(originalFishObject.reply){
          await getOriginal(originalFishObject)
        }
        setOriginalFishArray((oldArray: any[]) => {
          const newArray = oldArray.filter(
            (arrayItem) => arrayItem.fishID !== originalFishObject.fishID,
          );
          return [...newArray, originalFishObject];
        });
      }
    }
  };
  useEffect(() => {
    getProfile();
  }, [fishID]);
  useEffect(() => {
    getProfile();
  }, []);
  useEffect(() => {
    if (profile !== {}) {
      getFish();
    }
  }, [profile]);
  useEffect(() => {
    getOriginal(fishObject);
  }, [fishObject]);
  useEffect(() => {
    console.log(originalFishArray);
  }, [originalFishArray]);
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
      {fishObject.reply
        ? originalFishArray.map((item: any) => (
            <SingleFish item={item} userObject={userObject} />
          ))
        : null}
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
      {fishObject.reply ? (
        <div className="replying-to-container" style={{ marginTop: '10px' }}>
          <p style={{ marginLeft: 0 }}>Replying to</p>
          <p style={{ color: 'orange', marginLeft: '5px' }}>
            @{fishObject.username}
          </p>
        </div>
      ) : null}
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

      <DetailedButtons
        getFish={getFish}
        userObject={userObject}
        fishObject={fishObject}
        setUserObjectFunc={setUserObjectFunc}
      />
      <div
        className="replying-to-container"
        style={{ marginTop: '30px', marginLeft: '65px' }}
      >
        <p>Replying to</p>
        <p style={{ color: 'orange', marginLeft: '5px' }}>
          @{fishObject.username}
        </p>
      </div>
      <SendFishInner
        reply
        isHome
        userObject={userObject}
        setUserObjectFunc={setUserObjectFunc}
        fishObject={fishObject}
        getFish={getFish}
      />
      <CommentsContainer
        getFish={getFish}
        userObject={userObject}
        fishObject={fishObject}
        setUserObjectFunc={setUserObjectFunc}
      />
      <Route path="/:username/fish/:fishID/reply">
        <ReplyPrompt
          userObject={userObject}
          fishObject={fishObject}
          setUserObjectFunc={setUserObjectFunc}
        />
      </Route>
    </div>
  );
}

export default withRouter(DetailedFish);
