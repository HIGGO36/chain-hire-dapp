// src/hooks/useFirestore.js
import { app } from '../config/firebaseConfig';
import { getFirestore } from 'firebase/firestore';

const db = getFirestore(app);

// Export a function or custom hook that uses `db`
export const useFirestore = () => {
  // Firestore functionality goes here
};
