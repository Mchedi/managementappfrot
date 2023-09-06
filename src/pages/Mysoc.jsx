import React, { useEffect, useState } from "react";
import { Footer, Navbar2 } from "../components";

const Mysoc = () => {
  const [societeDetails, setSocieteDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

  useEffect(() => {
    // Make an HTTP GET request to fetch societe details
    fetch("http://localhost:9998/BackendCRM/Societe/details", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${authToken}`
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch societe details");
        }
      })
      .then((data) => {
        setSocieteDetails(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        setLoading(false);
      });
  }, [authToken]);

  return (
    <>
      <Navbar2 />
      <div>
  <h1 className="mb-4">My Societe Details</h1>
  {societeDetails ? (
    <><table className="table table-bordered">
                      <thead className="thead-dark">
                          <tr>
                              <th scope="col">Property</th>
                              <th scope="col">Value</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <th scope="row">Name</th>
                              <td>{societeDetails.name}</td>
                          </tr>
                          <tr>
                              <th scope="row">Chiffre d'Affaires</th>
                              <td>{societeDetails.chiffre_affaire}</td>
                          </tr>
                          <tr>
                              <th scope="row">Matricule Fiscale</th>
                              <td>{societeDetails.maricule_fiscale}</td>
                          </tr>
                          <tr>
                              <th scope="row">Address</th>
                              <td>{societeDetails.adress}</td>
                          </tr>
                      </tbody>
                  </table><h2 className="mt-4">Worker Names:</h2><ul className="list-group">
                          {societeDetails.workerNames.map((name, index) => (
                              <li key={index} className="list-group-item">
                                  {name}
                              </li>
                          ))}
                      </ul></>
  ) : (
    <p>Loading...</p>
  )}
</div>

      <Footer />
    </>
  );
};

export default Mysoc;
