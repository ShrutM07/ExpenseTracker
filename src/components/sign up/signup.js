import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './signup.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const history = useHistory();

    const isFormValid = email && password && confirmPassword && (password === confirmPassword);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        if (isFormValid) {
            try {
                const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDiAUHJpFYnvmGAFZidGl8jkts7fj57xiI`, {
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
                    setSuccess('User successfully created. You can now log in.');
                    history.push('/login'); // Redirect to login page after successful signup
                }
            } catch (err) {
                setError(err.message);
            }
        }
    };

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2>Signup</h2>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input 
                        id="email"
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input 
                        id="password"
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input 
                        id="confirmPassword"
                        type="password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" disabled={!isFormValid}>Submit</button>
                <div className="login-link">
                    Already have an account? <button type="button" onClick={() => history.push('/login')}>Login</button>
                </div>
            </form>
        </div>
    );
};

export default Signup;
