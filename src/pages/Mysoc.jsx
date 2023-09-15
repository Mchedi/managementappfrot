  import React, { useEffect, useState } from "react";
  import { Footer, Navbar2 } from "../components";
  import Box from '@mui/material/Box';
  import Button from '@mui/material/Button';
  import Typography from '@mui/material/Typography';
  import Modal from '@mui/material/Modal';
  import TextField from '@mui/material/TextField';
  import jwt_decode from "jwt-decode";



  const Mysoc = () => {
    const [societeDetails, setSocieteDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
    const [inviteMail, setInviteMail] = useState(""); // New state for the invite mail input
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [formData, setFormData] = useState({
      workerEmail: "",
      user: "",
      role: "",
    });
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
    
    const handleAddButton = () => {
      // Construct the request data based on your form values
      const requestData = {
        workerEmail: formData.workerEmail,
        name: formData.user,
        role: formData.role,
      };fetch("http://localhost:9998/BackendCRM/Societe/inviteComptable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => {
          if (response.ok) {
            console.log("Comptable invited and associated with the director's societe");
            setFormData({
              workerEmail: "",
              user: "",
              role: "",
            });
            handleClose(); // Close the modal
            window.location.reload();
          } else {
            throw new Error("Failed to invite comptable");
          }
        })
        .catch((error) => {
          console.error("An error occurred:", error);
          // Handle the error (e.g., show an error message)
        });
    };


    

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
    
  
    
    useEffect(() => { 
      // Make an HTTP GET request to fetch societe details
      fetch("http://localhost:9998/BackendCRM/Societe/details", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${authToken}`
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to fetch societe details");
          }
        })
        .then((data) => {
          setSocieteDetails(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("An error occurred:", error);
          setLoading(false);
        });
    }, [authToken]);
    const decodedToken = jwt_decode(authToken);

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
 
    
   
    

    return (
      <>
        <Navbar2 />
        <div>
          <h1 className="mb-4">My Societe Details</h1>
          {societeDetails ? (
            <>
              <table className="table table-bordered">
              <table className="table table-bordered">
    <tbody>
      <tr>
        <th scope="row">Name</th>
        <td>{societeDetails.name}</td>
      </tr>
      <tr>
        <th scope="row">Chiffre d'Affaires</th>
        <td>{societeDetails.chiffre_affaire}</td>
      </tr>
      <tr>
        <th scope="row">Matricule Fiscale</th>
        <td>{societeDetails.maricule_fiscale}</td>
      </tr>
      <tr>
        <th scope="row">Address</th>
        <td>{societeDetails.adress}</td>
      </tr>
    </tbody>
  </table>
              </table>

              <h2 className="mt-4">Worker details:</h2>
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
                  {societeDetails &&
                  societeDetails.workerNames &&
                  societeDetails.workermail &&
                  societeDetails.workerrole ? (
                    societeDetails.workerNames.map((name, index) => (
                      <tr key={index}>
                        <td>{name}</td>
                        <td>{societeDetails.workermail[index]}</td>
                        <td>{societeDetails.workerrole[index]}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                          //  onClick={() => handlePromote(index)}
                          >
                            Promote
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleFire(societeDetails.workermail[index])}
                          >
                            Fire
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">No worker details available.</td>
                    </tr>
                  )}
                </tbody>
              </table>

        

            </>
          ) : (
            <p>Loading...</p>
          )}
          
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
            label="Worker Email"
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

  export default Mysoc;
