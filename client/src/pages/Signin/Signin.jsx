import './Signin.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../../context/UserContext';

const Signin = () => {
  const { setUsers } = useUser(); // Use context to update users list
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    role: '', // Default role is 'Student'
    company: ''
  });

  // Handle input changes
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3001/createUser', data)
      .then((result) => {
        toast.success('Account Created');
        // Fetch the updated users list after sign-up
        axios
          .get('http://localhost:3001/getUsers')
          .then((response) => {
            setUsers(response.data); // Update users in context
            setTimeout(() => {
              navigate('/login');
            }, 2000);
          })
          .catch((error) => {
            console.error('Error fetching users after sign-up:', error);
          });
      })
      .catch((err) => {
        console.error('Error creating account:', err);
      });
  };

  // Navigate to login page
  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="signin">
      <form className="signin-form" onSubmit={submitHandler}>
        <h2 className="signin-heading">Signin</h2>
        <input
          type="text"
          placeholder="Username"
          className="form-input"
          name="username"
          onChange={changeHandler}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          className="form-input"
          name="email"
          onChange={changeHandler}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="form-input"
          name="password"
          onChange={changeHandler}
          required
        />
        <select
          className="form-input"
          name="role"
          value={data.role}
          onChange={changeHandler}
          required
        >
          <option value="" disabled>
            Select Role
          </option>
          <option value="Student">Student</option>
          <option value="Recruiter">Recruiter</option>
        </select>
        {data.role === 'Recruiter' && (
          <input
            type="text"
            placeholder="Company"
            className="form-input"
            name="company"
            onChange={changeHandler}
            required
          />
        )}
        <button type="submit">Create Account</button>
        <div className="login-forgot">
          <p>
            Already have an account? <span onClick={navigateToLogin}>Login</span>
          </p>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signin;
