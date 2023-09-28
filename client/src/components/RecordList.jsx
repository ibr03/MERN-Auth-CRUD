import React, { useState, useEffect } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import PatientTableRow from './PatientTableRow';

const RecordList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const getAllPatients = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/patients');
        console.log('data returned form axio.get call for record list', data);
        setPatients(data);
      } catch (error) {
        console.log(error);
      } 
    }
    
    getAllPatients();
  }, []);

  function DataTable() {
    if (!Array.isArray(patients)) {
      //console.log('patients not an array but this', patients);
      return null; 
    }

    return patients.map((res, i) => {
      return <PatientTableRow obj={res} key={i} />;
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