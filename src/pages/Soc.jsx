import React, { useState } from 'react';
import { Footer, Navbar } from "../components";
import { Link } from 'react-router-dom';



const Soc = () => {
    const [registrationStatus, setRegistrationStatus] = useState(null);
    const authToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjaGVkaW1pbGVkQGdtYWlsLmNvbSIsImlhdCI6MTY5MzQxMTE3MiwiZXhwIjoxNjkzNDEyMTcyfQ.wT41XP-1wULOppA0y6mAKshpX48kLvkShhBXgErRYIc'; // Replace this with the actual authentication token

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const jsonData = {};

        formData.forEach((value, key) => {
            jsonData[key] = value;
        });

        try {
            const response = await fetch('http://localhost:9998/BackendCRM/Societe/addAndAssignUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}` // Include the auth token in the header
                },
                body: JSON.stringify(jsonData)
            });

            if (response.ok) {
                setRegistrationStatus('success');
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
                                <label htmlFor="name">Soc Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    placeholder="Enter Your name"
                                />
                            </div>
                            
                            <div className="form my-3">
                                <label htmlFor="chiffre_affaire">Chiffre d'Affaires</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="chiffre_affaire"
                                    name="chiffre_affaire"
                                    placeholder="Chiffre d'Affaires"
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="maricule_fiscale">Matricule Fiscale</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="maricule_fiscale"
                                    name="maricule_fiscale"
                                    placeholder="Matricule Fiscale"
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="adress">Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="adress"
                                    name="adress"
                                    placeholder="Address"
                                />
                            </div>
                            <div className="text-center">
                                <button className="my-2 mx-auto btn btn-dark" type="submit">
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Soc;
