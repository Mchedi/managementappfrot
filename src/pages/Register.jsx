import React, { useState, useEffect } from 'react';
import { Footer, Navbar2 } from '../components';

const TableWithFields = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:9998/BackendCRM/Societe/getall');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
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
            </tr>
          </thead>
          <tbody>
            {data.map((societe) => (
              <tr key={societe.id}>
                <td>{societe.Name}</td>
                <td>{societe.chiffre_affaire}</td>
                <td>{societe.maricule_fiscale}</td>
                <td>{societe.adress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default TableWithFields;
