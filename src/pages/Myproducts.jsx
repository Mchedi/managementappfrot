import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Navbar2 } from "../components";
import jwt_decode from "jwt-decode";

const Myproducts = () => {
  const [products, setProducts] = useState([]);
  const [authToken, setAuthToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the authentication token from local storage
    const storedAuthToken = localStorage.getItem("accessToken");
    setAuthToken(storedAuthToken);
  }, []);

  useEffect(() => {
    if (!authToken) {
      return;
    }

    // Make an HTTP GET request to fetch the user's products
    fetch("http://localhost:9998/BackendCRM/Product/society-products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch user's products");
        }
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, [authToken]);

  return (
    <>
      <Navbar2 />
      <div>
        <h1 className="mb-4">My Products</h1>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default Myproducts;
