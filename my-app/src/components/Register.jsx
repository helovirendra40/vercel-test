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
    <div className='d-flex justify-content-center align-items-center h-100vh'>
      <div className='forms'>
      <h2 className='mb-3'>Register</h2>
      <form onSubmit={handleSubmit}>
        <input className='mb-3 form-control'
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input className='mb-3 form-control'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>I have an account <Link to={'/login'}>Register</Link> </p>
        <button className='btn btn-primary' type="submit">Register</button>
      </form>
    </div>
    </div>
  );
}

export default Register;
