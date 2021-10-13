import React, { useState, useEffect } from 'react';
import uniqid from 'uniqid';
import {
  getDoc,
  doc,
  query,
  where,
  collection,
  getDocs,
} from 'firebase/firestore';
import { db } from '../../Firebase';
import SendFishInner from '../SendFishInner/SendFishInner';
import createTimeStamp from '../../api/CreateTimestamp';
import SingleFish from '../SingleFish/SingleFish';

function HomePage(props: any) {
  const { userObject, setUserObjectFunc } = props;
  const [homePageFishArray, setHomePageFishArray] = useState<any[]>([]);

  const fillHomePageArray = async () => {
    const newArray: any[] = [];
    const updatedDoc: any = await getDoc(doc(db, 'users', userObject.uid));
    const updatedUserObject = updatedDoc.data();

    await Promise.all(
      updatedUserObject.fish.map(async (item: any, index: number) => {
        const fishRef = await getDoc(doc(db, 'fish', item.fishID));
        if (fishRef.exists()) {
          const fishObject = fishRef.data();
          if (!fishObject.reply) {
            fishObject.refish = updatedUserObject.fish[index].refish;
            fishObject.date = createTimeStamp(fishObject);
            fishObject.fishedAt = updatedUserObject.fish[index].createdAt;
            newArray.push(fishObject)
          }
        }
      }),
    );

    await Promise.all(
      updatedUserObject.following.map(async (user: any) => {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('username', '==', user.username));

        const querySnapshot = await getDocs(q);

        const followingUserArray: any[] = [];
        querySnapshot.forEach((userDoc) => {
          const follwingUserObject = userDoc.data();
          followingUserArray.push(follwingUserObject);
        });

        await Promise.all(
          followingUserArray.map(async (fUser) => {
            await Promise.all(
              fUser.fish.map(async (item: any, index: number) => {
                const fishRef = await getDoc(doc(db, 'fish', item.fishID));

                if (fishRef.exists()) {
                  const fishObject = fishRef.data();
                  if (!fishObject.reply) {
                    console.log(fishObject);

                    fishObject.refish = fUser.fish[index].refish;
                    fishObject.date = createTimeStamp(fishObject);
                    fishObject.fishedAt = fUser.fish[index].createdAt;

                    newArray.push(fishObject);
                  }
                }
              }),
            );
          }),
        );
      }),
    );
    newArray.sort(
      (a: any, b: any) => a.fishedAt.toDate() - b.fishedAt.toDate(),
    );

    newArray.reverse();
    setHomePageFishArray(newArray);
  };

  useEffect(() => {
    if (userObject.uid) {
      fillHomePageArray();
    }
  }, [userObject]);
  return (
    <div className="home-page">
      <div className="profile-inner">
        <h2>Home</h2>
        <SendFishInner
          reply={false}
          isHome
          userObject={userObject}
          setUserObjectFunc={setUserObjectFunc}
        />
        <div className="all-fish-container">
          {homePageFishArray.length >= 1
            ? homePageFishArray.map((item: any) => (
                <SingleFish
                  setUserObjectFunc={setUserObjectFunc}
                  item={item}
                  profile={userObject}
                  userObject={userObject}
                  key={uniqid()}
                  fillProfileFishArray={fillHomePageArray}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
