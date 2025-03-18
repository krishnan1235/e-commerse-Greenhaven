import React, { createContext, useState, useContext } from 'react';

const EmailContext = createContext();

export const EmailProvider = ({ children }) => {
  const [email, setemail] = useState(false); 
 
  return (
    <EmailContext.Provider value={{ email, setemail }}>
      {children}
    </EmailContext.Provider>
  );
};

export const useEmail= () => {
  return useContext(EmailContext);
};
