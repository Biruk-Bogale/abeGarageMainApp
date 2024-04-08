// import the logIn service
const logInService = require("../services/login.service");

// Import the jsonwebtoken module
const jwt = require("jsonwebtoken");

// import the secret key from environment variable
const jwtSecret = process.env.JWT_SECRET;

// handle employee logIn
async function logIn(req, res, next) {
  try {
    const employeeData = req.body;

    // call the logIn method from the login service
    const employee = await logInService.logIn(employeeData);

    // if the employee is not found
    if (employee.status === "fail") {
      res.status(403).json({
        status: employee.status,
        message: employee.message,
      });
    }

    // if successful, return a response to the client
    const payload = {
      employee_id: employee.employee.employee_id,
      employee_email: employee.employee.employee_email,
      employee_role: employee.employee.company_role_id,
      employee_first_name: employee.employee.employee_first_name,
    };

    const token = jwt.sign(payload, jwtSecret, {
      expiresIn: "24h",
    });

    const sendBack = {
      employee_token: token,
    };

    res.status(200).json({
      status: "success",
      message: "employee logged in successfully",
      data: sendBack,
    });
  } catch (error) {
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
}

module.exports = { logIn };
