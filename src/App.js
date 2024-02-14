import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth'; 
import { useAuth } from '../src/hooks/useAuth';
import AppBar from './components/AppBar';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

function App() {
  const { auth } = useAuth(); // Destructure 'auth' from the custom hook
  const [currentUser, setCurrentUser] = useState(null); // Rename 'user' to 'currentUser'
  const [signUpCompleted, setSignUpCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if there's already a signed-in user on page load
    const initialUser = auth.currentUser;
    if (initialUser) {
      setCurrentUser(initialUser);
      setSignUpCompleted(true);
      setLoading(false);
    } else {
      setLoading(false); // If no initial user, stop loading immediately
    }

    // Listen for authentication state changes
    onAuthStateChanged(auth, (user) => {
      console.log("Current user:", user);
      setCurrentUser(user);
      if (user) {
        setSignUpCompleted(true);
      }
    });

  }, [auth]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <AppBar />
      {!currentUser && !signUpCompleted && <SignUp />}
      {!currentUser && <SignIn />}
    </div>
  );
}

export default App;
