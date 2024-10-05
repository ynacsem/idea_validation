'use client'
import React, { createContext, useState } from 'react';

// Create the context
export const AiResponseContext = createContext();

// Create a provider component
export const AiResponseProvider = ({ children }) => {
  const [aiResponse, setAiResponse] = useState("Initial AI Response");

  return (
    <AiResponseContext.Provider value={{ aiResponse, setAiResponse }}>
      {children}
    </AiResponseContext.Provider>
  );
};
