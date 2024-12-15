"use client";
import React, { useState } from 'react';
import "../../styles/global.css";
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setUserData, setLoading, setError } from '@/slices/userSlice';
import axios from 'axios';

function Page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitbtn = async () => {
    dispatch(setLoading(true)); // Set loading to true
    try {
      const response = await axios.post('YOUR_API_ENDPOINT_HERE', { email, password });
      // Assuming the API response has the user (restaurant) data and role
      dispatch(setUserData(response.data)); // Store the user data and role in Redux
      dispatch(setLoading(false)); // Set loading to false

      // Redirect based on the user's role
      if (response.data.role === 'ADMIN') {
        router.push('/admin'); // Redirect to the admin page if role is ADMIN
      } else if (response.data.role === 'USER') {
        router.push('/main'); // Redirect to the main page if role is USER
      }
    } catch (error) {
      dispatch(setLoading(false)); // Set loading to false
      dispatch(setError('Login failed! Please check your credentials.'));
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-center mb-6">
        <img src="https://i.imgur.com/nCjPRTB.png" alt="Logo" className="h-9 max-w-full" />
      </div>
      <h2 className="text-center text-2xl font-semibold text-gray-900 mb-6">Sign in to your account</h2>
      <form className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input id="remember_me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
            <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">Remember me</label>
          </div>
          <div className="text-sm">
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div>
        </div>
        <div>
          <button 
            type="button" 
            onClick={submitbtn} 
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}

export default Page;
