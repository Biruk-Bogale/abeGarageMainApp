import React from "react";

// Import the Admin component
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import AdminDashboard from "../../components/Admin/AdminDashboard/AdminDashboard";

// import the auth hook context
import { useAuth } from "../../../Context/AuthContext";

// import the login component
import LoginForm from "../../components/LoginForm/LoginForm";

function Admin(props) {
  const { isLogged, isAdmin } = useAuth();

  if (isLogged) {
    return (
      <div>
        <div className="container-fluid admin-pages">
          <div className="row">
            <div className="col-md-3 admin-left-side">
              <AdminMenu />
            </div>
            <div className="col-md-9 admin-right-side">
              <AdminDashboard />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h5
          style={{
            color: "red",
            paddingLeft: "320px",
            position: "absolute",
            top: "300px",
          }}
        ></h5>
        <LoginForm />
      </div>
    );
  }
}

export default Admin;
