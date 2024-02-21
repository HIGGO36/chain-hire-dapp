// src/users/hooks/useFormSubmission.js
import { useState } from 'react';
import { validateEmail, validatePhone } from '../utils/validationUtils';
import { verifyBusinessEmail } from '../utils/verifyBusinessEmail';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { addUserDocument } from '../access/firestore/useFirestore';

const useFormSubmission = (navigate) => {
    const [alertInfo, setAlertInfo] = useState({ message: '', severity: '' });
    const auth = getAuth();

    const handleSubmit = async (userData, userType) => {
        let errorMessage = [];

        // Validate email
        if (!validateEmail(userData.email)) {
            errorMessage.push('Invalid email address.');
        }

        // Validate phone number format for non-Job Seekers
        if (userType !== 'Job Seeker' && !validatePhone(userData.businessPhone)) {
            errorMessage.push('Invalid phone number format.');
        }

        // Attempt to verify business email for Employer or Recruiter
        if ((userType === 'Employer' || userType === 'Recruiter') && userData.businessEmail) {
            try {
                const verificationResult = await verifyBusinessEmail(userData.businessEmail);
                if (!verificationResult.success) {
                    errorMessage.push(verificationResult.message);
                }
            } catch (error) {
                errorMessage.push('Failed to verify business email.');
            }
        }

        // Display all accumulated errors together if any
        if (errorMessage.length > 0) {
            setAlertInfo({ message: errorMessage.join(' \n'), severity: 'error' });
            return;
        }

        // Proceed with Firebase Auth user creation
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
            const { uid } = userCredential.user;

            // Prepare user data for Firestore (exclude password)
            const firestoreUserData = { ...userData, uid };
            delete firestoreUserData.password;

            // Add user document to Firestore based on userType
            await addUserDocument(userType, firestoreUserData);

            // Set success message and redirect to SignIn component
            setAlertInfo({ message: 'Signup successful!', severity: 'success' });
            navigate('/signin');
        } catch (error) {
            // Handle Firebase Auth errors
            let message = 'Signup failed. Please try again.';
            switch (error.code) {
                case 'auth/email-already-in-use':
                    message = 'Email is already in use.';
                    break;
                case 'auth/weak-password':
                    message = 'Password is too weak.';
                    break;
                default:
                    console.error(`Unexpected error code: ${error.code}`);
                    break;
            }
            setAlertInfo({ message, severity: 'error' });
        }
    };

    return { handleSubmit, alertInfo, setAlertInfo };
};

export default useFormSubmission;
