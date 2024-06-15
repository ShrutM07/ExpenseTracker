import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './signup.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDiAUHJpFYnvmGAFZidGl8jkts7fj57xiI`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    returnSecureToken: true,
                }),
            });
            const data = await response.json();
            if (data.error) {
                setError(data.error.message);
            } else {
                console.log('User has successfully logged in.');
                // Store token in localStorage
                localStorage.setItem('firebaseAuthToken', data.idToken);
                // Redirect to dashboard or welcome screen
                history.push('/welcome');
            }
        } catch (err) {
            console.error('Error logging in:', err);
            setError('Failed to log in. Please check your credentials.');
        }
    };

    const handleForgotPassword = () => {
        history.push('/forgot-password');
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
                <div className="form-group">
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Login</button>
                <button type="button" className="forgot-password" onClick={handleForgotPassword}>Forgot Password?</button>
                <div className="signup-link">
                    Don't have an account? <button type="button" onClick={() => history.push('/signup')}>Sign up</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
