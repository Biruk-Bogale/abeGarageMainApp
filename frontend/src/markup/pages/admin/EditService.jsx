import React from "react";

// import the auth hook context
import { useAuth } from "../../../Context/AuthContext";

// import the login component
import LoginForm from "../../components/LoginForm/LoginForm";

// import the admin menu component
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";

import EditService from "../../components/Admin/EditServices/EditServices";
import { Link } from "react-router-dom";

function EditEmployee() {
  const { isLogged, isAdmin } = useAuth();

  // console.log(useAuth())

  if (isLogged) {
    if (isAdmin) {
      return (
        <div>
          <div className="container-fluid admin-pages">
            <div className="row">
              <div className="col-md-3 admin-left-side">
                <AdminMenu />
              </div>
              <div className="col-md-9 admin-right-side">
                <EditService />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div class="not-found-container">
          <div class="not-found-content">
            <h2>
              {" "}
              You don't have the Permission to access the page you request!
            </h2>
            <Link class="back-home-link" to="/">
              <span> Back to Home</span>
            </Link>
          </div>
        </div>
      );
    }
  } else {
    return (
      <div>
        <LoginForm />
      </div>
    );
  }
}

export default EditEmployee;
