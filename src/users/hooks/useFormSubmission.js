// src/users/hooks/useFormSubmission.js
import { useState } from 'react';
import { validateEmail, validatePhone } from '../utils/validationUtils';

const useFormSubmission = (navigate) => {
    const [alertInfo, setAlertInfo] = useState({ message: '', severity: '' });

    const handleSubmit = async (userData, userType) => {
        let errorMessage = [];

        // Perform client-side validation for immediate feedback
        if (!validateEmail(userData.email)) {
            errorMessage.push('Invalid email address.');
        }
        if (userType !== 'Job Seeker' && !validatePhone(userData.businessPhone)) {
            errorMessage.push('Invalid phone number format.');
        }

        if (errorMessage.length > 0) {
            setAlertInfo({ message: errorMessage.join(' \n'), severity: 'error' });
            return;
        }

        // Send data to the server for processing
        try {
            const response = await fetch('http://localhost:3001/api/users/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...userData, userType }),
            });
            const data = await response.json();

            if (data.success) {
                setAlertInfo({ message: 'Signup successful! Please sign in.', severity: 'success' });
                navigate('/signin');
            } else {
                setAlertInfo({ message: data.message || 'Signup failed. Please try again.', severity: 'error' });
            }
        } catch (error) {
            console.error("Signup error:", error);
            setAlertInfo({ message: 'Network or server error during signup.', severity: 'error' });
        }
    };

    return { handleSubmit, alertInfo };
};

export default useFormSubmission;
