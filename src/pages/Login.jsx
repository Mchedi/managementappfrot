import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";
import jwt_decode from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

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

        // Fetch user role and society existence after successful login
        fetchUserRole(accessToken, userEmail);
      } else {
        setMessage('Login failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  // Function to fetch the user's role and check society existence
  const fetchUserRole = async (accessToken, userEmail) => {
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

        // Fetch society existence
        const societyResponse = await fetch('http://localhost:9998/BackendCRM/Societe/verifsoc', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (societyResponse.ok) {
          const hasSociety = await societyResponse.json();

          // Fetch subscription existence
          const subResponse = await fetch('http://localhost:9998/BackendCRM/Societe/verifsub', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (subResponse.ok) {
            const hasSubscription = await subResponse.json();

            // Store user role and society existence in local storage
            localStorage.setItem('userRole', role);
            localStorage.setItem('authToken', accessToken);

            // Redirect based on user role, society existence, and subscription existence
            if (role === 'directure') {
              if (hasSociety) {
                if (hasSubscription) {
                  navigate("/Mysoc");
                } else {
                  navigate("/Sub");
                }
              } else {
                navigate("/createsociete");
              }
            } else if (role === 'admin') {
              navigate("/Home3");
            } else {
              navigate("/HomeLoggedUser");
            }
          } else {
            console.error('Failed to fetch subscription existence');
            navigate("/Sub"); // Navigate to /Sub on failure
          }
        } else {
          console.error('Failed to fetch society existence');
          navigate("/createsociete"); // Navigate to /createsociete on failure
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
                {message}
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
