import React, { useState ,useEffect} from "react";
import { Footer, Navbar2 } from "../components";
import { Link, useNavigate } from "react-router-dom";


const Sub = () => {
  const [authToken, setAuthToken] = useState(null); // State to store the authentication token
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    durationinmonths: 0, // Set an initial value for DurationInMonths
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    // Retrieve the authentication token from local storage
    const storedAuthToken = localStorage.getItem('accessToken');
    setAuthToken(storedAuthToken);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Obtain the user token from your authentication system

      const response = await fetch("http://localhost:9998/BackendCRM/sub/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`, // Include the token in the Authorization header
        },
        body: JSON.stringify(formData), // Include the form data in the request body
      });

      if (response.ok) {
        // Handle a successful response
        console.log("Subscription added successfully!");
        // Navigate to /home2
        navigate("/Mysoc");       } else {
        // Handle an error response
        console.error("Error adding subscription");
      }
    } catch (error) {
      // Handle network errors
      console.error("Network error:", error);
    }
  };

  return (
    <>
     <Navbar2 />
              <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-4 mt-5">
              <h2 className="text-center mb-4">Create Subscription</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="durationinmonths" className="form-label">
                    Duration in Months:
                  </label>
                  <input
                    type="number"
                    id="durationinmonths"
                    name="durationinmonths"
                    className="form-control"
                    value={formData.durationinmonths}
                    onChange={handleChange}
                  />
                </div>
                <div className="text-center">
                  <button className="btn btn-dark" type="submit">
                    Purchase Subscription
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />

    </>
  );
};

export default Sub;
