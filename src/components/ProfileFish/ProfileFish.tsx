import React, { useState, useEffect } from 'react';
import {
  query,
  getDocs,
  where,
  collection,
  getDoc,
  doc,
} from 'firebase/firestore';
import uniqid from 'uniqid';

import './ProfileFish.css';
import { addDays, compareAsc, format} from 'date-fns';
import { db } from '../../Firebase';
import SingleFish from '../SingleFish/SingleFish';

function ProfileFish(props: any) {
  const { profile, userObject, setUserObjectFunc } = props;
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
          dateToUse = `${secondToUse - 1}s`;
        }
      }
    } else {
      const dayToUse = format(createdDate, 'd MMM');
      dateToUse = dayToUse;
    }
    return dateToUse;
  };

  const fillProfileFishArray = async () => {
    const updatedDoc: any = await getDoc(doc(db, 'users', profile.uid));
    const updatedProfile = updatedDoc.data();
    const newArray: any[] = [];
    const fishQuery = query(
      collection(db, 'fish'),
      where('username', '==', profile.username),
    );
    const querySnapshot = await getDocs(fishQuery);
    querySnapshot.forEach((docu: any) => {
      const fishObject = docu.data();
      if (fishObject) {
        const indexOfFish = updatedProfile.fish.findIndex(
          (element: any) => element.fishID === fishObject.fishID,
        );

        if (indexOfFish !== -1) {
          fishObject.refish = updatedProfile.fish[indexOfFish].refish;
          fishObject.date = createTimeStamp(fishObject);

          newArray.push(fishObject);
        }
      }
    });
    newArray.reverse();
    setProfileFishArray(newArray);
  };

  useEffect(() => {
    fillProfileFishArray();
  }, []);
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
