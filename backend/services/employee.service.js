// import the query function from the db.config.js file
const connection = require("../config/db.config");

// import the crypto module to generate random id
const crypto = require("crypto");

// Import the bcrypt module
const bcrypt = require("bcrypt");

// A function to check employee existance
async function checkIfEmployeeExists(email) {
  try {
    const query = "SELECT * FROM employee Where employee_email = ?";

    const rows = await connection.query(query, [email]);

    if (rows.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    // console.log(error)
  }
}

// A function to  create employee
async function createEmploye(employee) {
  let createdEmployee = {};

  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);

    const hash_id = crypto.randomUUID();

    // hash the password
    const hashedPassword = await bcrypt.hash(employee.employee_password, salt);

    // Insert the email in to the employee table
    const queryEmployee =
      "INSERT INTO employee (employee_hash,employee_email,active_employee) VALUES (?,?,?)";

    const rows = await connection.query(queryEmployee, [
      hash_id,
      employee.employee_email,
      employee.active_employee,
    ]);

    if (rows.affectedRows !== 1) {
      return false;
    }

    // Get the employee id from the insert
    const employee_id = rows.insertId;

    // insert the employee_info table data

    const queryEmployeeInfo =
      "INSERT INTO employee_info (employee_hash,employee_id, employee_first_name, employee_last_name, employee_phone) VALUES (?,?,?,?,?)";

    const rows2 = await connection.query(queryEmployeeInfo, [
      hash_id,
      employee_id,
      employee.employee_first_name,
      employee.employee_last_name,
      employee.employee_phone,
    ]);

    // insert the employee_pass table data
    const queryEmployeePass =
      "INSERT INTO employee_pass (employee_hash,employee_id, employee_password_hashed) VALUES (?,?,?)";

    const rows3 = await connection.query(queryEmployeePass, [
      hash_id,
      employee_id,
      hashedPassword,
    ]);

    // insert the employee_role table data
    const queryEmployeeRole =
      "INSERT INTO employee_role (employee_hash,employee_id, company_role_id) VALUES (?,?,?)";

    const rows4 = await connection.query(queryEmployeeRole, [
      hash_id,
      employee_id,
      employee.company_role_id,
    ]);

    // insert the employee hash id table data
    const queryEmployeeHashId =
      "INSERT INTO employee_hash_id (employee_id, employee_hash) VALUES (?,?)";

    const rows5 = await connection.query(queryEmployeeHashId, [
      employee_id,
      hash_id,
    ]);

    // construct to the employee object to return
    createdEmployee = {
      employee_id: employee_id,
    };
  } catch (error) {
    // console.log(error);
  }

  // return the employee object
  return createdEmployee;
}

// A function to get employee by email
async function getEmployeeByEmail(employee_email) {
  try {
    const query =
      "SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_pass ON employee.employee_id = employee_pass.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id WHERE employee.employee_email = ?";

    const rows = await connection.query(query, [employee_email]);

    return rows;
  } catch (error) {
    console.log(error);
  }
}

// A FUNCTION TO GET SINGLE EMPLOYEE BY HASH ID
async function getSingleEmploye(employee) {
  try {
    const employee_hash = employee;

    const query =
      "SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id INNER JOIN company_roles ON employee_role.company_role_id = company_roles.company_role_id WHERE employee.employee_hash = ?";

    const rows = await connection.query(query, [employee_hash]);

    return rows;
  } catch (error) {
    console.log(error);
  }
}

// A function to get all employees
async function getAllEmployees() {
  try {
    const query =
      "SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id INNER JOIN company_roles ON employee_role.company_role_id = company_roles.company_role_id ORDER BY employee.active_employee DESC, employee_info.employee_first_name ASC LIMIT 10";

    const rows = await connection.query(query);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

// A function to update employees by id
async function updateEmploye(employee) {
  try {
    const employee_hash = employee.employee_hash;

    const query1 = ` UPDATE employee_info SET employee_first_name = ?, employee_last_name = ?, employee_phone = ? WHERE employee_hash = ?`;

    const query2 = `UPDATE employee_role SET company_role_id = ? WHERE employee_hash = ?`;

    const query3 = `UPDATE employee SET active_employee = ? WHERE employee_hash = ?`;

    // for employee_info table
    const rows1 = await connection.query(query1, [
      employee.employee_first_name,
      employee.employee_last_name,
      employee.employee_phone,
      employee_hash,
    ]);

    // for employee_role table
    const rows2 = await connection.query(query2, [
      employee.company_role_id,
      employee_hash,
    ]);

    // for employee table
    const rows3 = await connection.query(query3, [
      employee.active_employee,
      employee_hash,
    ]);

    return { rows1, rows2, rows3 };
  } catch (error) {
    console.log(error);
  }
}

// A function to delete employees by id
async function deleteEmploye(employee_id) {
  // console.log(employee_id);

  const query1 = "DELETE FROM employee_info WHERE  employee_id = ?";

  const query2 = "DELETE FROM employee_role WHERE employee_id = ?";

  const query3 = "DELETE FROM employee_pass WHERE employee_id = ?";

  const query4 = "DELETE FROM employee WHERE employee_id = ?";

  const rows1 = await connection.query(query1, [employee_id]);

  const rows2 = await connection.query(query2, [employee_id]);

  const rows3 = await connection.query(query3, [employee_id]);

  const rows4 = await connection.query(query4, [employee_id]);

  return { rows1, rows2, rows3, rows4 };
}

module.exports = {
  checkIfEmployeeExists,
  createEmploye,
  getEmployeeByEmail,
  getAllEmployees,
  updateEmploye,
  deleteEmploye,
  getSingleEmploye,
};
