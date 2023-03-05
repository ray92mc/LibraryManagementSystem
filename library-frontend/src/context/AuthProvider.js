import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

console.log(localStorage.getItem('isLoggedIn'))

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem('isLoggedIn') === 'true'
    );

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};


export default AuthContext;