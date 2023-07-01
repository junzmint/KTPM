"use client";
import React, { useState, useEffect } from "react";
import LoginForm from "@/components/auth/Login";
import { useRouter } from "next/navigation";
async function refreshAccessToken() {
  const refreshToken =
    localStorage.getItem("refresh_token") ||
    sessionStorage.getItem("refresh_token");

  const response = await fetch("http://localhost:4000/auth/genToken", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem("access_token", data.access_token);

    return true;
  } else {
    localStorage.removeItem("access_token");
    sessionStorage.removeItem("access_token");
    // Redirect to the login page
    window.location.href = "";
    return false;
  }
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const checkAuthentication = async () => {
    const jwt =
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token");
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
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token");

    if (token) {
      fetch("http://localhost:4000/auth/protected", {
        method: "GET",
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
  if (!isAuthenticated) {
    return <LoginForm />;
  } else {
    const path = sessionStorage.getItem("role") || localStorage.getItem("role");
    router.push(`/${path.toLowerCase()}`);
  }
}

export default App;
