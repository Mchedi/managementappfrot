import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Footer, Navbar2 } from "../components";


const TableWithFields = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Make an HTTP GET request to fetch your data
    axios.get('http://localhost:9998/BackendCRM/Societe/getall').then((response) => {
      setData(response.data);
    });
  }, []);
  
  return (
    <>  
          <Navbar2 />
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
              <td>{societe.Name}</td>
              <td>{societe.chiffre_affaire}</td>
              <td>{societe.maricule_fiscale}</td>
              <td>{societe.adress}</td>
              <td>{societe.creator}</td> {/* Assuming 'creator' contains the creator's name */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Footer />

    </>
  );
};

export default TableWithFields
