import React, { useState, useEffect } from "react";

import { Table } from "react-bootstrap";

import { useParams, useNavigate, Link } from "react-router-dom";

import { BeatLoader } from "react-spinners";
import { FaEdit } from "react-icons/fa";
import { FaHandPointer } from "react-icons/fa";

// import services
import vehicleService from "../../../../services/vehicle.services";
import customerService from "../../../../services/customer.services";

// import the useAuth hook
import { useAuth } from "../../../../Context/AuthContext";

function AddNewOrder() {
  const navigate = useNavigate();
  const [customer1, setCustomer1] = useState("");
  const [vehicle1, setVehicle1] = useState([]);
  const [vehicle_error, setVehicle_Error] = useState([]);

  const { customer_hash } = useParams();

  // spinner handler state
  const [spin, setSpinner] = useState(false);

  // create a variable to hold the users token
  let loggedInEmployeeToken = "";
  // destructure the auth hook and get the token
  const { employee } = useAuth();
  if (employee && employee.employee_token) {
    loggedInEmployeeToken = employee.employee_token;
  }

  // afunction to fetch customer data
  const fetchData1 = async () => {
    try {
      const data = await customerService.singleCustomer(
        customer_hash,
        loggedInEmployeeToken
      );

      setCustomer1(data.data.singleCustomer[0]);
    } catch (error) {
      console.log(error);
    }
  };

  //afunction to fetch customer vehicle data
  const fetchData2 = async () => {
    try {
      const data2 = await vehicleService.getCustomerVehicle(
        customer_hash,
        loggedInEmployeeToken
      );
      setVehicle1(data2.data.customerVehicle);

      setTimeout(() => {
        setSpinner(!spin);
      }, 200);
    } catch (error) {
      console.log();
      setVehicle_Error(error.response.data.error);
      setSpinner(!spin);
    }
  };

  useEffect(() => {
    fetchData1();
    fetchData2();
  }, []);

  function handleChoose(customer_hash, vehicle_id) {
    navigate(
      `/admin/order/add-new-order/select-service/${customer_hash}/${vehicle_id}`
    );
  }

  return (
    <section className="contact-section">
      <div className="mx-5">
        {" "}
        <div className="contact-title">
          <div>
            <h2>Create New Order 2</h2>{" "}
          </div>
        </div>
        {/* Customer Info */}
        <div
          className=" ml-5 pb-4  d-flex order-danger "
          style={{ borderLeft: "2px solid red" }}>
          <div
            className="ml-n5 bg-danger text-center d-flex align-items-center justify-content-center rounded-circle text-white font-weight-bolder"
            style={{ width: "90px", height: "90px" }}>
            Info
          </div>
          <div className=" ml-4 p-3 flex-grow-1">
            <div className=" d-flex justify-content-between">
              <h4 className="fw-bold font-weight-bold">
                <span className=" fw-bold mr-2">
                  {" "}
                  {customer1?.customer_first_name}
                </span>
                {customer1?.customer_last_name}
                <span></span>
              </h4>
            </div>

            <div>
              <span className="font-weight-bold mr-2">Email :</span>
              <span className="text-secondary">
                {customer1?.customer_email}
              </span>
            </div>

            <div>
              <span className="font-weight-bold mr-2 ">Phone Number:</span>
              <span className="text-secondary">
                {customer1?.customer_phone_number}
              </span>
            </div>

            <div>
              <span className="font-weight-bold mr-2">Active Customer: </span>
              <span className="text-secondary">
                {customer1?.active_customer_status ? "Yes" : "No"}
              </span>
            </div>

            <div>
              <span className="font-weight-bold mr-2">Edit customer info </span>
              <span>
                <Link to={`/admin/customer-update/${customer1.customer_hash}`}>
                  <FaEdit color="#081336" />
                </Link>
              </span>
            </div>
          </div>
        </div>
        {/* customer Vehicle */}
        <div className="d-flex">
          <div
            className=" pb-5 ml-5 d-flex "
            style={{ borderLeft: "2px solid red" }}>
            <div
              className="ml-n5 bg-danger text-center d-flex align-items-center justify-content-center rounded-circle text-white font-weight-bolder"
              style={{ width: "90px", height: "90px" }}>
              Cars
            </div>
          </div>
          <div className=" ml-3 w-100 px-4">
            <div>
              <div>
                <h4 className="font-weight-bold mt-2 mb-3">
                  CHOOSE A VEHICLES
                </h4>
              </div>
              <div className=" bg-white px-2 py-1 ">
                {vehicle1?.length ? (
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Vehicle Year</th>
                        <th>Vehicle Make</th>
                        <th>Vehicle Model</th>
                        <th>Vehicle Type</th>
                        <th>Vehicle Mileage</th>
                        <th>Vehicle Tag</th>
                        <th>Vehicle Serial</th>
                        <th>Vehicle Color</th>
                        <th>Choose</th>
                      </tr>
                    </thead>
                    <tbody>
                      {spin ? (
                        vehicle1.map((vehicle) => (
                          <tr key={vehicle.id}>
                            <td>{vehicle.vehicle_year}</td>
                            <td>{vehicle.vehicle_make}</td>
                            <td>{vehicle.vehicle_model}</td>
                            <td>{vehicle.vehicle_type}</td>
                            <td>{vehicle.vehicle_mileage}</td>
                            <td>{vehicle.vehicle_tag}</td>
                            <td>{vehicle.vehicle_serial}</td>
                            <td>{vehicle.vehicle_color}</td>
                            <td>
                              <span
                                onClick={() =>
                                  handleChoose(
                                    customer1.customer_hash,
                                    vehicle.vehicle_id
                                  )
                                }
                                className="hover1">
                                <FaHandPointer color="#081336" />
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <span className="align-text-center">
                          <BeatLoader color="#081336" size={30} />
                        </span>
                      )}
                    </tbody>
                  </Table>
                ) : (
                  <div className="NoVehicle">
                    <h2> {vehicle_error}</h2>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-2" style={{ widows: "85%" }}>
              <div className="pt-2 pb-3 d-flex justify-content-start">
                <div
                  // onClick={Show}
                  className=" rounded-circle d-flex justify-content-center align-items-center "
                  style={{ height: "25px", width: "25px" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddNewOrder;
