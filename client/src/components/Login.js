"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
const LoginForm = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const router = useRouter();
  const handleLogin = async (event) => {
    event.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const response = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      body: JSON.stringify({ phone, password }),
      headers: myHeaders,
      redirect: "follow",
    });
    const data = await response.json();
    if (response.ok) {
      
      if (rememberMe) {
        localStorage.setItem("access_token", data.data.access_token);
        localStorage.setItem("refresh_token", data.data.refresh_token);
        localStorage.setItem("role", data.data.role);
        const path = sessionStorage.getItem("role") || localStorage.getItem("role");
        router.push(`/${path.toLowerCase()}`);
      } else {
        sessionStorage.setItem("access_token", data.data.access_token);
        sessionStorage.setItem("refresh_token", data.data.refresh_token);
        sessionStorage.setItem("role", data.data.role);
        const path = sessionStorage.getItem("role") || localStorage.getItem("role");
        router.push(`/${path.toLowerCase()}`);
      }
      // Redirect to the home page or the page the user was trying to access
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
};
export default LoginForm;
