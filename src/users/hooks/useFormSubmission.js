import { useState } from 'react';
import { validateEmail, validatePhone } from '../utils/validationUtils';
import { verifyBusinessEmail } from '../utils/verifyBusinessEmail';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addUserDocument } from '../access/firestore/useFirestore';

const useFormSubmission = () => {
    const [alertInfo, setAlertInfo] = useState({ message: '', severity: '' });
    const auth = getAuth();

    const handleSubmit = async (userData, userType) => {
        let errorMessage = [];

        if (!validateEmail(userData.email)) {
            errorMessage.push('Invalid email address.');
        }

        if (userType !== 'Job Seeker' && !validatePhone(userData.businessPhone)) {
            errorMessage.push('Invalid phone number format.');
        }

        // Attempt to verify business email if necessary and add any errors to the errorMessage array
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

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
            const { uid } = userCredential.user;

            // Prepare user data for Firestore (exclude password)
            const firestoreUserData = { ...userData, uid };
            delete firestoreUserData.password;

            // Add user document to Firestore
            await addUserDocument(userType, firestoreUserData);

            setAlertInfo({ message: 'Signup successful!', severity: 'success' });
        } catch (error) {
            let message = 'Signup failed. Please try again.';
            switch (error.code) {
                case 'auth/email-already-in-use':
                    message = 'Email is already in use.';
                    break;
                case 'auth/weak-password':
                    message = 'Password is too weak.';
                    break;
                default:
                    console.log(`Unexpected error code: ${error.code}`);
                    break;
            }
            setAlertInfo({ message, severity: 'error' });
        }
    };

    return { handleSubmit, alertInfo, setAlertInfo };
};

export default useFormSubmission;
