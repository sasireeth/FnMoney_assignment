import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <header className="bg-blue-600 text-white shadow-md fixed top-0 left-0 w-full z-10">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-2xl font-bold">MyApp</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          {isAuthenticated ? (
            <>
              <Link to="/assessments" className="hover:text-gray-300">Assessment</Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="hover:text-gray-300">Register</Link>
              <Link to="/login" className="hover:text-gray-300">Login</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
