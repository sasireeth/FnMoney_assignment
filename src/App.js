import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import AssessmentForm from './components/AssessmentForm';
import LandingPage from './components/LandingPage';
import Header from './components/Header';
import Footer from './components/Footer';


const App = () => {
  return (
    <Router>
      <Header />
      <main className="flex-grow h-screen">
        <Routes>
          <Route path="/login" element= {<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/assessments" element={<AssessmentForm />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
