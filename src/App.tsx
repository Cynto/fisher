import { useState, useEffect } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { query, getDocs, collection, getDoc, doc } from 'firebase/firestore';
import { auth, db } from './Firebase';

import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import MainNav from './components/MainNav/MainNav';
import DetailedFish from './components/DetailedFish/DetailedFish';
import HomePage from './components/HomePage/HomePage';
import Footer from './components/Footer/Footer';

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
        <div className="main-content">
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route exact path="/">
              <MainNav
                userObject={userObject}
                isHome={false}
                setUserObjectFunc={setUserObjectFunc}
                fillProfileArray={fillProfileArray}
              />
              <HomePage
                userObject={userObject}
                setUserObjectFunc={setUserObjectFunc}
              />
            </Route>
            <Route exact path="/home">
              <MainNav
                userObject={userObject}
                isHome={false}
                setUserObjectFunc={setUserObjectFunc}
                fillProfileArray={fillProfileArray}
              />
              <HomePage
                userObject={userObject}
                setUserObjectFunc={setUserObjectFunc}
              />
            </Route>
            <Route path="/:username/fish/:fishID">
              <MainNav
                userObject={userObject}
                isHome={false}
                setUserObjectFunc={setUserObjectFunc}
                fillProfileArray={fillProfileArray}
              />
              <DetailedFish
                userObject={userObject}
                setUserObjectFunc={setUserObjectFunc}
              />
            </Route>
            <Route path="/:username">
              <MainNav
                userObject={userObject}
                isHome={false}
                setUserObjectFunc={setUserObjectFunc}
                fillProfileArray={fillProfileArray}
              />
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
        <Footer />
      </div>
    </Router>
  );
}

export default App;
