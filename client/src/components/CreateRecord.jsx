import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const CreateRecord = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    patientName: "",
    age: "",
    medicalHistory: "",
    lastVisit: ""
  });
  
  const handleOnChange = (e) => {
    const { name, value } = e.target; 
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) => {
    toast.error(err, {
      position: "bottom-left",
    });
  };

  const handleSuccess = (msg) => {
    toast.success(msg, {
      position: "bottom-right",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:4000/patients/create-record",
        {
          ...inputValue,
        },
        { withCredentials: true } // to allow cookies and auth headers in my XHR request
      );

      const { success, message } = data;

      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/record-list");
        }, 500);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }

    setInputValue({
      ...inputValue,
      patientName: "",
      age: "",
      medicalHistory: "",
      lastVisit: ""
    });
  };

  return (
    <div className="form-wrapper">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control name="patientName" type="text" value={inputValue.name} onChange={handleOnChange} />
        </Form.Group>
        <Form.Group controlId="Age">
          <Form.Label>Age</Form.Label>
          <Form.Control name="age" type="number" value={inputValue.age} onChange={handleOnChange} />
        </Form.Group>
        <Form.Group controlId="Medical History">
          <Form.Label>Medical History</Form.Label>
          <Form.Control name="medicalHistory" type="text" value={inputValue.medicalHistory} onChange={handleOnChange} />
        </Form.Group>
        <Form.Group controlId="Last Visit">
          <Form.Label>Last Visit Date</Form.Label>
          <Form.Control name="lastVisit" type="date" value={inputValue.lastVisit} onChange={handleOnChange} />
        </Form.Group>
        <Button variant="danger" size="lg" block="block" type="submit" className="mt-4">
          Create Record
        </Button>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default CreateRecord;
