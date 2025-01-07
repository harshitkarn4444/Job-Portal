import './CreateJob.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../../context/UserContext';

const CreateJob = ({ isOpen, onClose }) => {
    const { setOpenings } = useUser(); // Use context to set job openings
    const [recruiters, setRecruiters] = useState([]); // State for recruiters
    const [data, setData] = useState({
        company_name: '',
        position: '',
        skills: '',
        salary: ''
    });

    useEffect(() => {
        // Fetch users with the role of "Recruiter" from the backend when the component mounts
        axios.get("http://localhost:3001/getUsers")
            .then(response => {
                const recruiterUsers = response.data.filter(user => user.role === "Recruiter");
                setRecruiters(recruiterUsers); // Set only recruiters in state
            })
            .catch(error => {
                console.error("Error fetching users:", error);
            });
    }, []);

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/createOpening", data)
            .then(result => {
                toast.success("Job Created");
                // Fetch the updated job openings after creation
                axios.get("http://localhost:3001/getOpening")
                    .then(response => {
                        setOpenings(response.data); // Update job openings in context
                        setTimeout(() => {
                            onClose();
                        }, 2000);
                    })
                    .catch(error => {
                        console.error("Error fetching job openings:", error);
                    });
            })
            .catch(err => {
                console.error("Error creating job opening:", err);
                toast.error("Failed to create job opening");
            });
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2 className='create-heading'>Create Job</h2>
                <form className='create-form' onSubmit={handleSubmit}>
                    <input type="text" placeholder='Position' className='form-input' name='position' onChange={changeHandler} required />
                    <input type="text" placeholder='Skills' className='form-input' name='skills' onChange={changeHandler} required />
                    <input type="text" placeholder='Salary' className='form-input' name='salary' onChange={changeHandler} required />
                    <select name="company_name" className='form-input' onChange={changeHandler} required>
                        <option value="" disabled selected>Select Company</option>
                        {recruiters.map(recruiter => (
                            <option key={recruiter._id} value={recruiter.company}>{recruiter.company}</option>
                        ))}
                    </select>
                    <button type='submit'>Create</button>
                    <button type="button" className='no' onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default CreateJob;
