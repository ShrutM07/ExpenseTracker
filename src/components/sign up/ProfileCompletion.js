import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const ProfileCompletion = () => {
    const [fullName, setFullName] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [currentUser, setCurrentUser] = useState(null); 
    const history = useHistory();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('firebaseAuthToken');

                if (!token) {
                    console.error('No user logged in.');
                    return;
                }

                const userResponse = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDiAUHJpFYnvmGAFZidGl8jkts7fj57xiI`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idToken: token,
                    }),
                });

                if (!userResponse.ok) {
                    console.error('Failed to fetch user data:', userResponse.statusText);
                    return;
                }

                const userData = await userResponse.json();
                setCurrentUser(userData.users[0]); // Assuming there's only one user

                // Pre-fill form fields with user data
                setFullName(userData.users[0]?.displayName || '');
                setPhotoUrl(userData.users[0]?.photoURL || '');
            } catch (error) {
                console.error('Error fetching user data:', error.message);
            }
        };

        fetchUserProfile();
    }, []); // Empty dependency array ensures this runs only once on mount

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('firebaseAuthToken');

            if (!token || !currentUser) {
                console.error('No user logged in or invalid token.');
                return;
            }

            const updateProfileUrl = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDiAUHJpFYnvmGAFZidGl8jkts7fj57xiI`;

            const response = await fetch(updateProfileUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idToken: token,
                    displayName: fullName,
                    photoUrl,
                    returnSecureToken: true,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Failed to update profile:', errorData.error.message);
                return;
            }

            // Update state and notify user
            setCurrentUser({ ...currentUser, displayName: fullName, photoURL: photoUrl });
            console.log('User profile updated successfully.');
        } catch (error) {
            console.error('Error updating profile:', error.message);
        }
    };

    const handleCancel = () => {
        // Navigate back to the welcome page
        history.push('/welcome');
    };

    if (!currentUser) {
        return <div>Loading...</div>; // Handle initial loading state if needed
    }

    return (
        <div className="profile-completion-container">
            <h2>Complete Your Profile</h2>
            <form>
                <div className="form-group">
                    <label>Full Name:</label>
                    <input 
                        type="text" 
                        value={fullName} 
                        onChange={(e) => setFullName(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Profile Photo URL:</label>
                    <input 
                        type="text" 
                        value={photoUrl} 
                        onChange={(e) => setPhotoUrl(e.target.value)} 
                        required 
                    />
                </div>
                <div className="button-group">
                    <button type="button" onClick={handleCancel}>Cancel</button>
                    <button type="button" onClick={handleUpdate}>Update</button>
                </div>
            </form>
        </div>
    );
};

export default ProfileCompletion;
