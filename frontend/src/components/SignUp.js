import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../Api/axios';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import '../css/SignUp.css';

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/auth/signup', signupInfo);

      handleSuccess(res.data.message);
      setTimeout(() => navigate('/login'), 1000);

    } catch (err) {
      handleError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="container">
      <h1>Signup</h1>

      <form onSubmit={handleSignup}>
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />

        <select name="role" onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">Signup</button>

        <p>Already have account? <Link to="/login">Login</Link></p>
      </form>

      <ToastContainer />
    </div>
  );
}

export default Signup;
