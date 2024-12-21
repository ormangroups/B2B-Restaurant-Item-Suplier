"use client";
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import "../../styles/global.css";
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setUserData, setLoading, setError } from "../redux/slices/userSlice";
import { setRestaurantDetails } from '../redux/slices/restaurantSlice';
import axios from 'axios';

function Page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState(''); // To map username later
  const [password, setPassword] = useState('');
  const [loading, setLoadingState] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const submitbtn = async () => {
    setLoadingState(true);
    setErrorMessage(''); // Clear previous error messages
    dispatch(setLoading(true)); // Loading state starts
    try {
      // Make sure the API endpoint starts with http:// or https://
      const response = await axios.post("https://www.ormanindia.com/public/login", {
        username: email, 
        password: password,
      });

      // Extract the response data
      const { data } = response; 
      console.log("API Response:", data);

      // Dispatch user data to Redux state
      dispatch(setUserData(data));

      // Save user data into cookies
      Cookies.set('userData', JSON.stringify(data), { expires: 7 });

      // Conditional Redirects
      if (data.role === 'ADMIN') {
        router.push('/admin'); // Admin Page
      } else if (data.role === 'USER') {
        // Save specific restaurant data
        const restaurantDetails = data.restaurants?.[0] || {};
        dispatch(setRestaurantDetails(restaurantDetails));
        Cookies.set('restaurantData', JSON.stringify(restaurantDetails), { expires: 7 });

        router.push('/main'); // User Page
      }

      dispatch(setLoading(false)); // Loading state ends
    } catch (error) {
      dispatch(setLoading(false));
      console.error("Login Error:", error.response?.data || error.message);
      setErrorMessage("Login failed! Please check your credentials.");
    }
    setLoadingState(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src="https://i.imgur.com/nCjPRTB.png" alt="Logo" className="h-9 max-w-full" />
        </div>
        <h2 className="text-center text-2xl font-semibold text-gray-900 mb-6">
          Sign in to your account
        </h2>
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your username"
              className={`mt-1 block w-full px-3 py-2 border ${errorMessage ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={`mt-1 block w-full px-3 py-2 border ${errorMessage ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
          </div>
          {errorMessage && (
            <div className="text-red-500 text-sm">
              {errorMessage}
            </div>
          )}
          
          <div>
            <button
              type="button"
              onClick={submitbtn}
              disabled={loading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
            >
              {loading ? 'Logging in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
