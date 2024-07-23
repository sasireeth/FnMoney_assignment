import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Import Link from react-router-dom

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:9000/api/auth/login', {
        email,
        password
      });
  
      localStorage.setItem('token', response.data.token);
      setError(''); 
      navigate('/');
    } catch (error) {
      setError(error.response.data.msg || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-40 p-4 bg-white shadow-lg rounded">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChangeEmail}
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChangePassword}
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 w-full rounded"
        >
          Login
        </button>
      </form>
      <p className="mt-4">
        Don't have an account? <Link to="/register" className="text-blue-500">Register here</Link>
      </p>
    </div>
  );
};

export default LoginForm;
