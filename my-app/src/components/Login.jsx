import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onLogin(username, password);
    navigate('/dashboard');
  };

  return (
    <div className='d-flex position-relative justify-content-center align-items-center h-100vh'>
      <div className="card1"></div>
        <div className="card2"></div>
        <div className="card3"></div>
        <div className="card4"></div>
      <div className='forms'>

        
      
        <h2 className='mb-3'>Login</h2>
        <form onSubmit={handleSubmit}>
          <input className='form-control mb-3'
            type="text"
            placeholder="Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)} required
          />
          <input  className='form-control mb-3'
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} required
          />
          <p>don't have an account <Link to={'/register'}>Register</Link> </p>
          <button className='btn btn-primary' type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
