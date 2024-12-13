import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

export default function Login(){
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }
     
      const data = await response.json();
      // Handle successful login, e.g., save token or redirect
      localStorage.setItem('token', data.token);
      console.log('Login successful:', localStorage.getItem('token'));
      navigate('/dashboard')
    } catch (err) {
      setError("username or password is wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
<div class="container">
  
    <h2>Agent Authentication</h2>
    <form method="post" class="mt-4" onSubmit={handleLogin}>
        <div class="form-group">
            <label>Codename:</label>
            <input
            type="text"
            value={username}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='username'
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            placeholder='password'
          />
        </div>
        <button type="submit" disabled={isLoading} o>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
    </form>
    {error && <p style={{ color: 'red' }}>{error}</p>}
</div>
  );
};

