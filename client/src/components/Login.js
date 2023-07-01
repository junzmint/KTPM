'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useState } from 'react';
const LoginForm = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const router = useRouter();
  const handleLogin = async (event) => {
    event.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const response = await fetch('http://localhost:4000/auth/login', {
      method: 'POST',
      body: JSON.stringify({ phone, password }),
      headers: myHeaders,
      redirect: 'follow',
    });

    const data = await response.json();
    if (response.ok) {
      if (rememberMe) {
        localStorage.setItem('access_token', data.data.access_token);
        localStorage.setItem('refresh_token', data.data.refresh_token);
        localStorage.setItem('role', data.data.role);
        const path =
          sessionStorage.getItem('role') || localStorage.getItem('role');
        router.push(`/${path.toLowerCase()}`);
      } else {
        sessionStorage.setItem('access_token', data.data.access_token);
        sessionStorage.setItem('refresh_token', data.data.refresh_token);
        sessionStorage.setItem('role', data.data.role);
        const path =
          sessionStorage.getItem('role') || localStorage.getItem('role');
        router.push(`/${path.toLowerCase()}`);
      }
      // Redirect to the home page or the page the user was trying to access
    }
  };
  return (
    <div class="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
      <div class="w-full sm:max-w-md p-5 mx-auto">
        <h2 class="mb-12 text-center text-5xl font-extrabold">Welcome.</h2>
        <form onSubmit={handleLogin}>
          <div class="mb-4">
            <label class="block mb-1" for="phone">
              Phone
            </label>
            <input
              id="phone"
              type="text"
              name="phone"
              value={phone}
              class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
              onChange={(event) => {
                setPhone(event.target.value);
              }}
            />
          </div>
          <div class="mb-4">
            <label class="block mb-1" for="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
            />
          </div>
          <div class="mt-6 flex items-center justify-between">
            <div class="flex items-center">
              <input
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
                id="remember_me"
                type="checkbox"
                class="border border-gray-300 text-red-600 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
              />
              <label
                for="remember_me"
                class="ml-2 block text-sm leading-5 text-gray-900"
              >
                {' '}
                Remember me{' '}
              </label>
            </div>
          </div>
          <div class="mt-6">
            <button class="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  
  );
};
export default LoginForm;
