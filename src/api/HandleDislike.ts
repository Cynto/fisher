import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../Firebase';

const handleDislike = async (id: string) => {
  if (auth.currentUser) {
    const userRef = doc(db, 'users', auth.currentUser.uid);
    const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
    const userObject: any = userDoc.data();
    const indexToDelete = userObject.likes.indexOf(id);
    userObject.likes.splice(indexToDelete, 1);
    if (userObject.likes.indexOf(id) === -1) {
      await setDoc(userRef, userObject);
    }
    const fishRef = doc(db, 'fish', id);
    const fishDoc = await getDoc(fishRef);
    const fishObject: any = fishDoc.data();
    const fishIndexToDelete = fishObject.likes.indexOf(userObject.username);
    fishObject.likes.splice(fishIndexToDelete, 1);
    if (fishObject.likes.indexOf(userObject.username) === -1) {
      await setDoc(fishRef, fishObject);
    }
  }
};
export default handleDislike;
