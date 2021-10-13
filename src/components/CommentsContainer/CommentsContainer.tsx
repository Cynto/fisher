import React, { useState, useEffect } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import uniqid from 'uniqid'
import { db } from '../../Firebase';
import createTimeStamp from '../../api/CreateTimestamp';

import SingleFish from '../SingleFish/SingleFish';

function CommentsContainer(props: any) {
  const { userObject, fishObject, setUserObjectFunc } = props;
  const [commentsArray, setCommentsArray] = useState<any>([]);

  const fillCommentsArray = async () => {
    const newArray: any = [];
    if(fishObject.comments) {
      await Promise.all(
        fishObject.comments.map(async (fishID: string) => {
          console.log(fishID);
          const commentRef = await getDoc(doc(db, 'fish', fishID));
          if (commentRef.exists()) {
            const commentObject = commentRef.data();
  
            commentObject.date = createTimeStamp(commentObject);
  
            newArray.push(commentObject);
          }
        }),
      );
    }
    
    newArray.reverse();
    setCommentsArray(newArray);
  };
  useEffect(() => {
    if (fishObject) {

      fillCommentsArray();
    }
  }, [fishObject]);
  return (
    <div className="comments-container">
      {commentsArray.map((item: any) => (
        <SingleFish reply key={uniqid()} item={item} userObject={userObject} setUserObjectFunc={setUserObjectFunc}/>
      ))}
    </div>
  );
}

export default CommentsContainer;
