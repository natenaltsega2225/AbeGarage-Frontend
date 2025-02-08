// Import React, the useState and useEffect hooks
import React, { useState, useEffect } from "react";
// Import the Route and Navigate Components
import { Navigate } from "react-router";
// Import the Util function we created to handle the reading from the local storage
import getAuth from "../../../util/auth";

const PrivateAuthRoute = ({ roles, children }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Retrieve the logged in user from local storage
    const loggedInEmployee = getAuth();
    // console.log(loggedInEmployee);
    loggedInEmployee.then((response) => {
      if (response.employee_token) {
        // If in here, that means the user is logged in
        // console.log(response);
        // console.log("Set logged in to true");
        setIsLogged(true);
        if (
          roles &&
          roles.length > 0 &&
          roles.includes(response.employee_role)
        ) {
          // If in here, that means the user is logged and has  authorization to access the route
          // console.log("Set authorized to true");
          setIsAuthorized(true);
        }
      }
      setIsChecked(true);
    });
  }, [roles]);
  if (isChecked) {
    if (!isLogged) {
      return <Navigate to="/login" />;
    }
    if (!isAuthorized) {
      return <Navigate to="/unauthorized" />;
    }
  }

  return <div>{children}</div>;
};

export default PrivateAuthRoute;