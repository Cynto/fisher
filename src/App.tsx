import { useState, useEffect } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { query, getDocs, collection, getDoc, doc } from 'firebase/firestore';
import { auth, db } from './Firebase';

import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import MainNav from './components/MainNav/MainNav';
import DetailedFish from './components/DetailedFish/DetailedFish';
import HomePage from './components/HomePage/HomePage';

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

  useEffect(() => {
    console.log(profileArray);
  }, [profileArray]);

  return (
    <Router>
      <div className="App">
        <MainNav
          userObject={userObject}
          isHome={false}
          setUserObjectFunc={setUserObjectFunc}
          fillProfileArray={fillProfileArray}
        />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/home">
            <HomePage
              userObject={userObject}
              setUserObjectFunc={setUserObjectFunc}
            />
          </Route>
          <Route path="/:username/fish/:fishID">
            <DetailedFish
              userObject={userObject}
              setUserObjectFunc={setUserObjectFunc}
            />
          </Route>
          <Route path="/:username">
            <Profile
              profileArray={profileArray}
              setProfileArray={setProfileArray}
              userObject={userObject}
              setUserObjectFunc={setUserObjectFunc}
              fillProfileArray={fillProfileArray}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
