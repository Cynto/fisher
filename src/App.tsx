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
    console.log('updated');
  };

  useEffect(() => {
    fillProfileArray();
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserObjectFunc();
      }
    });
  }, []);

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
                <SendFish
                  userObject={userObject}
                  isHome={false}
                  setUserObjectFunc={setUserObjectFunc}
                  fillProfileArray={fillProfileArray}
                />
              </Route>
              <MainNav userObject={userObject} />
              <Profile
                profileArray={profileArray}
                setProfileArray={setProfileArray}
                profile={profile}
                userObject={userObject}
                setUserObjectFunc={setUserObjectFunc}
                fillProfileArray={fillProfileArray}
              />
            </Route>
          ))}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
