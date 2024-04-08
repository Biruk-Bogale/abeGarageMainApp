// import the query function from the db.config.js
const connection = require("../config/db.config");

// import the bcrypt module to do the password comparsion
const bcrypt = require("bcrypt");

// import the employee service to get employee by email
const employeeService = require("./employee.service");

// Hnadle employee login
async function logIn(employeeData) {
  try {
    // object to be returned
    let returnData = {};

    const employee = await employeeService.getEmployeeByEmail(
      employeeData.employee_email
    );

    if (employee.length == 0) {
      returnData = {
        status: "fail",
        message: "employee does not exist",
      };
      return returnData;
    }

    const passwordMatch = await bcrypt.compare(
      employeeData.employee_password,
      employee[0].employee_password_hashed
    );

    // return passwordMatch

    if (!passwordMatch) {
      returnData = {
        status: "fail",
        message: "incorrect password",
      };
      return returnData;
    }

    returnData = {
      status: "success",
      message: "login successful",
      employee: employee[0],
    };
    // console.log(employee[0])
    return returnData;
  } catch (error) {
    // console.log(error);
  }
}

// Export the function
module.exports = { logIn };
