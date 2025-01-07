import React from 'react';
import './ApplicationsModal.css';
import { useUser } from '../../context/UserContext';

const ApplicationsModal = ({ isOpen, onClose }) => {
    const { currentApplications } = useUser(); 
    //console.log(currentApplications);
    if (!isOpen) return null; // Do not render if modal is not open

    return (
        <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
            <h2 className="create-heading">Applications</h2>
            <button className="close-modal" onClick={onClose}>Close</button>
        </div>
        {currentApplications && currentApplications.length > 0 ? (
            <table className="applications-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {currentApplications.map((app, index) => (
                        <tr key={index}>
                            <td>{app.name}</td>
                            <td>{app.emailid}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ) : (
            <p>No applications found for this job.</p>
        )}
    </div>
</div>

    );
};

export default ApplicationsModal;