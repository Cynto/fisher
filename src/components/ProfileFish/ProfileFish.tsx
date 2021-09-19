import React, { useState, useEffect } from 'react';
import { query, getDocs, where, collection } from 'firebase/firestore';
import uniqid from 'uniqid';

import './ProfileFish.css';
import { addDays, compareAsc, format } from 'date-fns';
import { db } from '../../Firebase';
import SingleFish from '../SingleFish/SingleFish';

function ProfileFish(props: any) {
  const { profile, userObject, setUserObjectFunc } = props;
  // eslint-disable-next-line no-unused-vars
  const [profileFishArray, setProfileFishArray] = useState<any[]>([]);

  const createTimeStamp = (fishObject: any) => {
    const createdDate = fishObject.createdAt.toDate();
    const dayAfterDate = addDays(new Date(createdDate), 1);
    const currentDate = new Date();
    let dateToUse: string = '0';

    //  checks if fish was made less than a day ago
    if (compareAsc(dayAfterDate, currentDate) === 1) {
      dateToUse = format(createdDate, 'k');
      const currentHour = Number(format(currentDate, 'k'));
      const hourToUse = currentHour - Number(dateToUse);

      if (Math.sign(hourToUse) === -1) {
        dateToUse = `${23 + hourToUse}h`;
      } else {
        dateToUse = `${hourToUse - 1}h`;
        if (hourToUse - 1 <= 0) {
          console.log(hourToUse - 1);
          const createdMinute = Number(format(createdDate, 'm'));
          const currentMinute = Number(format(currentDate, 'm'));
          const minuteToUse = currentMinute - createdMinute;
          dateToUse = `${minuteToUse - 1}m`;
          if (minuteToUse - 1 <= 0) {
            const createdSecond = Number(format(createdDate, 's'));
            const currentSecond = Number(format(currentDate, 's'));
            const secondToUse = currentSecond - createdSecond;
            dateToUse = `${secondToUse - 1}s`;
            if (Math.sign(secondToUse) === -1) {
              dateToUse = `${secondToUse + 60}s`;
            }
          }
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
    const fishQuery = query(
      collection(db, 'fish'),
      where('username', '==', profile.username),
    );
    const querySnapshot = await getDocs(fishQuery);
    querySnapshot.forEach((docu: any) => {
      const fishObject = docu.data();
      if (fishObject) {
        const indexOfFish = profile.fish.findIndex(
          (element: any) => element.fishID === fishObject.fishID,
        );
        if (indexOfFish !== -1) {
          fishObject.refish = profile.fish[indexOfFish].refish;
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
    console.log(userObject);
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
