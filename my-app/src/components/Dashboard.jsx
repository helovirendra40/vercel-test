import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard({ token }) {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();  // Use navigate for redirecting

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get('http://localhost:5000/dashboard', {
          headers: {
            Authorization: token,
          },
        });
        setMessage(res.data.message);
      } catch (error) {
        console.error('Failed to fetch dashboard', error);
      }
    };

    fetchDashboard();
  }, [token]);

  // Logout function to clear token and redirect to login
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className='dashboardInfo'>
      <h2>{message}</h2>
      <button className='btn btn-primary' onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
