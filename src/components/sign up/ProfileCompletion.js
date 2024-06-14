import React, { useState, useEffect } from 'react';

const ProfileCompletion = () => {
    const [fullName, setFullName] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [currentUser, setCurrentUser] = useState(null); // State to hold current user data

    useEffect(() => {
        // Retrieve current user from localStorage on component mount
        const storedUser = JSON.parse(localStorage.getItem('currentUser'));
        setCurrentUser(storedUser);
    }, []);

    const handleUpdate = async () => {
        try {
            if (!currentUser || !currentUser.idToken) {
                console.error('No user logged in or invalid token.');
                return;
            }

            const { idToken } = currentUser;

            const updateProfileUrl = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDiAUHJpFYnvmGAFZidGl8jkts7fj57xiI`;

            const response = await fetch(updateProfileUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idToken,
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

            console.log('User profile updated successfully.');
        } catch (error) {
            console.error('Error updating profile:', error.message);
        }
    };

    const handleCancel = () => {
        // Handle cancel action (e.g., navigate back or close modal)
        console.log('Cancel clicked');
    };

    if (!currentUser) 

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
