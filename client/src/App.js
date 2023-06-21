import React, { useState, useEffect } from 'react';

function LoginForm() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('ADMIN');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      body: JSON.stringify({ phone, password, role }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    if (response.ok) {
      if (rememberMe) {
        localStorage.setItem('jwt', data.data.access_token);
      } else {
        sessionStorage.setItem('jwt', data.data.access_token);
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
        phone:
        <input type="text" value={phone} onChange={(event) => setPhone(event.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </label>
      <br />
      <label>
        Remember me:
        <input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} />
      </label>
      <br />
      <button type="submit">Login</button>
    </form>
  );
}

function LogoutButton() {
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    sessionStorage.removeItem('jwt');
    // Redirect to the login page
    window.location.href = '/login';
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
    const jwt = localStorage.getItem('jwt') || sessionStorage.getItem('jwt');
    if (jwt) {
      const response = await fetch('/api/authenticate', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${jwt}` }
      });
      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('jwt');
        sessionStorage.removeItem('jwt');
      }
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  return (
    <div>
      {isAuthenticated ? <LogoutButton /> : <LoginForm />}
    </div>
  );
}

export default App;