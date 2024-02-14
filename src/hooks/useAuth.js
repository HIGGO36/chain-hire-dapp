import { useState, useEffect } from 'react';
import app from '../config/firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth(app);

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { auth, user };
};

