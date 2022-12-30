import React from 'react';

import './SendFish.css';
import SendFishInner from '../SendFishInner/SendFishInner';

const SendFish = (props: any) => {
  const {
    isHome,
    userObject,
    setUserObjectFunc,
    setSendFish,
    fillProfileArray,
  } = props;

  return (
    <div className={isHome ? '' : 'absolute-background-div'}>
      <div
        className={
          isHome ? 'send-fish-normal-container' : 'send-fish-absolute-container'
        }
      >
        <SendFishInner
          isHome={isHome}
          userObject={userObject}
          setUserObjectFunc={setUserObjectFunc}
          setSendFish={setSendFish}
          fillProfileArray={fillProfileArray}
          reply={false}
        />
      </div>
    </div>
  );
};

export default SendFish;
