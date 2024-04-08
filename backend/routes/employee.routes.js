// import the express module
const express = require("express");

// call the router method from express to create the router
const router = express.Router();

// import the authMiddleware
const {
  verifyToken,
  isAdmin,
  isAdmin_Manager,
} = require("../middlewares/auth.middleware");

// import the employee controller
const employeeController = require("../controllers/employee.controller");

// create a route to handle the employee request in post
router.post(
  "/api/employee",
  [verifyToken, isAdmin],
  employeeController.createEmployee
);

// create a route to handle the get all employee request in get
router.get(
  "/api/employees",
  [verifyToken, isAdmin_Manager],
  employeeController.getAllEmployeees
);

// create a route to handle the get single employee request in get
router.get(
  "/api/employee/single/:hash",
  [verifyToken, isAdmin],
  employeeController.getSingleEmployee
);

// create a route to handle the employee request in put
router.put(
  "/api/employee/update",
  [verifyToken, isAdmin],
  employeeController.updateEmployee
);

// export the router
module.exports = router;
