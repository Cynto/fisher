import { useState, useEffect } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { query, getDocs, collection, getDoc, doc } from 'firebase/firestore';
import { auth, db } from './Firebase';

import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import MainNav from './components/MainNav/MainNav';
import SendFish from './components/SendFish/SendFish';
import EditProfile from './components/EditProfile/EditProfile';

function App() {
  const [profileArray, setProfileArray] = useState([]);
  const [userObject, setUserObject] = useState({ profilePic: '', likes: [] });

  const setUserObjectFunc = async () => {
    console.log(auth);
    if (auth.currentUser) {
      const userDoc: any = await getDoc(doc(db, 'users', auth.currentUser.uid));

      setUserObject(userDoc.data());
    }
  };
  const fillProfileArray = async () => {
    const proArray: any = [];
    const q = query(collection(db, 'users'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((snap) => {
      proArray.push(snap.data());
    });
    setProfileArray(proArray);
  };

  useEffect(() => {
    fillProfileArray();
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserObjectFunc();
      }
    });
  }, []);
  useEffect(() => {
    console.log(profileArray);
  }, [profileArray]);
  
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          {profileArray.map((profile: any) => (
            <Route key={profile.uid} path={`/${profile.username}`}>
              <Route path={`/${profile.username}/edit_profile`}>
                <EditProfile
                  profileArray={profileArray}
                  setProfileArray={setProfileArray}
                  profile={profile}
                />
              </Route>
              <Route path={`/${profile.username}/compose_fish`}>
                <SendFish userObject={userObject} isHome={false} />
              </Route>
              <MainNav userObject={userObject}/>
              <Profile
                profileArray={profileArray}
                setProfileArray={setProfileArray}
                profile={profile}
                userObject={userObject}
                setUserObjectFunc={setUserObjectFunc}
              />
            </Route>
          ))}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
