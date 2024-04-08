import React, { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

// import recat components
import { Table, Button } from "react-bootstrap";

// import react icons
import { FaEdit } from "react-icons/fa";

import { BeatLoader } from "react-spinners";

// import the auth hook
import { useAuth } from "../../../../Context/AuthContext";

// import the employee service to use the get employees function
import employeeService from "../../../../services/employee.services";

// import the date-fns library
import { format } from "date-fns";

////////////////////////////////////////
function EmployeesList() {
  //  employees state to store the emplooyes data
  const [employees, setEmployees] = useState([]);

  const navigate = useNavigate();

  // spinner handler state
  const [spin, setSpinner] = useState(false);

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

  // fetch employees data using useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await employeeService?.getAllEmployees(token);

        if (data?.status !== 200) {
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
        setTimeout(() => {
          setSpinner(!spin);
        }, 200);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchData();
  }, []);

  function handleEdit(id) {
    navigate(`/admin/employee-update/${id}`);
  }

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
                {spin ? (
                  employees.map((employe) => (
                    <tr
                      className={
                        !employe.active_employee
                          ? `${"inactive"}`
                          : `${"active"}`
                      }
                      key={employe.employee_id}
                      onClick={() => handleEdit(employe.employee_hash)}>
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
                      <td className="edit">
                        <span className="hover1">
                          <FaEdit color="#081336" />
                        </span>

                        {/* <span
                        className="hover"
                        onClick={() => handleDelete(employe.employee_id)}
                      >
                        <MdDelete color="#DC3545" />
                      </span> */}
                      </td>
                    </tr>
                  ))
                ) : (
                  <span className="align-text-center">
                    <BeatLoader color="#081336" size={50} />
                  </span>
                )}
              </tbody>
            </Table>
          </div>
        </section>
      )}
    </>
  );
}

export default EmployeesList;
