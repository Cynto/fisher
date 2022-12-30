import { useState, useEffect } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { query, getDocs, collection, getDoc, doc } from 'firebase/firestore';
import { auth, db } from './Firebase';

import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import MainNav from './components/MainNav/MainNav';
import DetailedFish from './components/DetailedFish/DetailedFish';
import HomePage from './components/HomePage/HomePage';
import Footer from './components/Footer/Footer';

const App = () => {
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
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <div className="main-content">
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
              </div>
            }
          />
          <Route
            path="/home"
            element={
              <div className="main-content">
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
              </div>
            }
          />

          <Route
            path="/:username/fish/:fishID"
            element={
              <div className="main-content">
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
              </div>
            }
          />
          <Route
            path="/:username/*"
            element={
              <div className="main-content">
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
              </div>
            }
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
