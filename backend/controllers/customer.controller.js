// import the customer service
const {
  checkIfCustomerExists,
  createCustomerr,
  getAllCustomerss,
  updateCustomerr,
  getSingleCustomerr,
  findCustomerr,
} = require("../services/customer.service");

// a function to create a customer
async function createCustomer(req, res, next) {
  const { customer_email } = req.body;
  // console.log(customer_email)

  try {
    const customerExists = await checkIfCustomerExists(customer_email);
    // console.log(customerExists)

    if (customerExists) {
      return res.status(400).json({
        msg: "This email address is already associated with  another customer!",
      });
    } else {
      try {
        const customerData = req.body;
        // console.log(customerData);

        const newCustomer = await createCustomerr(customerData);
        // console.log(newCustomer)

        if (!newCustomer) {
          return res.status(400).json({
            error: "Failed to add the customer!",
          });
        } else {
          res.status(200).json({ status: "Customer added successfully" });
        }
      } catch (error) {
        // console.log(error);
        return res.status(400).json({
          error: "Something went wrong!",
        });
      }
    }
  } catch (error) {
    // console.log(error);
    return res.status(400).json({
      error: "Something went wrong!",
    });
  }
}

// a function to get all customer
async function getAllCustomers(req, res, next) {
  try {
    const customers = await getAllCustomerss();

    if (!customers) {
      res.status(400).json({
        error: "Failed to get all Customers!",
      });
    } else {
      res.status(200).json({
        status: "Customers retrieved successfully!",
        customers: customers,
      });
    }
  } catch (error) {
    // console.log(error);
    res.status(404).json({
      error: "Something went wrong!",
    });
  }
}

// a function to update customer
async function updateCustomer(req, res, next) {
  // console.log(req.body)
  try {
    const updateCustomer = await updateCustomerr(req.body);

    // console.log(updateCustomer)

    const rows1 = updateCustomer.rows1.affectedRows;
    const rows2 = updateCustomer.rows2.affectedRows;

    // console.log(rows1, rows2);

    if (!updateCustomer) {
      return res.status(400).json({
        error: "Failed to update the customer!",
      });
    } else if (rows1 === 1 && rows2 === 1) {
      return res.status(200).json({
        status: "Customer Successful Updated!",
      });
    } else {
      return res.status(400).json({
        status: "Update Incomplete!",
      });
    }
  } catch (error) {
    // console.log(error);
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
}

// a function to get single customer
async function getsingleCustomer(req, res, next) {
  const customer_hash = req.params.hash;
  // console.log(customer_hash)

  try {
    const singleCustomer = await getSingleCustomerr(customer_hash);
    // console.log(singleCustomer);

    if (!singleCustomer) {
      res.status(400).json({
        error: "Failed to get Customer!",
      });
    } else {
      res.status(200).json({
        status: "Customer retrieved successfully! ",
        singleCustomer: singleCustomer,
      });
    }
  } catch (error) {
    // console.log(error);
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
}

// a function to get find customer
async function findCustomer(req, res, next) {
  // console.log(req.query);
  try {
    const customer = await findCustomerr(req.query);
    // console.log(customer)

    if (customer.length < 1) {
      return res.status(400).json({
        error: "Customer Not Found!",
      });
    } else {
      return res.status(200).json({
        status: "Customer found!!",
        customer: customer,
      });
    }
  } catch (error) {
    // console.log(error);
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
}

module.exports = {
  createCustomer,
  getAllCustomers,
  updateCustomer,
  getsingleCustomer,
  findCustomer,
};
