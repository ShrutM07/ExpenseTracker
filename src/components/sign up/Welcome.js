import React from 'react';
import { useHistory } from 'react-router-dom';

const Welcome = () => {
    const history = useHistory();

    const handleCompleteProfile = () => {
        // Redirect to profile completion page
        history.push('/complete-profile');
    };

    return (
        <div className="welcome-container">
            <h2>Welcome to Expense Tracker</h2>
            <p>Your profile is incomplete. <span onClick={handleCompleteProfile} style={{ cursor: 'pointer', color: 'blue' }}>Complete now</span>.</p>
        </div>
    );
};

export default Welcome;
