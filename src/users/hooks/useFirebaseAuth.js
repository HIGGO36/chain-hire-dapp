// src/users/hooks/useFirebaseAuth.js
import { useState, useContext, createContext } from 'react';
import { getAuth, signInWithEmailAndPassword, signOut as firebaseSignOut } from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({ status: 'idle', user: null, error: null });

  const signIn = async (email, password) => {
    try {
      const auth = getAuth();
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      setAuthState({ status: 'authenticated', user, error: null });
      return 'success';
    } catch (error) {
      console.error("Error signing in:", error);
      setAuthState({ status: 'error', user: null, error: error.message });
      return 'error';
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(getAuth());
      setAuthState({ status: 'idle', user: null, error: null });
    } catch (error) {
      console.error("Error signing out:", error);
      setAuthState({ status: 'error', user: authState.user, error: error.message });
    }
  };

  return (
    <AuthContext.Provider value={{ authState, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
