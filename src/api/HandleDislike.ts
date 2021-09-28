import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../Firebase';

const handleDislike = async (id: string) => {
  if (auth.currentUser) {
    const userRef = doc(db, 'users', auth.currentUser.uid);
    const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
    const userObject: any = userDoc.data();
    userObject.likes = userObject.likes.filter(
      (element: any) => element.fishID !== id,
    );

    await setDoc(userRef, userObject);

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
