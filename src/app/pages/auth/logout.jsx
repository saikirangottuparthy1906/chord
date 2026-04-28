import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ setCurrentUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Remove the token/user data from storage
    localStorage.removeItem('token');
    
    // 2. Clear global user state
    setCurrentUser(null);
    
    // 3. Redirect to login or home page
    navigate('/login');
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
