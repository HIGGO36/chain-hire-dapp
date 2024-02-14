import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import AppBar from './components/AppBar';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

function App() {
  const [user, setUser] = useState(null);
  const [signUpCompleted, setSignUpCompleted] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Current user:", currentUser); // Log current user
      setUser(currentUser);
      // Check if the user is logged in and the sign-up is completed
      if (currentUser && !signUpCompleted) {
        setSignUpCompleted(true);
      }
    });
    return () => unsubscribe();
  }, [signUpCompleted]); // Add signUpCompleted as a dependency

  const onSignUpSuccess = () => {
    console.log("Sign up successful!"); // Log sign up success
    setSignUpCompleted(true);
    console.log("SignUp Completed:", signUpCompleted); // Log signUpCompleted value
  };

  return (
    <div>
      <AppBar />
      {/* Render SignUp component only if the user is not logged in and the sign-up is not completed */}
      {!user && !signUpCompleted && <SignUp onSignUpSuccess={onSignUpSuccess} />}
      {/* Render SignIn component only if the user is not logged in */}
      {!user && <SignIn />}
    </div>
  );
}

export default App;
