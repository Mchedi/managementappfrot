import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Footer, Navbar3 } from "../components";


const Allusers = () => {
  const [data, setData] = useState([]);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

  useEffect(() => {
    // Make an HTTP GET request to fetch societe details
    fetch('http://localhost:9998/BackendCRM/User/alldtos', {
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
      <h2 className="text-center">User Data</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>mail</th>
            <th>role</th>
          </tr>
        </thead>
        <tbody>
          {data.map((User) => (
            <tr key={User.id}>
              <td>{User.name}</td>
              <td>{User.mail}</td>
              <td>{User.role}</td>
  
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Footer />

    </>
  );
};

export default Allusers
