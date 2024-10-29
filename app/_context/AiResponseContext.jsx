'use client'
// _context/MainContextProvider.js

import React, { createContext, useState } from 'react';

// Create a single context to hold both AiResponse and AiRoadMap values
export const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const [aiResponse, setAiResponse] = useState("Initial AI Response");
  const [aiRoadMap, setAiRoadMap] = useState([]);

  return (
    <MainContext.Provider value={{ aiResponse, setAiResponse, aiRoadMap, setAiRoadMap }}>
      {children}
    </MainContext.Provider>
  );
};
