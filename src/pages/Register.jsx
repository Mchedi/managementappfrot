import React, { useState } from 'react';
import { Footer, Navbar } from "../components";
import { Link,useNavigate} from 'react-router-dom';

const Role = {
    user: 'user',
    admin: 'admin',
    directure: 'directure',
    comptable: 'comptable',
    vendeur: 'vendeur'
};

const Register = () => {
    const [registrationStatus, setRegistrationStatus] = useState(null);
    const navigate = useNavigate(); // Use navigate for programmatic navigation


    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const jsonData = {};

        formData.forEach((value, key) => {
            jsonData[key] = value;
        });

        try {
            const response = await fetch('http://localhost:9998/BackendCRM/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonData)
            });

            if (response.ok) {
                setRegistrationStatus('success');
                navigate("/Login ");

            } else {
                setRegistrationStatus('error');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setRegistrationStatus('error');
        }
    };
    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="text-center">Register</h1>
                <hr />
                <div className="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <form onSubmit={handleSubmit}>
                            <div className="form my-3">
                                <label htmlFor="Username">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    placeholder="Enter Your name"
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="mail">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="mail"
                                    name="mail"
                                    placeholder="name@example.com"
                                />
                            </div>
                            <div className="form  my-3">
                                <label htmlFor="Password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="Password"
                                    name="password"
                                    placeholder="Password"
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="Role">Role</label>
                                <select className="form-control" id="Role" name="role">
                                    <option value={Role.user}>User</option>
                                    <option value={Role.comptable}>Comptable</option>
                                    <option value={Role.vendeur}>Vendeur</option>
                                    <option value={Role.directure}>Directure</option>
                                </select>
                            </div>
                            <div className="text-center">
                                <button className="my-2 mx-auto btn btn-dark" type="submit">
                                    Register
                                </button>
                                {registrationStatus === 'success' && (
                        <p className="text-success text-center">
        Registration successful! Please <Link to="/login">login</Link> to continue.
    </p>
)}
                            </div>
                            <div className="my-3">
                <p>already have an acount ? <Link to="/login" className="text-decoration-underline text-info">Log in </Link> </p>
              </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}


export default Register;