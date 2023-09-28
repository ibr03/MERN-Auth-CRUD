import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const UpdateRecord = () => {
  const [inputValue, setInputValue] = useState({
    name: "",
    age: "",
    medicalHistory: "",
    lastVisit: ""
  });

  const { name, age, medicalHistory, lastVisit } = inputValue;

  const getPatient = async () => {
    try {
      const { data } = await axios.get(`http://localhost:4000/patients/update-record/${this.props.match.params.id}`);
      setInputValue(data);
    } catch (error) {
      console.log(error);
    } 
  }

  useEffect(() => {
    getPatient();
  }, []);
  
  const handleOnChange = (e) => {
    const { name, value } = e.target; 
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:4000/patients/update-record/${this.props.match.params.id}`,
        {
          ...inputValue,
        },
        { withCredentials: true } // to allow cookies and auth headers in my XHR request
      );
    } catch (error) {
      console.log(error);
    }

    setInputValue({
      ...inputValue,
      name: "",
      age: "",
      medicalHistory: "",
      lastVisit: ""
    });
  };

  return (
    <div class="form-wrapper">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={name} onChange={handleOnChange} />
        </Form.Group>
        <Form.Group controlId="Age">
          <Form.Label>Age</Form.Label>
          <Form.Control type="text" value={age} onChange={handleOnChange} />
        </Form.Group>
        <Form.Group controlId="Medical History">
          <Form.Label>Medical History</Form.Label>
          <Form.Control type="text" value={medicalHistory} onChange={handleOnChange} />
        </Form.Group>
        <Form.Group controlId="Last Visit">
          <Form.Label>Last Visit Date</Form.Label>
          <Form.Control type="date" value={lastVisit} onChange={handleOnChange} />
        </Form.Group>
        <Button variant="danger" size="lg" block="block" type="submit" className="mt-4">
          Update Record
        </Button>
      </Form>
    </div>
    );
};

export default UpdateRecord;