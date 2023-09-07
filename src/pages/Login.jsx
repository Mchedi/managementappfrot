import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";
import jwt_decode from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState(null); // State to store the user's role
  const navigate = useNavigate(); // Use navigate for programmatic navigation
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:9998/BackendCRM/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mail: email,
          password: password
        })
      });

      if (response.ok) {
        const data = await response.json();
        const accessToken = data.accessToken;
        localStorage.setItem('accessToken', accessToken);
        const decodedToken = jwt_decode(accessToken);
        const userEmail = decodedToken.sub;

        // Fetch user role after successful login
        fetchUserRole(accessToken);

        localStorage.setItem('userEmail', userEmail);
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  // Function to fetch the user's role
  const fetchUserRole = async (accessToken) => {
    try {
      const response = await fetch('http://localhost:9998/BackendCRM/api/auth/user-role', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const role = data.role;
        setUserRole(role);

        // Store user role in local storage
        localStorage.setItem('userRole', role);
        localStorage.setItem('authToken', accessToken); // Store the auth token in local storage
        //setAuthToken(accessToken);
        // Redirect based on user role
        if (role === 'directure') {
          navigate("/createsociete");
        }
        else if (role === 'admin') {
          navigate("/Home3");
        }
        
        else {
          navigate("/");
        }
      } else {
        console.error('Failed to fetch user role');
      }
    } catch (error) {
      console.error('An error occurred while fetching user role:', error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
            <div className="my-3">
                <label htmlFor="display-4">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="my-3">
                <label htmlFor="floatingPassword display-4">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="my-3">
                <p>New Here? <Link to="/register" className="text-decoration-underline text-info">Register</Link> </p>
              </div>
                            <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
      {userRole && <p>User Role: {userRole}</p>}
    </>
  );
};

export default Login;
