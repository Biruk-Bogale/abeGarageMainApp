import React, { useRef, useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";

import { Table, Button } from "react-bootstrap";

import { format } from "date-fns";

// import react icons
import { FaHandPointer } from "react-icons/fa";

// import employee service
import customerService from "../../../../services/customer.services";

// import the useAuth hook
import { useAuth } from "../../../../Context/AuthContext";

// import react router dom
import { useParams, useNavigate } from "react-router-dom";

function NewOrder1() {
  const navigate = useNavigate();
  // useState
  const [customers, setCustomer] = useState([]);
  const [query, setQuery] = useState("");
  const [noData, setNoData] = useState();

  //targeter
  const queryDom = useRef();

  // create a variable to hold the users token
  let loggedInEmployeeToken = "";
  // destructure the auth hook and get the token
  const { employee } = useAuth();
  if (employee && employee.employee_token) {
    loggedInEmployeeToken = employee.employee_token;
  }

  async function findCustomer(e) {
    e.preventDefault();

    // query tracker
    setQuery(queryDom.current.value);

    try {
      const customer = await customerService.findCustomer(
        query,
        loggedInEmployeeToken
      );

      setCustomer(customer.customer);
      setNoData();
    } catch (error) {
      console.log(error.response.data.error);
      setCustomer([]);
      setNoData(error.response.data.error);
    }
  }

  function handleAdd(id) {
    navigate(`/admin/order/add-new-order/${id}`);
  }
  return (
    <>
      <section className="contact-section">
        <div className="auto-container">
          <div className="contact-title">
            <h2>Create a New Order 1</h2>
          </div>

          <div className="contact-form">
            {/* Form Start*/}
            <form>
              <div className="row clearfix">
                {/* Phone Number */}
                <div className="form-group col-md-12">
                  <input
                    type="text"
                    placeholder="Search a customer using first name, last name, email or phone number"
                    ref={queryDom}
                    value={query}
                    onChange={findCustomer}
                  />
                </div>{" "}
                {query ? (
                  <Table striped bordered hover>
                    <tbody className="table">
                      {customers.map((customer) => (
                        <tr
                          className={
                            !customer.active_customer_status
                              ? `${"inactive"}`
                              : `${"active"}`
                          }
                          key={customer.customer_id}>
                          <td>{customer.customer_first_name}</td>
                          <td>{customer.customer_last_name}</td>
                          <td>{customer.customer_email}</td>
                          <td>{customer.customer_phone_number}</td>

                          <td className="edit">
                            <span
                              onClick={() => handleAdd(customer.customer_hash)}
                              className="hover1">
                              <FaHandPointer color="#081336" />
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : null}
                {noData && (
                  <div className="noData">
                    <h2> {noData}</h2>
                  </div>
                )}
                {/* ////////////////// */}
                <div className="form-group col-md-12">
                  <h1
                    // onClick={spinner}
                    className="theme-btn btn-style-one">
                    <span>
                      {!"spin" ? (
                        <BeatLoader color="white" size={8} />
                      ) : (
                        "👆🏻 Search Customer 👆🏻"
                      )}
                    </span>
                  </h1>
                </div>
              </div>
            </form>
            {/* Form End */}{" "}
          </div>
        </div>
      </section>
    </>
  );
}

export default NewOrder1;
