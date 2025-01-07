import './Home.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateJob from '../../components/CreateJob/CreateJob';
import ApplicationsModal from '../../components/ApplicationsModal/ApplicationsModal'; // Import modal
import { useUser } from '../../context/UserContext';

const Home = () => {
    const { openings, setOpenings, applications, setApplications, user, setUser, currentApplications ,setCurrentApplications } = useUser();
    const [isCreateJobOpen, setIsCreateJobOpen] = useState(false);
    const [isApplicationsModalOpen, setIsApplicationsModalOpen] = useState(false);
    const [showMyJobs, setShowMyJobs] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/getOpenings")
            .then(response => setOpenings(response.data))
            .catch(error => console.error("Error fetching openings:", error));

        axios.get("http://localhost:3001/getApplications")
            .then(response => setApplications(response.data))
            .catch(error => console.error("Error fetching applications:", error));
    }, [setOpenings, setApplications]);

    const openCreateJob = () => setIsCreateJobOpen(true);
    const closeCreateJob = () => setIsCreateJobOpen(false);

    const toggleMyJobs = () => setShowMyJobs(prev => !prev);

    const handleLogout = () => {
        setUser(null);
        navigate("/login");
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/deleteOpening/${id}`)
            .then(() => {
                setOpenings(prev => prev.filter(opening => opening._id !== id));
                toast.success("Deleted successfully");
            })
            .catch(error => console.error("Error deleting opening:", error));
    };

    const handleApply = (job) => {
        const applicationData = {
            name: user.username,
            emailid: user.email,
            company_chosen: job.company_name,
            position_chosen: job.position,
        };

        axios.post("http://localhost:3001/applyJob", applicationData)
            .then(() => {
                setApplications(prev => [...prev, applicationData]);
                toast.success("Application submitted successfully");
            })
            .catch(error => {
                console.error("Error applying for job:", error);
                toast.error("Failed to submit application");
            });
    };

    const handleApplicationView = (job) => {
        const filteredApplications = applications.filter(app =>
            app.company_chosen === job.company_name &&
            app.position_chosen === job.position
        );
        setCurrentApplications(filteredApplications);
        setIsApplicationsModalOpen(true);
    };

    const closeApplicationsModal = () => {
        setIsApplicationsModalOpen(false);
        
    };

    const filteredOpenings = showMyJobs
        ? openings.filter(opening => opening.company_name === user.company)
        : openings;

    return (
        <>
            <nav className="navbar">
                <div className="navbar-brand">
                    <h1>Job Portal</h1>
                </div>
                <ul className="navbar-links">
                    <li>Home</li>
                    <li>About</li>
                    {user.role === 'Recruiter' && ( 
                    <>
                    <li onClick={openCreateJob}>Create Job</li>
                    <li onClick={toggleMyJobs}>
                        {showMyJobs ? 'All Jobs' : 'My Jobs'}
                    </li>
                    </>
                    
                    )
                    }
                    <li onClick={handleLogout}>Logout</li>
                </ul>
            </nav>
            <div className="card-grid">
                {filteredOpenings.map((opening, index) => (
                    <div className="card" key={index}>
                        <h2 className="card-company_name">{opening.company_name}</h2>
                        <h4 className="card-position">{opening.position}</h4>
                        <p className="card-skills">{opening.skills}</p>
                        <p className="card-salary">{opening.salary}</p>
                        {showMyJobs && (
                            <span className='card-button'>
                                <button onClick={() => handleApplicationView(opening)}>Applications</button>
                                <button onClick={() => handleDelete(opening._id)}>Delete</button>
                            </span>
                        )}
                        {user.role === 'Student' && (
                            <button className="card-button" onClick={() => handleApply(opening)}>
                                Apply
                            </button>
                        )}
                    </div>
                ))}
            </div>
            
            <ToastContainer />
            <ApplicationsModal isOpen={isApplicationsModalOpen} onClose={closeApplicationsModal} />
            <CreateJob isOpen={isCreateJobOpen} onClose={closeCreateJob} />
        </>
    );
};

export default Home;
