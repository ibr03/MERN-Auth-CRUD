import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const PatientTableRow = ({ obj }) => {
    const deleteRecord = async () => {
        try {
            await axios.delete(`http://localhost:4000/patients/delete-record/${obj._id}`);
            console.log('Patient record deleted successfully!');
        } catch (error) {
            console.log(error);
        }     
    }

    return (
        <tr>
            <td>{obj.name}</td>
            <td>{obj.age}</td>
            <td>{obj.medicalHistory}</td>
            <td>{obj.lastVisit}</td>
            <td>
                <Link className="edit-link" to={"/delete-record/" + obj._id}>
                    Edit
                </Link>
                <Button onClick={deleteRecord} size="sm" variant="danger">Delete</Button>
            </td>
        </tr>
    );
}

export default PatientTableRow;