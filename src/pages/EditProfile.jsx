import React, { useState, useEffect } from 'react';
import { Navarloggeduser, Footer } from '../components';
import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
    const navigate = useNavigate();
    const [authToken] = useState(localStorage.getItem('authToken'));
    const [userProfile, setUserProfile] = useState(undefined);

    const [updatedUser, setUpdatedUser] = useState({
        name: '',
        mail: '',
        password: '',
    });

    useEffect(() => {
        // Fetch user data when the component mounts
        fetch('http://localhost:9998/BackendCRM/User/getbyid', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                // Handle errors, e.g., show an error message
                console.error('Error fetching user data:', response.statusText);
            }
        })
        .then((data) => {
            // Set the fetched user data as placeholders
            setUpdatedUser({
                name: data.name,
                mail: data.mail,
                password: data.password, // You may choose to keep the password empty or not fetch it at all
            });
        })
        .catch((error) => {
            // Handle network errors or other exceptions
            console.error('An error occurred:', error.message);
        });
    }, [authToken]);

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
            <div className="edit-profile mx-auto" style={{maxWidth:"1200px", paddingTop:"40px"}}>
                <h2>Edit Profile</h2>
                <div style={{display:"flex", flexDirection:"column" , maxWidth:"300px" , gap:"10px" , paddingTop:"20px"}}>
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
                </div>
            </div>
            <Footer />
        </>
    );
}

export default EditProfile;
