import React, { useState, useEffect } from 'react';
import { Footer, Navbar3 } from "../components";

const AllSoc = () => {
  const [data, setData] = useState([]);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

  useEffect(() => {
    // Make an HTTP GET request to fetch societe details
    fetch('http://localhost:9998/BackendCRM/Societe/getall2', {
    method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${authToken}`
      },
    })
    

      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, [authToken]); // Include authToken in the dependency array if it might change

  return (
    <>
      <Navbar3 />
      <div className="container mt-4">
        <h2 className="text-center">Societe Data</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Chiffre Affaire</th>
              <th>Maricule Fiscale</th>
              <th>Address</th>
              <th>Creator</th>
            </tr>
          </thead>
          <tbody>
            {data.map((societe) => (
              <tr key={societe.id}>
                <td>{societe.name}</td>
                <td>{societe.chiffre_affaire}</td>
                <td>{societe.maricule_fiscale}</td>
                <td>{societe.adress}</td>
                <td>{societe.creatorName || "this user "}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default AllSoc;
