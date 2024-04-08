import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import Order from "../../../../services/order.services";

// import the date-fns library
import { format } from "date-fns";

// import the useAuth hook
import { useAuth } from "../../../../Context/AuthContext";

function EditOrder() {
  const [orders, setOrders] = useState("");
  const [orderServices, setOrderServices] = useState([]);
  const [completed, setCompletedOrder] = useState([]);
  const [orderServiceId, setOrderServiceId] = useState([]);
  const [serverMsg, setServerMsg] = useState("");

  // spinner handler state
  const [spin, setSpinner] = useState(false);

  const { order_hash } = useParams();

  const order_id = orders.order_id;

  // create a variable to hold the users token
  let loggedInEmployeeToken = "";
  // destructure the auth hook and get the token
  const { employee } = useAuth();

  // console.log(employee.employee_id);

  if (employee && employee.employee_token) {
    loggedInEmployeeToken = employee.employee_token;
  }

  async function fetchData() {
    try {
      const data = await Order.getSingleOrder(order_hash);

      setOrders(data.data.singleOrder[0]);
      setOrderServices(data.data.singleOrder[0].order_services);
    } catch (error) {
      console.log(error);
    }
  }

  // call the fetchData in useEffect
  useEffect(() => {
    fetchData();
  }, []);

  const handleCompleteOrder = (
    order_service_id,
    service_completed,
    isChecked
  ) => {
    if (isChecked) {
      setOrderServiceId([...orderServiceId, order_service_id]);
      setCompletedOrder([...completed, service_completed]);
    } else {
      setOrderServiceId(orderServiceId.filter((id) => id !== order_service_id));

      setCompletedOrder(completed.filter((id) => id !== service_completed));
    }
  };

  async function handleOrderUpdate(e) {
    e.preventDefault();
    const formData = {
      service_completed: completed.map((completed_value) => ({
        completed_value: completed_value,
      })),

      order_services: orderServiceId.map((order_service_id) => ({
        order_service_id: order_service_id,
      })),

      order_id,
    };

    try {
      setSpinner(!spin);
      const updateOrder = await Order.updateOrder(
        formData,
        loggedInEmployeeToken
      );
      fetchData();
      if (updateOrder?.status === 200) {
        fetchData();
        setServerMsg("Order Updated Succesfull...");

        setTimeout(() => {
          setSpinner(!spin);
          setServerMsg("");
        }, 2000);
      }
      fetchData();
    } catch (error) {
      // console.log(error);
      fetchData();
    }
  }

  return (
    <section className="contact-section pb-5 ">
      {/*  */}

      {/*order details*/}
      <div className=" ml-4 pb-0  d-flex order-danger ">
        <div className=" ml-4 p-  ">
          <div className="contact-title ">
            <div>
              <h2>
                Update Order Of :{" "}
                {orders.customer_first_name + " " + orders.customer_last_name}
              </h2>{" "}
            </div>
          </div>
        </div>
      </div>

      <div className=" ml-5 pb-0  d-flex order-danger ">
        <div className="bg-white p-4 mr-2 w-100">
          <div className=" d-flex justify-content-between">
            <h4 className="fw-bold font-weight-bold">
              <span className=" fw-bold mr-2">
                {orders.customer_first_name}
              </span>
              {orders.customer_last_name}
              <span></span>
            </h4>
          </div>
          <div>
            <span className="font-weight-bold mr-2">Email :</span>
            <span className="text-secondary">{orders.customer_email}</span>
          </div>
          <div>
            <span className="font-weight-bold mr-2 ">Phone Number:</span>
            <span className="text-secondary">
              {orders.customer_phone_number}
            </span>
          </div>
          <div>
            <span className="font-weight-bold mr-2">Order Id: </span>
            <span className="text-secondary">{orders.order_id}</span>
          </div>
          <div>
            <span className="font-weight-bold mr-2">Active Customer: </span>
            <span className="text-secondary">
              {orders.active_customer_status ? "Yes" : "No"}
            </span>
          </div>
          {/* <div>
            <span className="font-weight-bold mr-2">Edit customer info </span>
            <span>
              <a href="/admin/customer/update">edit</a>
            </span>
          </div> */}
        </div>{" "}
        <div className="bg-white p-4 mr-2 w-100">
          <div>
            <div className="d-flex justify-content-between">
              <h4 className="fw-bold font-weight-bold">
                <span className="fw-bold mr-2">{orders?.vehicle_make}</span>
              </h4>
            </div>
            <div>
              <span className="font-weight-bold mr-2">Color :</span>
              <span className="text-secondary">{orders.vehicle_color}</span>
            </div>
            <div>
              <span className="font-weight-bold mr-2">Tag :</span>
              <span className="text-secondary">{orders.vehicle_tag}</span>
            </div>
            <div>
              <span className="font-weight-bold mr-2">Year :</span>
              <span className="text-secondary">{orders.vehicle_year}</span>
            </div>
            <div>
              <span className="font-weight-bold mr-2">Vehicle mileage :</span>
              <span className="text-secondary">{orders.vehicle_mileage}</span>
            </div>
            <div>
              <span className="font-weight-bold mr-2">Serial :</span>
              <span className="text-secondary">{orders.vehicle_serial}</span>
            </div>
            {/* <div>
              <span className="font-weight-bold mr-2">Edit vehicle info </span>
              <span>
                <a href="/admin/customer/update">edit</a>
              </span>
            </div> */}
          </div>
        </div>{" "}
      </div>

      {/* Requested Services  */}
      <div className="contact-section my-0 py-4 pb-4">
        <div className="mr-5  ">
          <div className=" ml-5 pb-0  d-flex order-danger ">
            <div className=" ml-4 p-3 flex-grow-1 bg-white Regular shadow">
              <form onSubmit={handleOrderUpdate}>
                <div className="contact-title ">
                  <div>
                    <h2>Requested Services</h2>{" "}
                  </div>

                  {orderServices.map((service, i) => (
                    <div
                      key={i}
                      className="bg-white Regular shadow my-2 d-flex "
                    >
                      <div className="py-4 pb-1 px-4 flex-grow-1 ">
                        <h5 className="mb-1 font-weight-bold ">
                          {service.service_name}
                        </h5>
                        <h6 className=" mb-1 text-secondary">
                          {service.service_description}
                        </h6>
                      </div>
                      <div className="order_status px-5">
                        <h6
                          className={
                            service.service_completed
                              ? "text-center rounded-pill bg-success font-weight-bold text-white px-5"
                              : "text-center rounded-pill bg-warning font-weight-bold px-5"
                          }
                        >
                          {service.service_completed
                            ? "Completed"
                            : "In Progress"}
                        </h6>
                      </div>

                      <div className="d-flex align-items-center px-4">
                        {service.service_completed ? null : (
                          <input
                            type="checkbox"
                            //

                            // ref={(el) => {
                            //   // {console.log(el)}
                            //   serviceDoms.current[service.service_id] = el;
                            // }}
                            // ref={serviceDoms}
                            //

                            onChange={
                              (e) =>
                                handleCompleteOrder(
                                  service.order_service_id,
                                  1,
                                  e.target.checked
                                )

                              // {
                              //   console.log(serviceDoms.current.value);
                              //   console.log(e.target.checked);
                              //   console.log(service.service_id);
                              // }
                            }
                            //

                            // checked={selectedServices.includes(
                            //   service.service_id
                            // )}
                            //

                            className="wide-checkbox"
                            // required
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <button className="theme-btn rounded-pill jus" type="submit">
                  <h6
                    className={
                      !orders.order_status
                        ? "text-center rounded-pill  bg-warning font-weight-bold px-5 py-3"
                        : "text-center rounded-pill  bg-success font-weight-bold py-3 text-white"
                    }
                  >
                    {!orders.order_status
                      ? "Update Order"
                      : "🎉All Orders Completed🎉"}
                  </h6>
                </button>
                {serverMsg && (
                  <div
                    className="validation-error"
                    style={{
                      color: "green",
                      fontSize: "100%",
                      fontWeight: "600",
                      padding: "25px",
                    }}
                    role="alert"
                  >
                    {serverMsg}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EditOrder;
