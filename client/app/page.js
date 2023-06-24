'use client';
import { data } from 'autoprefixer';
import React, { useState, useEffect } from 'react';

function LoginForm() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      body: JSON.stringify({ phone, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    if (response.ok) {
      if (rememberMe) {
        localStorage.setItem('access_token', data.data.access_token);
        localStorage.setItem('refresh_token', data.data.refresh_token);
      } else {
        sessionStorage.setItem('access_token', data.data.access_token);
        sessionStorage.setItem('refresh_token', data.data.refresh_token);
      }
      // Redirect to the home page or the page the user was trying to access
      window.location.href = '/';
    } else {
      // Display an error message
      console.error(data.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        Phone:
        <input
          type="text"
          value={phone}
          onChange={(event) => {
            setPhone(event.target.value);
            console.log(phone);
          }}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <br />
      <label>
        Remember me:
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(event) => setRememberMe(event.target.checked)}
        />
      </label>
      <br />
      <button type="submit">Login</button>
    </form>
  );
}

function LogoutButton() {
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    sessionStorage.removeItem('access_token');
    // Redirect to the login page
    window.location.href = '';
  };

  return (
    <div>
      <h1>Hello</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthentication = async () => {
    const jwt =
      localStorage.getItem('access_token') ||
      sessionStorage.getItem('access_token');
    if (jwt) 
      setIsAuthenticated(true);
    else{
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  return <div>{isAuthenticated ? <LogoutButton /> : <LoginForm />}</div>;
}

export default App;
