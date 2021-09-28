import React, { useState, useEffect } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import uniqid from 'uniqid'
import { db } from '../../Firebase';
import createTimeStamp from '../../api/CreateTimestamp';
import SingleFish from '../SingleFish/SingleFish';

function ProfileLikes(props: any) {
  // eslint-disable-next-line no-unused-vars
  const { profile, userObject, setUserObjectFunc, profileArray } = props;
  // eslint-disable-next-line no-unused-vars
  const [profileFishArray, setProfileFishArray] = useState<any[]>([]);

  const fillProfileFishArray = async () => {
    const newArray: any[] = [];
    const updatedDoc: any = await getDoc(doc(db, 'users', profile.uid));
    const updatedProfile = updatedDoc.data();
    updatedProfile.likes.sort(
      (a: any, b: any) => a.likedDate.toDate() - b.likedDate.toDate(),
    );

    await Promise.all(
      updatedProfile.likes.map(async (item: any, index: number) => {
        const fishRef = await getDoc(doc(db, 'fish', item.fishID));
        if (fishRef.exists()) {
          const fishObject = fishRef.data();

          fishObject.refish = updatedProfile.fish[index].refish;
          fishObject.date = createTimeStamp(fishObject);

          newArray.push(fishObject);
        }
      }),
    );

    newArray.reverse();
    setProfileFishArray(newArray);
  };

  useEffect(() => {
    fillProfileFishArray();
  }, [profileArray]);
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

export default ProfileLikes;
