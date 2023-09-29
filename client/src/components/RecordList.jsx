import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import PatientTableRow from './PatientTableRow';

const RecordList = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [cookies] = useCookies([]);

   // Define getAllPatients using useCallback
  const getAllPatients = useCallback(async () => {
    if (!cookies.token) {
      navigate('/login');
    }

    try {
      const { data } = await axios.get('http://localhost:4000/patients', { withCredentials: true });
      setPatients(data);
    } catch (error) {
      console.log(error);
    } 
  }, [cookies, navigate]);

  // Function to delete a patient record
  const deleteRecord = async (recordId) => {
    try {
      await axios.delete(`http://localhost:4000/patients/delete-record/${recordId}`, { withCredentials: true });
      console.log('Patient record deleted successfully!');
      // After deletion, fetch the updated list of patients
      getAllPatients();
    } catch (error) {
      console.log(error);
    }     
  }

  useEffect(() => {   
    getAllPatients();
  }, [getAllPatients]);

  function DataTable() {
    if (!Array.isArray(patients)) {
      return null; 
    }

    return patients.map((res, i) => {
      return <PatientTableRow obj={res} key={i} onDelete={deleteRecord} />;
    });
  }

  return (
    <div className="table-wrapper">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Medical History</th>
            <th>Last Visit</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {DataTable()}
        </tbody>
      </Table>
    </div>
  );
};

export default RecordList;