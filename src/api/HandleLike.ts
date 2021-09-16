import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../Firebase';

const handleLike = async (id: string) => {
  if (auth.currentUser) {
    const userRef = doc(db, 'users', auth.currentUser.uid);
    const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
    const userObject: any = userDoc.data();
    
    if (userObject.likes.indexOf(id) === -1) {
      
      await updateDoc(userRef, {
        likes: [...userObject.likes, id],
      });
    }
  }
};
export default handleLike;
