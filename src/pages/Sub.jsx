  import React, { useState ,useEffect} from "react";
  import { Footer, Navbar3 } from "../components";
  import { Link, useNavigate } from "react-router-dom";


  const Sub = () => {
    const navigate = useNavigate();

    const [authToken] = useState(localStorage.getItem('authToken'));
    const [suboptionData, setSuboptionData] = useState({
        Name: '',
        MaximumNumberOfVendors: '',
        MaximumNumberOfProducts: '',
        comtable: false,
        Price: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSuboptionData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setSuboptionData((prevData) => ({
            ...prevData,
            [name]: checked,
        }));
    };

    const handleAddSuboption = async () => {
        try {
            const response = await fetch('http://localhost:9998/BackendCRM/subOption/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify(suboptionData),
            });

            if (response.ok) {
              //  navigate('/SuboptionList'); // Redirect to the suboption list page after adding
                console.log('Suboption added successfully.');
            } else {
                // Handle errors, e.g., show an error message
                console.error('Error adding suboption:', response.statusText);
            }
        } catch (error) {
            // Handle network errors or other exceptions
            console.error('An error occurred:', error.message);
        }
    };

    return (
        <>
            <Navbar3 />
            <div className="add-suboption mx-auto" style={{ maxWidth: "1200px", paddingTop: "40px" }}>
                <h2>Add Sub Option</h2>
                <div style={{ display: "flex", flexDirection: "column", maxWidth: "300px", gap: "10px", paddingTop: "20px" }}>
                    {/* Input fields for suboption data */}
                    <input
                        type="text"
                        name="Name"
                        placeholder="Name"
                        value={suboptionData.Name}
                        onChange={handleInputChange}
                    />
                    <input
                        type="number"
                        name="MaximumNumberOfVendors"
                        placeholder="Maximum Number of Vendors"
                        value={suboptionData.MaximumNumberOfVendors}
                        onChange={handleInputChange}
                    />
                    <input
                        type="number"
                        name="MaximumNumberOfProducts"
                        placeholder="Maximum Number of Products"
                        value={suboptionData.MaximumNumberOfProducts}
                        onChange={handleInputChange}
                    />
                    <label>
                        <input
                            type="checkbox"
                            name="comtable"
                            checked={suboptionData.comtable}
                            onChange={handleCheckboxChange}
                        />
                        Comtable
                    </label>
                    <input
            type="number"
            name="Price" // Add Price field
            placeholder="Price"
            value={suboptionData.Price}
            onChange={handleInputChange}
          />

                    <button type="button" className="btn btn-outline-dark m-2" onClick={handleAddSuboption}>
                        Add Suboption
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
  }

  export default Sub;
