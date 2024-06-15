import React, { useState } from 'react';
import './ForgotPassword.css';



const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSendLink = async () => {
        setLoading(true);
        setMessage('');
        try {
            const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDiAUHJpFYnvmGAFZidGl8jkts7fj57xiI`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    requestType: 'PASSWORD_RESET',
                    email: email,
                }),
            });

            const data = await response.json();

            setLoading(false);

            if (!response.ok) {
                setMessage(`Error: ${data.error.message}`);
                return;
            }

            setMessage('You would receive a password reset link in your mail id which you entered above.');
        } catch (error) {
            setLoading(false);
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div className="forgot-password-container">
            <h2>Forgot Password</h2>
            <p>Enter the email you have registered</p>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
                required
                disabled={loading}
            />
            <button onClick={handleSendLink} disabled={loading}>
                {loading ? 'Sending...' : 'Send Link'}
            </button>
            {loading && <div className="loader"></div>}
            {message && <p>{message}</p>}
        </div>
    );
};

export default ForgotPassword;
