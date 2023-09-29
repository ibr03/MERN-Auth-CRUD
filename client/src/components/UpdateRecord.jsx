import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const UpdateRecord = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cookies] = useCookies([]);
  const [inputValue, setInputValue] = useState({
    name: "",
    age: "",
    medicalHistory: "",
    lastVisit: ""
  });

  const { patientName, age, medicalHistory, lastVisit } = inputValue;

  useEffect(() => {
    const getPatient = async () => {
      if (!cookies.token) {
        navigate('/login');
      }
      try {
        const { data } = await axios.get(`http://localhost:4000/patients/update-record/${id}`, { withCredentials: true });
        setInputValue(data);
      } catch (error) {
        console.log(error);
      } 
    }
  
    getPatient();
  }, [cookies, navigate, id]);
  
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
        `http://localhost:4000/patients/update-record/${id}`,
        {
          ...inputValue,
        }, 
        { withCredentials: true }
      );
      // Redirect to the record list page after a successful update
      navigate("/record-list");
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
          <Form.Control name="patientName" type="text" value={patientName} onChange={handleOnChange} />
        </Form.Group>
        <Form.Group controlId="Age">
          <Form.Label>Age</Form.Label>
          <Form.Control name="age" type="number" value={age} onChange={handleOnChange} />
        </Form.Group>
        <Form.Group controlId="Medical History">
          <Form.Label>Medical History</Form.Label>
          <Form.Control name="medicalHistory" type="text" value={medicalHistory} onChange={handleOnChange} />
        </Form.Group>
        <Form.Group controlId="Last Visit">
          <Form.Label>Last Visit Date</Form.Label>
          <Form.Control name="lastVisit" type="date" value={lastVisit} onChange={handleOnChange} />
        </Form.Group>
        <Button variant="danger" size="lg" block="block" type="submit" className="mt-4">
          Update Record
        </Button>
      </Form>
    </div>
    );
};

export default UpdateRecord;