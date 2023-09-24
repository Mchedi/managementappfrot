import React, { useEffect, useState } from "react";
import { Navbar2, Footer } from "../components";
import { Link, useNavigate } from "react-router-dom";

const AllSub = () => {
  const [suboptions, setSuboptions] = useState([]);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch suboptions from the API when the component mounts
    fetch("http://localhost:9998/BackendCRM/subOption/getall", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${authToken}` // Make sure you have authToken defined
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch suboptions");
        }
      })
      .then((data) => {
        setSuboptions(data);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);

const purchaseSubscription = (subId) => {
  fetch(`http://localhost:9998/BackendCRM/Societe/Purchase_sub/${subId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${authToken}`
    },
  })
    .then((response) => {
      if (response.ok) {
        navigate("/Mysoc");
        console.log("Subscription purchased successfully!");
      } else {
        // Handle error by logging the status and response body
        console.error(`Failed to purchase subscription. Status: ${response.status}`);
        return response.json().then((errorData) => {
          console.error("Error details:", errorData);
        });
      }
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
};

  
  return (
    <>
      <Navbar2   />
      <div className="container mt-4">
        <h2>Available Suboptions</h2>
        <div className="row">
          {suboptions.map((suboption, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{suboption.name}</h5>
                  <p className="card-text">Maximum Number of Vendors: {suboption.maximumNumberOfVendors}</p>
                  <p className="card-text">Maximum Number of Products: {suboption.maximumNumberOfProducts}</p>
                  <p className="card-text">Comtable: {suboption.comtable ? "Yes" : "No"}</p>
                  <p className="card-text">Price: {suboption.price}</p>
                  <button className="btn btn-outline-dark m-2" onClick={() => purchaseSubscription(suboption.id)}>Buy Sub</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllSub;
