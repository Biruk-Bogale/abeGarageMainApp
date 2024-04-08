// import the react and the hooks here
import React, { useState, useEffect, useContext, createContext } from "react";

// import the utils function to handle the reading from the local storage
import getAuth from "../utils/auth";

// create a context object
const AuthContext = React.createContext();

// create a custom hook to use the context
function useAuth() {
  return useContext(AuthContext);
}

// create a provider conponent
function AuthProvider({ children }) {
  const [employee, setEmployee] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdmin_manager, setIsAdmin_Manager] = useState(false);
  const [isAdmin_manager_employee, setIsAdmin_Manager_employee] =
    useState(false);

  const value = {
    isLogged,
    isAdmin,
    isAdmin_manager,
    isAdmin_manager_employee,
    setIsAdmin,
    setIsLogged,
    setIsAdmin_Manager,
    setIsAdmin_Manager_employee,
    employee,
  };

  useEffect(() => {
    // retrive the logged in user from local storage
    const loggedInEmployee = getAuth();

    loggedInEmployee.then((response) => {
      // console.log(response)

      // set islogged to true
      if (response.employee_token) {
        setIsLogged(true);
      }

      // 3 is the employe role for admin
      if (response.employee_role === 3) {
        setIsAdmin(true);
      }

      // 3 & 2 is the employe role for admin & manager
      if (response.employee_role === 2) {
        setIsAdmin_Manager(true);
      }

      // 3,2 & 1 is the employe role for admin,manager & employee
      if (response.employee_role === 1) {
        setIsAdmin_Manager_employee(true);
      }

      //set the whole response on employee
      setEmployee(response);
    });
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider, useAuth };
