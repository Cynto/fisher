import { useState, useEffect } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { query, getDocs, collection } from 'firebase/firestore';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';

import { db } from './Firebase';

function App() {
  const [profileArray, setProfileArray] = useState([]);
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
  }, []);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          {profileArray.map((profile: any) => (
            <Route key={profile.uid} exact path={`/${profile.username}`}>
              <Profile profile={profile} />
            </Route>
          ))}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
