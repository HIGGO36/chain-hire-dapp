// src/hooks/useAuth.js
import { app } from '../config/firebaseConfig';
import { getAuth } from 'firebase/auth';

const auth = getAuth(app);

// Export a function or custom hook that uses `auth`
export const useAuth = () => {
  // Authentication functionality goes here
};
