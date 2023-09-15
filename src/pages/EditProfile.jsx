import React, { useState } from 'react';
import { Navarloggeduser, Footer } from '../components';
import { Navigate } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";



const EditProfile = () => {
    const navigate = useNavigate();

    const [authToken] = useState(localStorage.getItem('authToken'));

    const [updatedUser, setUpdatedUser] = useState({
        name: '',      // Initialize with user's existing name
        mail: '',      // Initialize with user's existing mail
        password: '',  // Initialize with user's existing password
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleUpdateProfile = async () => {
        try {
            const response = await fetch('http://localhost:9998/BackendCRM/User/updateMyInfo', {
                method: 'Put',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify(updatedUser),
            });
    
            if (response.ok) {
                navigate("/HomeLoggedUser");
                console.log('User information updated successfully.');
            } else {
                // Handle errors, e.g., show an error message
                console.error('Error updating user information:', response.statusText);
            }
        } catch (error) {
            // Handle network errors or other exceptions
            console.error('An error occurred:', error.message);
        }
    };

    return (
        <>
            <Navarloggeduser />
            <div className="edit-profile">
                <h2>Edit Profile</h2>
                <form>
                    {/* Input fields for user profile data */}
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={updatedUser.name}
                        onChange={handleInputChange}
                    />
                    <input
                        type="email"
                        name="mail"
                        placeholder="Email"
                        value={updatedUser.mail}
                        onChange={handleInputChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={updatedUser.password}
                        onChange={handleInputChange}
                    />
                  
                    <button type="button" className="btn btn-outline-dark m-2" onClick={handleUpdateProfile}>
                        Update Profile 
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default EditProfile;
