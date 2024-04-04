import React from "react";

// Import the Routes and Route components from react-router
import { Routes, Route } from "react-router";

// Import the page components
import Home from "./markup/pages/Home";
import Login from "./markup/pages/Login";
import Unauthorized from "./markup/pages/Unauthorized";
import AddEmployee from "./markup/pages/admin/AddEmployee";
import Employees from "./markup/pages/admin/Employees";
import EditEmployee from "./markup/pages/admin/EditEmployee";
import AddCustomer from "./markup/pages/admin/AddCustomer";
import Customers from "./markup/pages/admin/Customers";
import EditCustomer from "./markup/pages/admin/EditCustomer";
import Admin from "./markup/pages/admin/Admin";
import NewOrder from "./markup/pages/admin/NewOrder";
import CustomerProfilee from "./markup/pages/admin/CustomerProfilee";
import Services from "./markup/pages/admin/Services";
import EditService from "./markup/pages/admin/EditService";
import Orders from "./markup/pages/admin/Orders";
import EditOrder from "./markup/pages/admin/EditOrders";
import OrderDetails from "./markup/pages/admin/OrderDetails";
import AddNewOrders from "./markup/pages/admin/AddNewOrders";
import CreateNewOrders from "./markup/pages/admin/CreateNewOrders";

// Import the header and footer components
import Header from "./markup/components/Header/Header";
import Footer from "./markup/components/Footer/Footer";

// import the css files
import "./assets/template_assets/css/bootstrap.css";
import "./assets/template_assets/css/style.css";
import "./assets/template_assets/css/responsive.css";
import "./assets/template_assets/css/color.css";

// import the custom files
import "./assets/styles/custom.css";

// import the PrivateAuthToute component
import PrivateAuthRoute from "./markup/components/Auth/PrivateAuthRoute";
import AddNewOrder from "./markup/components/Admin/AddNewOrder/AddNewOrder";

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* home page route */}
        <Route path="/" element={<Home />} />
        {/* login page route */}
        <Route path="/login" element={<Login />} />
        {/* unauthorized page route */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        {/* Orders page route */}

        {/* Customers page route */}
        <Route
          path="/admin/customers"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <Customers />
            </PrivateAuthRoute>
          }
        />

        {/* add customer page route */}
        <Route path="/admin/add-customer" element={<AddCustomer />} />

        {/* Edit Customer Page Route */}
        <Route
          path="/admin/customer-update/:customer_hash"
          element={<EditCustomer />}
        />

        {/* Customer Profile Page Route */}
        <Route
          path="/admin/customer-profile/:customer_hash"
          element={<CustomerProfilee />}
        />

        {/* New Order Page Route */}
        <Route path="/admin/services" element={<Services />} />

        {/* Customer Profile Page Route */}
        <Route
          path="/admin/services/service-update/:service_hash"
          element={<EditService />}
        />

        {/* New Order Page Route */}
        <Route path="/admin/order" element={<NewOrder />} />

        <Route
          path="/admin/orders"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <Orders />
            </PrivateAuthRoute>
          }
        />

        <Route
          path="admin/orders/order-update/:hash"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <EditOrder />
            </PrivateAuthRoute>
          }
        />

        <Route
          path="/orders/order-detail/:order_hash"
          element={<OrderDetails />}
        />

        <Route
          path="admin/order/add-new-order/:customer_hash"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <AddNewOrders />
            </PrivateAuthRoute>
          }
        />

        <Route
          path="admin/order/add-new-order/select-service/:customer_hash/:vehicle_id"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <CreateNewOrders />
            </PrivateAuthRoute>
          }
        />

        {/* Employees page route */}
        <Route path="/admin/employees" element={<Employees />} />
        {/* admin page route */}
        <Route path="/admin" element={<Admin />} />
        {/* Edit Employees page route */}
        <Route
          path="/admin/employee-update/:employee_hash"
          element={<EditEmployee />}
        />
        {/* add employee page route */}
        <Route path="/admin/add-employee" element={<AddEmployee />} />
      </Routes>
      <Footer />
    </>
  );
}
export default App;
