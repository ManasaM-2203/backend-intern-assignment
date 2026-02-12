import React from 'react';
import Updates from './Updates';
import { logout } from '../utils';
import { useNavigate } from 'react-router-dom';
import '../css/Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="dashboard">
      <div className="dashboard-card">

        <div className="dashboard-header">
          <h2>Welcome {user?.name}</h2>

          <button
            className="logout-btn"
            onClick={() => logout(navigate)}
          >
            Logout
          </button>
        </div>

        <hr style={{ margin: "20px 0" }} />

        <Updates />

      </div>
    </div>
  );
}

export default Dashboard;
