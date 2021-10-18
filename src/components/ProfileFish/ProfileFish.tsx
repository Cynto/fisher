import React, { useState, useEffect } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import uniqid from 'uniqid';
import './ProfileFish.css';
import { db } from '../../Firebase';
import SingleFish from '../SingleFish/SingleFish';
import createTimeStamp from '../../api/CreateTimestamp';

function ProfileFish(props: any) {
  const { profile, userObject, setUserObjectFunc, profileArray } = props;
  // eslint-disable-next-line no-unused-vars
  const [profileFishArray, setProfileFishArray] = useState<any[]>([]);

  const fillProfileFishArray = async () => {
    const newArray: any[] = [];
    const updatedDoc: any = await getDoc(doc(db, 'users', profile.uid));
    const updatedProfile = updatedDoc.data();

    await Promise.all(
      updatedProfile.fish.map(async (item: any, index: number) => {
        const fishRef = await getDoc(doc(db, 'fish', item.fishID));
        if (fishRef.exists()) {
          const fishObject = fishRef.data();
          if (!fishObject.reply) {
            fishObject.refish = updatedProfile.fish[index].refish;
            fishObject.date = createTimeStamp(fishObject);
            fishObject.fishedAt = updatedProfile.fish[index].createdAt;
            newArray.push(fishObject);
          }
        }
      }),
    );
    newArray.sort(
      (a: any, b: any) => a.fishedAt.toDate() - b.fishedAt.toDate(),
    );
    newArray.reverse();
    setProfileFishArray(newArray);
  };

  useEffect(() => {
    fillProfileFishArray();
  }, [profileArray, profile]);
  
  return (
    <div className="all-fish-container">
      {profileFishArray.length >= 1
        ? profileFishArray.map((item: any) => (
            <SingleFish
              setUserObjectFunc={setUserObjectFunc}
              item={item}
              profile={profile}
              userObject={userObject}
              key={uniqid()}
              fillProfileFishArray={fillProfileFishArray}
            />
          ))
        : null}
    </div>
  );
}

export default ProfileFish;
