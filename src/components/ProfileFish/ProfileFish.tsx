import React, { useState, useEffect } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import uniqid from 'uniqid';

import './ProfileFish.css';
import { addDays, compareAsc, format } from 'date-fns';
import { db } from '../../Firebase';
import SingleFish from '../SingleFish/SingleFish';

function ProfileFish(props: any) {
  const { profile, userObject, setUserObjectFunc, profileArray } = props;
  // eslint-disable-next-line no-unused-vars
  const [profileFishArray, setProfileFishArray] = useState<any[]>([]);

  const createTimeStamp = (fishObject: any) => {
    const createdDate: any = fishObject.createdAt.toDate();
    const dayAfterDate = addDays(new Date(createdDate), 1);
    const currentDate: any = new Date();
    let dateToUse: string = '0';

    //  checks if fish was made less than a day ago
    if (compareAsc(dayAfterDate, currentDate) === 1) {
      const hourToUse = Math.floor(Math.abs(currentDate - createdDate) / 36e5);
      dateToUse = `${hourToUse}h`;

      if (hourToUse <= 0) {
        let differenceUnformatted = Math.abs(currentDate - createdDate) / 1000;
        differenceUnformatted /= 60;
        const minuteToUse = Math.abs(Math.floor(differenceUnformatted));
        dateToUse = `${minuteToUse}m`;
        if (minuteToUse <= 0) {
          const secondToUse = Math.floor(
            (currentDate.getTime() - createdDate.getTime()) / 1000,
          );
          dateToUse = `${secondToUse}s`;
        }
      }
    } else {
      const dayToUse = format(createdDate, 'd MMM');
      dateToUse = dayToUse;
    }
    return dateToUse;
  };

  const fillProfileFishArray = async () => {
    const newArray: any[] = [];
    const updatedDoc: any = await getDoc(doc(db, 'users', profile.uid));
    const updatedProfile = updatedDoc.data();
    await Promise.all( updatedProfile.fish.map(async (item: any, index: number) => {
      const fishRef = await getDoc(doc(db, 'fish', item.fishID));
      if (fishRef.exists()) {
        const fishObject = fishRef.data();

        fishObject.refish = updatedProfile.fish[index].refish;
        fishObject.date = createTimeStamp(fishObject);

        newArray.push(fishObject);
      }
      
    }));
    
    newArray.reverse();
    console.log(newArray)
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

export default ProfileFish;
