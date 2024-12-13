import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null indicates loading state
  console.log("protected");
  
  useEffect(() => {
    const checkAuthToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        // Optionally, validate the token asynchronously (e.g., by calling an API)
        const response = await fetch('http://localhost:5000/auth/verifytoken', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({token}),
        });

        const data = await response.json();
        if(data === true){
          setIsAuthenticated(true)
        }
        else {
          setIsAuthenticated(false);
        }

      } else {
        setIsAuthenticated(false);
      }



    };

    checkAuthToken();
  }, []);

  // Render loading state while checking authentication
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // If no token, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  
  // If authenticated, render the protected route
  return element;
};

export default ProtectedRoute;
