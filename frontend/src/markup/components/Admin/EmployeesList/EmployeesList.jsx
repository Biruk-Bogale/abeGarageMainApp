import React, { useState, useEffect } from "react";

// import recat components
import { Table, Button } from "react-bootstrap";

// import the auth hook
import { useAuth } from "../../../../Context/AuthContext";

// import the employee service to use the get employees function
import employeeService from "../../../../services/employee.services";

// import the date-fns library
import { format } from "date-fns";
function EmployeesList() {
  //  employees state to store the emplooyes data
  const [employees, setEmployees] = useState([]);

  // console.log(employees[0].employee_id)

  // to serve as aflag to show the error message
  const [apiError, setApiError] = useState(false);

  // store the error message
  const [apiErrorMessage, setApiErrorMessage] = useState(null);

  //   get the logged employee token
  const { employee } = useAuth();

  let token = null;

  if (employee) {
    token = employee?.employee_token;
  }
  //   console.log(employee?.employee_token)

  // fetch employees data using useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await employeeService?.getAllEmployees(token);
        // console.log(data.status);

        if (data?.statusText !== "OK") {
          // set apiError to true
          setApiError(true);

          if (data?.status === 403) {
            setApiErrorMessage("Please login again");
          } else if (data?.status === 401) {
            setApiErrorMessage("You are not Authorized to view this page");
          } else {
            setApiErrorMessage("Please try again laterrrr");
          }
        }

        // set employees data
        setEmployees(data?.data?.employees);

        // console.log(data?.data.employees);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {apiError ? (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>
                {apiErrorMessage}
                <span style={{ color: "red" }}> ___</span>
              </h2>
            </div>
          </div>
        </section>
      ) : (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>Employees</h2>
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Active</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Added Data</th>
                  <th>Role</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employe) => (
                  <tr key={employe.employee_id}>
                    <td>{employe.active_employee ? "Yes" : "No"}</td>
                    <td>{employe.employee_first_name}</td>
                    <td>{employe.employee_last_name}</td>
                    <td>{employe.employee_email}</td>
                    <td>{employe.employee_phone}</td>
                    <td>
                      {format(
                        new Date(employe.added_date),
                        "MM - dd - yyyy | kk:mm"
                      )}
                    </td>
                    <td>{employe.company_role_name}</td>
                    <td>Edit/Delete</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </section>
      )}
    </>
  );
}

export default EmployeesList;
