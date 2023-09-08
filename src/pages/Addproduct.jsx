    import React, { useState, useEffect } from "react";
    import { Link, useNavigate } from "react-router-dom";
    import jwt_decode from "jwt-decode";
    import { Footer, Navbar, Navbar2 } from "../components";

    const Addproduct = () => {
      const [product, setProduct] = useState({
        name: "",
        price: "",
        category: ""
      });
      const [registrationStatus, setRegistrationStatus] = useState(null);
      const [authToken, setAuthToken] = useState(null); // State to store the authentication token
      const navigate = useNavigate();

      useEffect(() => {
        // Retrieve the authentication token from local storage
        const storedAuthToken = localStorage.getItem("accessToken");
        setAuthToken(storedAuthToken);
      }, []);

      const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const jsonData = {};

        formData.forEach((value, key) => {
          jsonData[key] = value;
        });

        try {
          const response = await fetch(
            "http://localhost:9998/BackendCRM/Product/add",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}` // Include the auth token in the header
              },
              body: JSON.stringify(jsonData)
            }
          );

          if (response.ok) {
            setRegistrationStatus("success");
            // Redirect to the desired route, e.g., "/createsociete"
            navigate("/createsociete");
          } else {
            setRegistrationStatus("error");
          }
        } catch (error) {
          console.error("An error occurred:", error);
          setRegistrationStatus("error");
        }
      };

      return (
        <>
          <Navbar2 />
          <div className="container my-3 py-3">
            <h1 className="text-center">Add Product</h1>
            <hr />
            <div className="row my-4 h-100">
              <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                <form onSubmit={handleSubmit}>
                  <div className="form my-3">
                    <label htmlFor="name">Product Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Enter Product Name"
                    />
                  </div>

                  <div className="form my-3">
                    <label htmlFor="price">Price</label>
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      name="price"
                      placeholder="Price"
                    />
                  </div>
                  <div className="form my-3">
                    <label htmlFor="category">Category</label>
                    <input
                      type="text"
                      className="form-control"
                      id="category"
                      name="category"
                      placeholder="Category"
                    />
                  </div>

                  <div className="text-center">
                    <button className="my-2 mx-auto btn btn-dark" type="submit">
                      Add Product
                    </button>
                  
                  </div>
                </form>
              </div>
            </div>
          </div>
          <Footer />
        </>
      );
    };

    export default Addproduct;
