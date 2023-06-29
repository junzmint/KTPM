
function LoginForm() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:6000/auth/login', {
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
