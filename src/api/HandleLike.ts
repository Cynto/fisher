import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from '../Firebase';

const handleLike = async (id: string) => {
  if (auth.currentUser) {
    const userRef = doc(db, 'users', auth.currentUser.uid);
    const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
    const userObject: any = userDoc.data();

    if (userObject.likes.indexOf(id) === -1) {
      const likedDate = Timestamp.now();
      await updateDoc(userRef, {
        likes: [...userObject.likes, { fishID: id, likedDate }],
      });
    }
    const fishRef = doc(db, 'fish', id);
    const fishDoc = await getDoc(fishRef);
    const fishObject: any = fishDoc.data();
    if (
      !fishObject?.likes.some((element: any) => element === userObject.username)
    ) {
      await updateDoc(fishRef, {
        likes: [...fishObject.likes, userObject.username],
      });
    }
  }
};
export default handleLike;
