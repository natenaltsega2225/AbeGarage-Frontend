// src/Contexts/GlobalStateContext.jsx
import React, { createContext, useContext, useReducer } from "react";

// 1. Define initial state structure for the application
const initialState = {
  employees: [],
  orders: [],
  customers: [],
  userRole: null,
  // Add more properties as needed
};

// 2. Define actions as constants
const actions = {
  SET_EMPLOYEES: "SET_EMPLOYEES",
  SET_ORDERS: "SET_ORDERS",
  SET_CUSTOMERS: "SET_CUSTOMERS",
  SET_USER_ROLE: "SET_USER_ROLE",
};

// 3. Create a reducer function to handle state updates
function globalStateReducer(state, action) {
  switch (action.type) {
    case actions.SET_EMPLOYEES:
      return { ...state, employees: action.payload };
    case actions.SET_ORDERS:
      return { ...state, orders: action.payload };
    case actions.SET_CUSTOMERS:
      return { ...state, customers: action.payload };
    case actions.SET_USER_ROLE:
      return { ...state, userRole: action.payload };
    default:
      return state;
  }
}

// 4. Create Context
const GlobalStateContext = createContext();

// 5. Create a provider component
export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalStateReducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// 6. Custom hook to use global state context
export const useGlobalState = () => useContext(GlobalStateContext);
