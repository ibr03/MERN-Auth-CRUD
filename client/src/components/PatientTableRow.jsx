import React from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';


const PatientTableRow = ({ obj, onDelete }) => {
    const deleteRecord = () => {
        onDelete(obj._id);
    }

    return (
        <tr>
            <td>{obj.patientName}</td>
            <td>{obj.age}</td>
            <td>{obj.medicalHistory}</td>
            <td>{obj.lastVisit}</td>
            <td>
                <Link className="edit-link" to={"/update-record/" + obj._id}>
                    Edit
                </Link>
                <Button onClick={deleteRecord} size="sm" variant="danger">Delete</Button>
            </td>
        </tr>
    );
}

export default PatientTableRow;