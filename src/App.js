import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AppBar from './components/AppBar';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Button from '@mui/material/Button';

function App() {
  const [user, setUser] = useState(null); // Tracks the user's authentication state
  const [initialCheckDone, setInitialCheckDone] = useState(false); // Indicates initial auth check completion

  useEffect(() => {
    const auth = getAuth();
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setInitialCheckDone(true); // Mark initial check as done after receiving the current user status
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log("User signed out successfully");
    }).catch((error) => {
      console.error("Error signing out:", error);
    });
  };

  return (
    <div>
      <AppBar/>
      {/* Show SignUp component only if it's a first-time visit (no user and initial check done) */}
      {!user && initialCheckDone && <SignUp />}
      {/* Show SignIn component only if there's no user logged in (consider adding additional control if needed) */}
      {!user && <SignIn />}
      {user && (
        <div>
          <p>Welcome, {user.email}</p>
          <Button variant="contained" color="secondary" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      )}
    </div>
  );
}

export default App;
