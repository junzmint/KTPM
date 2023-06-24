'use client';
import React, { useState, useEffect } from 'react';

async function refreshAccessToken() {
  const refreshToken =
    localStorage.getItem('refresh_token') ||
    sessionStorage.getItem('refresh_token');

  const response = await fetch('http://localhost:5000/auth/genToken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem('access_token', data.access_token);
    return true;
  } else {
    localStorage.removeItem('access_token');
    sessionStorage.removeItem('access_token');
    // Redirect to the login page
    window.location.href = '';
    return false;
  }
}

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
  const handleLogout = async () => {
    const token =
      localStorage.getItem('access_token') ||
      sessionStorage.getItem('access_token');

    const response = await fetch('http://localhost:5000/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      localStorage.removeItem('access_token') ||
        sessionStorage.removeItem('access_token');
      window.location.href = '';
    } else {
      // handle logout error
    }
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
    if (jwt) setIsAuthenticated(true);
    else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  useEffect(() => {
    const check401 = async (response) => {
      if (response.status === 401) {
        const success = await refreshAccessToken();
        if (success) {
          window.location.reload();
        }
      }
    };

    const token =
      localStorage.getItem('access_token') ||
      sessionStorage.getItem('access_token');

    if (token) {
      fetch('http://localhost:5000/auth/protected', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        if (response.status === 401) {
          check401(response);
        }
      });
    }
  }, []);
  return <div>{isAuthenticated ? <LogoutButton /> : <LoginForm />}</div>;
}

export default App;
