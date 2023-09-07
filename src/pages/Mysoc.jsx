import React, { useEffect, useState } from "react";
import { Footer, Navbar2 } from "../components";

const Mysoc = () => {
  const [societeDetails, setSocieteDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [inviteMail, setInviteMail] = useState(""); // New state for the invite mail input

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

  const handleInvite = () => {
    // Handle the invite action by making a POST request to the API
    fetch(`http://localhost:9998/BackendCRM/Societe/inviteComptable/${inviteMail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${authToken}`
      },
    })
      .then((response) => {
        if (response.ok) {
          // Handle a successful response (e.g., show a success message)
          console.log("Comptable invited and associated with the director's societe");
          // Clear the inviteMail input field
          window.location.reload();

          setInviteMail("");
        } else {
          throw new Error("Failed to invite comptable");
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
              {/* ... Table for societe details ... */}
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

            <div className="mt-4">
              <h2>Invite User:</h2>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  style={{ width: '250px' }} // Set the width using inline CSS
                  value={inviteMail}
                  onChange={(e) => setInviteMail(e.target.value)}
                />
              </div>
              <button
                className="btn btn-primary"
                onClick={handleInvite} // Call the handleInvite function on button click
              >
                Invite
              </button>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Mysoc;
