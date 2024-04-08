// import the express module
const express = require("express");

// call the router method from express to create the router
const router = express.Router();

// import the authMiddleware
const {
  verifyToken,
  isAdmin,
  isAdmin_Manager,
  isAdmin_Manager_Employee,
} = require("../middlewares/auth.middleware");

// import the customer controller
const customerController = require("../controllers/customer.controller");

// create a route to handle the customers request in post
router.post(
  "/api/customer",
  [verifyToken, isAdmin],
  customerController.createCustomer
);

// create a route to handle the get all customers request in get
router.get(
  "/api/customers",
  [verifyToken, isAdmin_Manager],
  customerController.getAllCustomers
);

// create a route to handle the customer request in put
router.put(
  "/api/customer/update",
  [verifyToken, isAdmin],
  customerController.updateCustomer
);

// create a route to handle the get single customers request in get
router.get(
  "/api/customer/single/:hash",
  [verifyToken, isAdmin],
  customerController.getsingleCustomer
);

// create a route to handle the find customers request in get
router.get(
  "/api/customer/find",
  [verifyToken, isAdmin],
  customerController.findCustomer
);

// export the router
module.exports = router;
