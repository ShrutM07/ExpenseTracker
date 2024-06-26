import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ExpenseTracker from '../ExpenseTracker/ExpenseTracker';
import './Welcome.css';

const Welcome = () => {
    const history = useHistory();
    const [verificationEmailSent, setVerificationEmailSent] = useState(false);

    const handleCompleteProfile = () => {
        history.push('/complete-profile');
    };

    const handleVerifyEmail = async () => {
        const token = localStorage.getItem('firebaseAuthToken');
        if (!token) {
            console.error('No user logged in.');
            return;
        }

        try {
            const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDiAUHJpFYnvmGAFZidGl8jkts7fj57xiI`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    requestType: 'VERIFY_EMAIL',
                    idToken: token,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Failed to send verification email:', errorData.error.message);
                return;
            }

            console.log('Verification email sent successfully.');
            setVerificationEmailSent(true);
        } catch (error) {
            console.error('Error sending verification email:', error.message);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('firebaseAuthToken');
        history.push('/');
    };

    return (
        <div className="welcome-container">
            <div className="header">
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
            <h2>Welcome to Expense Tracker</h2>
            <p>Your profile is incomplete. <a href="#" onClick={handleCompleteProfile}>Complete now.</a></p>
            <button onClick={handleVerifyEmail} disabled={verificationEmailSent}>
                {verificationEmailSent ? 'Verification Email Sent' : 'Verify Email'}
            </button>
            {verificationEmailSent && (
                <p>Check your email, you might have received a verification link. Click on it to verify.</p>
            )}
            <ExpenseTracker/>
        </div>
    );
};

export default Welcome;
