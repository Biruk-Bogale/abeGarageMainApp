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
const orderController = require("../controllers/order.controller");

// create a route to handle the service request in post
router.post(
  "/api/order",
  // [verifyToken, isAdmin],
  orderController.createOrder
);

// create a route to handle the service request in get
router.get(
  "/api/orders",
  // [verifyToken, isAdmin],
  orderController.getAllOrders
);

// create a route to handle the get single order request in get
router.get(
  "/api/order/single/:hash",
  //   [verifyToken, isAdmin_Manager],
  orderController.getsingleOrder
);

// create a route to handle the order request in put
router.put(
  "/api/order/update",
  //   [verifyToken, isAdmin],
  orderController.updateorder
);

router.get(
  "/api/order/customer/:hash",
  //   [verifyToken, isAdmin],
  orderController.customerOrders
);



// export the router
module.exports = router;
