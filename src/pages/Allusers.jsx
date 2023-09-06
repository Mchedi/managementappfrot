import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Footer, Navbar2 } from "../components";


const Allusers = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Make an HTTP GET request to fetch your data
    axios.get('http://localhost:9998/BackendCRM/User/getall').then((response) => {
      setData(response.data);
    });
  }, []);
  
  return (
    <>  
          <Navbar2 />
  <div className="container mt-4">
      <h2 className="text-center">User Data</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>mail</th>
            <th>role</th>
            <th>societeWork</th>
          </tr>
        </thead>
        <tbody>
          {data.map((User) => (
            <tr key={User.id}>
              <td>{User.name}</td>
              <td>{User.mail}</td>
              <td>{User.role}</td>
              <td>
  {User.societeWork ? `This user works in ${User.societeWork.name}` : "This user does not work in any societe"}
</td>
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
