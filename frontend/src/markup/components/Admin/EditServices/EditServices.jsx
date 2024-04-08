import React, { useState, useEffect, useRef } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

// import recat components
import { Table, Button } from "react-bootstrap";

// import react icons
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

// import the auth hook
import { useAuth } from "../../../../Context/AuthContext";

// import the employee service to use the get employees function
import SERVICE from "../../../../services/service.services";

// import the date-fns library
import { format } from "date-fns";

////////////////////////////////////////
function ServiceList() {
  const navigate = useNavigate();

  const [service_name, setServiceName] = useState("");
  const [service_description, setServiceDescription] = useState("");
  const [services, setServices] = useState([]);

  // target
  const serviceNameDom = useRef();
  const serviceDescriptionDom = useRef();

  // to serve as aflag to show the error message
  const [apiError, setApiError] = useState(false);

  // store the error message
  const [apiErrorMessage, setApiErrorMessage] = useState(null);

  const { service_hash } = useParams();

  // create a variable to hold the users token
  let loggedInEmployeeToken = "";
  // destructure the auth hook and get the token
  const { employee } = useAuth();
  if (employee && employee.employee_token) {
    loggedInEmployeeToken = employee.employee_token;
  }

  // service name value tracker
  function serviceNameTracker() {
    setServiceName(serviceNameDom.current.value);
  }

  // service description value tracker
  function serviceDescriptionTracker() {
    setServiceDescription(serviceDescriptionDom.current.value);
  }

  // fetch data
  async function fetchData() {
    try {
      const data = await SERVICE.singleService(
        service_hash,
        loggedInEmployeeToken
      );

      console.log(data.data.singleService);
      setServices(data.data.services);

      setServiceName(data.data.singleService[0].service_name);
      setServiceDescription(data.data.singleService[0].service_description);

      // setVehicleError("");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // submit handler
  async function handleSubmit(e) {
    // prevent the default behavior of the form submission
    e.preventDefault();

    // prepare the data for form submission
    const formData = {
      service_name,
      service_description,
      service_hash,
    };

    try {
      const data = await SERVICE.updateService(formData, loggedInEmployeeToken);

      navigate("/admin/services");
      setServiceName("");
      setServiceDescription("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <section className="contact-section pb-5">
        <div className=" bg-white px-5 pt-5 mt-4 contact-title mb-1">
          <h2>Update " {service_name} " Service </h2>
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="row clearfix">
                <div className="form-group col-md-12">
                  <input
                    type="text"
                    name="service_name"
                    placeholder="Service name"
                    ref={serviceNameDom}
                    onChange={serviceNameTracker}
                    value={service_name}
                    required
                  />
                </div>

                <div className="form-group col-md-12">
                  <textarea
                    type="text"
                    name="service_description"
                    placeholder="Service description"
                    ref={serviceDescriptionDom}
                    onChange={serviceDescriptionTracker}
                    value={service_description}
                    required=""
                  ></textarea>
                </div>

                <div className="form-group col-md-12">
                  <button class="theme-btn btn-style-one" type="submit">
                    <span>UPDATE SERVICE</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default ServiceList;
