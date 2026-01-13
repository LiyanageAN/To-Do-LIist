import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-4 mt-auto text-center text-gray-500 text-sm">
      <p>TaskMaster &copy; {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;