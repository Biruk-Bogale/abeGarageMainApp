import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

// import recat components
import { Table } from "react-bootstrap";

// import react icons
import { FaEdit } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

import { BeatLoader } from "react-spinners";

// import the auth hook
import { useAuth } from "../../../../Context/AuthContext";

// import the employee service to use the get employees function
import orderService from "../../../../services/order.services";

// import the date-fns library
import { format } from "date-fns";

////////////////////////////////////////
function OrdersList() {
  //  employees state to store the emplooyes data
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  // spinner handler state
  const [spin, setSpinner] = useState(false);

  // to serve as aflag to show the error message
  const [apiError, setApiError] = useState(false);
9999

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
        const data = await orderService.getAllOrder(token);

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

        // // set customers data
        setOrders(data?.data.Orders);

        setTimeout(() => {
          setSpinner(!spin);
        }, 200);
      } catch (error) {
        setSpinner(!spin);
      }
    };
    fetchData();
  }, []);

  function handleEdit(id) {
    navigate(`/admin/orders/order-update/${id}`);
  }

  function handleDetail(id) {
    navigate(`/orders/order-detail/${id}`);
  }

  return (
    <>
      {apiError ? (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>
                {apiErrorMessage}
                <span style={{ color: "red" }}></span>
              </h2>
            </div>
          </div>
        </section>
      ) : (
        <section className="contact-section">
          <div className="auto-container">
            <div className="Orders contact-title">
              <h2>Orders</h2>
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Order Id</th>
                  <th>Customer</th>
                  <th>Vehicle</th>
                  <th>Order Date</th>
                  <th>Recived By</th>
                  <th>Order Status</th>
                  <th>View/Edit</th>
                </tr>
              </thead>
              <tbody>
                {spin ? (
                  orders.map((order) => (
                    <tr className="order-list" key={order.order_id}>
                      <td>{order.order_id}</td>

                      <td>
                        <div>
                          {" "}
                          {order.customer_first_name +
                            " " +
                            order.customer_last_name}
                        </div>
                        <div className="list-email">
                          {" "}
                          {order.customer_email}
                        </div>
                        <div className="list-email">
                          {" "}
                          {order.customer_phone_number}
                        </div>
                      </td>

                      <td>
                        <div> {order.vehicle_make}</div>
                        <div className="list-email"> {order.vehicle_year}</div>
                        <div className="list-email"> {order.vehicle_tag}</div>
                      </td>

                      <td className="order-date">
                        {format(new Date(order.order_date), "MM/dd/yyyy")}
                      </td>

                      <td>
                        <div className="order-date">
                          {" "}
                          {order.employee_first_name +
                            " " +
                            order.employee_last_name}
                        </div>
                      </td>

                      <td className="border py-4">
                        <h6
                          className={
                            order.order_status
                              ? "text-center rounded-pill bg-success font-weight-bold text-white                            "
                              : "text-center rounded-pill bg-warning font-weight-bold"
                          }
                        >
                          {order.order_status ? "Completed" : "In Progress"}
                        </h6>
                      </td>

                      <td className="edit">
                        <span
                          onClick={() => handleEdit(order.order_hash)}
                          className="hover1"
                        >
                          <FaEdit color="#081336" />
                        </span>

                        <span onClick={() => handleDetail(order.order_hash)}>
                          <FaArrowUpRightFromSquare color="#081336" />
                        </span>
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

export default OrdersList;
