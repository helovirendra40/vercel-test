import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register({ onRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onRegister(username, password);
    navigate('/login');
  };

  return (
    <div className='d-flex position-relative justify-content-center align-items-center h-100vh'>
      <div className="card1"></div>
        <div className="card2"></div>
        <div className="card3"></div>
        <div className="card4"></div>
      <div className='forms'>
      <h2 className='mb-3'>Register</h2>
      <form onSubmit={handleSubmit}>
        <input className='mb-3 form-control'
          type="text"
          placeholder="Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)} required
        />
        <input className='mb-3 form-control'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} required
        />
        <p>I have an account <Link to={'/login'}>Login</Link> </p>
        <button className='btn btn-primary' type="submit">Register</button>
      </form>
    </div>
    </div>
  );
}

export default Register;
