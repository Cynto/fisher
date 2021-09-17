import React, { useState, useEffect } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import './ProfileFish.css';

import { db } from '../../Firebase';
import SingleFish from '../SingleFish/SingleFish';

function ProfileFish(props: any) {
  const { profile, userObject, setUserObjectFunc } = props;
  // eslint-disable-next-line no-unused-vars
  const [profileFishArray, setProfileFishArray] = useState<any[]>([]);

  const fillProfileFishArray = async () => {
    profile.fish.forEach(async (item: any) => {
      const fishRef = doc(db, 'fish', item.fishID);
      const fishSnap = await getDoc(fishRef);
      if (fishSnap.exists()) {
        const fishObject = fishSnap.data();
        fishObject.refish = item.refish;
        //  checking for duplicates
        if (
          !profileFishArray.some(
            (element: any) => element.fishID === item.fishID,
          )
        ) {
          setProfileFishArray((oldArray: any[]) => [...oldArray, fishObject]);
        }
      }
    });
  };
  useEffect(() => {
    fillProfileFishArray();
  }, []);
  return (
    <div className="all-fish-container">
      {profileFishArray.length >= 1
        ? profileFishArray.map((item: any) => (
            <SingleFish setUserObjectFunc={setUserObjectFunc} item={item} profile={profile} userObject={userObject}/>
          ))
        : null}
    </div>
  );
}

export default ProfileFish;
