import React from "react";

// import the auth hook context
import { useAuth } from "../../../Context/AuthContext";

// import the login component
import LoginForm from "../../components/LoginForm/LoginForm";

// import the admin menu component
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";

import CustomerProfile from "../../components/Admin/CustomerProfile/CustomerProfile";
import { Link } from "react-router-dom";

function CustomerProfilee() {
  const { isLogged, isAdmin_manager, isAdmin } = useAuth();

  if (isLogged) {
    if (isAdmin_manager || isAdmin) {
      return (
        <div>
          <div className="container-fluid admin-pages">
            <div className="row">
              <div className="col-md-3 admin-left-side">
                <AdminMenu />
              </div>
              <div className="col-md-9 admin-right-side">
                <CustomerProfile />
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

export default CustomerProfilee;
