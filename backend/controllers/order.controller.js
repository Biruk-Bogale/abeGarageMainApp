// import order service
const {
  createOrderr,
  getAllOrderss,
  getsingleOrderr,
  updateOrderr,
  customerOrderss,
} = require("../services/order.service");

async function createOrder(req, res, next) {
  // console.log(req.body.order_services.length);

  if (req.body.order_services.length < 1) {
    return res.status(400).json({
      error: "Please select at least one service!",
    });
  }
  try {
    const createdOrder = await createOrderr(req.body);

    if (!createdOrder) {
      return res.status(400).json({
        error: "Failed/Incomplete to add the Order!",
      });
    } else {
      res.status(200).json({ status: "Order added successfully" });
    }
  } catch (error) {
    res.status(404).json({
      error: "Something went wrong!",
    });
  }
}

async function getAllOrders(req, res, next) {
  try {
    const AllOrders = await getAllOrderss();

    if (!AllOrders) {
      res.status(400).json({
        error: "Failed to get all Orders!",
      });
    } else if (AllOrders.length < 1) {
      res.status(400).json({
        error: "Failed to get all Orders!",
      });
    } else {
      res.status(200).json({
        status: "Orders retrieved successfully!",
        Orders: AllOrders,
      });
    }
  } catch (error) {}
}

async function getsingleOrder(req, res, next) {
  const service_hash = req.params.hash;

  try {
    const singleOrder = await getsingleOrderr(service_hash);

    if (!singleOrder[0]?.order_id) {
      res.status(400).json({
        error: "Failed to get the Order!",
      });
    } else {
      res.status(200).json({
        status: "Order retrieved successfully! ",
        singleOrder: singleOrder,
      });
    }
  } catch (error) {
    res.status(404).json({
      error: "Something went wrong!",
    });
  }
}

async function updateorder(req, res, next) {
  try {
    const updateOrder = updateOrderr(req.body);

    if (!updateOrder) {
      res.status(400).json({
        error: "Failed to Update the Order!",
      });
    } else {
      res.status(200).json({
        status: "Order Updated successfully! ",
      });
    }
  } catch (error) {
    res.status(404).json({
      error: "Something went wrong!",
    });
  }
}

async function customerOrders(req, res, next) {
  try {
    const customerOrder = await customerOrderss(req.params.hash);

    if (!customerOrder.length) {
      return res.status(400).json({
        error: "No Order Found!",
      });
    } else {
      return res.status(200).json({
        status: "Order Found!!",
        customerOrder: customerOrder,
      });
    }
  } catch (error) {
    res.status(404).json({
      error: "Something went wrong!",
    });
  }
}

module.exports = {
  createOrder,
  getAllOrders,
  getsingleOrder,
  updateorder,
  customerOrders,
};
