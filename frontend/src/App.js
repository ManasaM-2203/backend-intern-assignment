import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';

import Login from './components/Login';
import Signup from './components/SignUp';
import Dashboard from './components/Dashboard';

function App() {

  const PrivateRoute = ({ element }) => {
    const token = localStorage.getItem('token');
    return token ? element : <Navigate to="/login" />;
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
