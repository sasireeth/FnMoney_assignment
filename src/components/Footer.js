import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-600 text-white py-4 fixed bottom-0 left-0 w-full">
      <div className="container mx-auto text-center">
        <p className="text-sm">© 2024 MyApp. All rights reserved.</p>
        <p className="text-xs mt-2">
          <a href="https://www.privacypolicy.com" className="hover:underline">Privacy Policy</a> | 
          <a href="https://www.termsandconditions.com" className="hover:underline"> Terms & Conditions</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
