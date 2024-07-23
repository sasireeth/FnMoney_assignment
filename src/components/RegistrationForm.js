import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      error: '',
      success: ''
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { username, email, password, confirmPassword } = this.state;

    if (!username || !email || !password || !confirmPassword) {
      this.setState({ error: 'Please fill in all fields', success: '' });
      return;
    }

    if (password !== confirmPassword) {
      this.setState({ error: 'Passwords do not match', success: '' });
      return;
    }

    try {
      const response = await axios.post('http://localhost:9000/api/auth/register', { username, email, password });
      this.setState({ username: '', email: '', password: '', confirmPassword: '', error: '', success: 'Registration successfull' });
      console.log('Registration successfull:', response.data);
    } catch (error) {
      this.setState({ error: error.response.data.msg || 'Registration failed. Please try again.', success: '' });
      console.error('Registration error:', error);
    }
  }

  render() {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
          <h1 className="text-2xl font-semibold mb-4 text-center">Register</h1>
          <form onSubmit={this.handleSubmit}>
            <label className="block mb-4">
              <span className="text-gray-700">Username</span>
              <input 
                type="text" 
                name="username" 
                value={this.state.username} 
                onChange={this.handleChange} 
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                placeholder="Username" 
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">Email</span>
              <input 
                type="email" 
                name="email" 
                value={this.state.email} 
                onChange={this.handleChange} 
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                placeholder="you@example.com" 
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">Password</span>
              <input 
                type="password" 
                name="password" 
                value={this.state.password} 
                onChange={this.handleChange} 
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                placeholder="********" 
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">Confirm Password</span>
              <input 
                type="password" 
                name="confirmPassword" 
                value={this.state.confirmPassword} 
                onChange={this.handleChange} 
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                placeholder="********" 
              />
            </label>
            {this.state.error && <p className="text-red-600 mb-4">{this.state.error}</p>}
            {this.state.success && <p className="text-green-600 mb-4">{this.state.success}</p>}
            <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-800 w-full">Register</button>
            <p className="mt-4 text-center">
              Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login here</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default RegistrationForm;
