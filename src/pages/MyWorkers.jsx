import React, { useEffect, useState } from "react";
import { Navbar2, Footer } from "../components";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";


const MyWorkers = () => {
  // State and functions for modal and worker data
  const [open, setOpen] = useState(false);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    workerEmail: "",
    user: "",
    role: "",
  });
  const [users, setUsers] = useState([]); // State to store users
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
    
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFire = (comptableEmail) => {
    // Handle the fire action by making a POST request to the API
    fetch(`http://localhost:9998/BackendCRM/Societe/deleteComptable/${comptableEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${authToken}`
      },
    })
      .then((response) => {
        if (response.ok) {
          // Handle a successful response (e.g., show a success message)
          console.log("Comptable has been sacked from the societe");
          // You can also refresh the worker data or update the UI accordingly
          window.location.reload();

        } else {
          throw new Error("Failed to fire comptable");
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        // Handle the error (e.g., show an error message)
      });
  };

  const handleAddButton = () => {
    // Construct the request data based on your form values
    const requestData = {
      workerEmail: formData.workerEmail,
      name: formData.user,
      role: formData.role,
    };

    // Send a POST request to invite the worker
    fetch("http://localhost:9998/BackendCRM/Societe/inviteComptable", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        console.log("Response status:", response.status);
        if (response.ok) {
          console.log("Comptable invited and associated with the director's societe");
          setFormData({
            workerEmail: "",
            user: "",
            role: "",
          });
          navigate("/MyWorkers");
        } else {
          return response.text().then((errorText) => {
            throw new Error(`Failed to invite comptable. Error: ${errorText}`);
          });
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        // Handle the error (e.g., show an error message)
      });
  };

  useEffect(() => {
    // Fetch users from the API when the component mounts
    fetch("http://localhost:9998/BackendCRM/User/getmyusersinfo", {
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
          throw new Error("Failed to fetch users");
        }
      })
      .then((data) => {
        setUsers(data); // Update the users state with the fetched data
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);

  return (
    <>
      <Navbar2 />
      <div>
        <h1 className="mb-4">My Workers</h1>
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Mail</th>
              <th>Role</th>
              <th>Action</th>

            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.mail}</td>
                  <td>{user.role}</td>
                  <td>
                          <button
                            className="btn btn-primary"
                          //  onClick={() => handlePromote(index)}
                          >
                            Promote
                          </button>
                         <button
  className="btn btn-danger"
  onClick={() => handleFire(user.mail)}
>
  Fire
</button>

                        </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No worker details available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Button onClick={handleOpen}>Invite by mail</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Invite User
          </Typography>
          <TextField
            label="workerEmail"
            name="workerEmail"
            value={formData.workerEmail}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Username"
            name="user"
            value={formData.user}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Button onClick={handleAddButton}>Add</Button>
        </Box>
      </Modal>
      <Footer />
    </>
  );
};

export default MyWorkers;
