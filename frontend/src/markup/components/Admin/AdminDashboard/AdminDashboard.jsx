import React from "react";

import { Link } from "react-router-dom";

function AdminDashboard() {
  const Dashboard = [
    {
      link: "/admin/orders",
      h5: "Open For All",
      h2: "All Orders",
      div: "LIST OF ORDER +",
      icon: "flaticon-power",
    },
    {
      link: "/admin/order",
      h5: "Admin Role",
      h2: "Create Order",
      div: "NEW ORDER +",
      icon: "flaticon-power",
    },
    {
      link: "/admin/add-employee",
      h5: "Admin Role",
      h2: "Add Employee",
      div: "EMPLOYEE +",
      icon: "flaticon-power",
    },
    {
      link: "/admin/employees",
      h5: "Open For All",
      h2: "Employees List",
      div: "EMPLOYEEs List",
      icon: "flaticon-power",
    },
    {
      link: "/admin/add-customer",
      h5: "Admin Role",
      h2: "Add Customer",
      div: "CUSTOMER List",
      icon: "flaticon-power",
    },
    {
      link: "/admin/customers",
      h5: "Open For All",
      h2: "Customers List",
      div: "Customers List",
      icon: "flaticon-power",
    },
    {
      link: "/admin/services",
      h5: "Open For All",
      h2: "Services List",
      div: "Service +",
      icon: "flaticon-power",
    },
  ];

  return (
    <div>
      <section className="services-section">
        <div className="mx-3">
          <div className="sec-title style-two">
            <h2>Admin Dashboard</h2>
            <div class="text">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe
              vitae optio est, eos voluptatum molestiae nam labore tempora
              libero quidem iste dignissimos, earum magni exercitationem id sunt
              a impedit eaque.
            </div>
          </div>

          <div className="row">
            {Dashboard.map((dash) => (
              <div className="col-lg-4 service-block-one">
                <Link to={dash.link}>
                  <div className="inner-box hvr-float-shadow">
                    <h5>{dash.h5}</h5>
                    <h2>{dash.h2}</h2>
                    <div className="read-more">{dash.div}</div>
                    <div className="icon">
                      <span className={dash.icon}></span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;
