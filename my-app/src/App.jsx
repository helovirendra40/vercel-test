import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, NavLink, Link } from 'react-router-dom';
import axios from 'axios';

import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ExchangeList from './components/cryptoList';
import Menu from './components/Menu';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogin = async (username, password) => {
    try {
      const res = await axios.post('http://localhost:5000/login', { username, password });
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleRegister = async (username, password) => {
    try {
      await axios.post('http://localhost:5000/register', { username, password });
      alert('User Registered!');
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  const ProtectedRoute = ({ children }) => {
    if (!token) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Router>
    <div className='container-fluid'>
      <div className='row'>
      <div className='col-md-3 h-100vh leftNav'>
        <Menu />
      </div>
      <div className='col-md-9 h-100vh offset-md-3 position-relative'>
      
      <Routes>
        <Route path="/" element={<ExchangeList />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onRegister={handleRegister} />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard token={token} />
            </ProtectedRoute>
          }
        />
      </Routes>
    
      </div>
      </div>
    </div>
    </Router>
    
  );
}

export default App;
