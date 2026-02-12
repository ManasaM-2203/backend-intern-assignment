import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../Api/axios';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import '../css/Login.css';

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
    role: 'user'
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = loginInfo;

    // Basic validation
    if (!email || !password) {
      return handleError("Please fill all fields");
    }

    try {
      const res = await axios.post('/auth/login', loginInfo);

      handleSuccess(res.data.message);

      // Store auth data
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      // Redirect after login
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);

    } catch (err) {
      handleError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={loginInfo.email}
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={loginInfo.password}
          onChange={handleChange}
        />

        <select
          name="role"
          value={loginInfo.role}
          onChange={handleChange}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">Login</button>

        <p>
          Don't have account? <Link to="/signup">Signup</Link>
        </p>
      </form>

      <ToastContainer />
    </div>
  );
}

export default Login;
