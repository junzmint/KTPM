
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