// import the query function from the db.config.js file
const connection = require("../config/db.config");

// import the crypto module to generate random id
const crypto = require("crypto");

// A function to check employee existance
async function checkIfCustomerExists(email) {
  try {
    //   console.log(email);

    const query = "SELECT * FROM customer_identifier Where customer_email = ?";

    const rows = await connection.query(query, [email]);

    // console.log(rows);

    if (rows.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    // console.log(error);
  }
}

// a function to create a new customer
async function createCustomerr(customer) {
  // console.log(customer)

  let createdCustomer = {};

  try {
    const hash_id = crypto.randomUUID();
    //   console.log(hash_id)

    // insetr the customer identifier data
    const queryCustomer =
      "INSERT INTO customer_identifier (customer_hash, customer_email, customer_phone_number) VALUES (?,?,?)";

    const rows = await connection.query(queryCustomer, [
      hash_id,
      customer.customer_email,
      customer.customer_phone,
    ]);
    //   console.log(rows.affectedRows);

    if (rows.affectedRows !== 1) {
      return false;
    }

    const customer_id = rows.insertId;
    //   console.log(customer_id);

    // insert customer info data
    const customerInfo =
      "INSERT INTO customer_info (customer_id, customer_first_name, customer_last_name, active_customer_status) VALUES (?,?,?,?)";

    const rows2 = await connection.query(customerInfo, [
      customer_id,
      customer.customer_first_name,
      customer.customer_last_name,
      customer.active_customer,
    ]);

    createdCustomer = {
      customer_id: customer_id,
    };
  } catch (error) {
    // console.log(error);
  }

  //  return created customer object
  return createdCustomer;
}

// a Function to get All customers
async function getAllCustomerss() {
  try {
    const query =
      "SELECT * FROM customer_identifier INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id ORDER BY customer_identifier.customer_id DESC";

    const rows = await connection.query(query);
    // console.log(rows);

    return rows;
  } catch (error) {
    // console.log(error)
  }
}

async function updateCustomerr(customer) {
  try {
    const customer_hash = customer.customer_hash;

    const query = "SELECT * FROM customer_identifier WHERE customer_hash = ?";

    const rows = await connection.query(query, [customer_hash]);

    // console.log(rows[0].customer_id);
    const customer_id = rows[0].customer_id;

    const query1 = `UPDATE customer_identifier SET customer_phone_number = ? WHERE customer_id = ?`;

    const query2 = `UPDATE customer_info SET customer_first_name = ?, customer_last_name = ?, active_customer_status = ? WHERE customer_id = ?`;

    const rows1 = await connection.query(query1, [
      customer.customer_phone,
      customer_id,
    ]);

    const rows2 = await connection.query(query2, [
      customer.customer_first_name,
      customer.customer_last_name,
      customer.active_customer,
      customer_id,
    ]);

    // console.log(rows1, rows2);

    return { rows1, rows2 };
  } catch (error) {
    console.log(error);
  }
}

// a function to get single customer
async function getSingleCustomerr(customer) {
  try {
    const customer_hash = customer;

    const query = "SELECT * FROM customer_identifier WHERE customer_hash = ?";

    const rows = await connection.query(query, [customer_hash]);

    // console.log(rows[0].customer_id);
    const customer_id = rows[0].customer_id;

    const query1 = `SELECT * FROM customer_identifier INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id WHERE customer_identifier.customer_id = ?`;

    const rows1 = await connection.query(query1, [customer_id]);

    // console.log(rows);

    return rows1;
  } catch (error) {
    console.log(error);
  }
}

// find customer with query parameter
async function findCustomerr(customer) {
  // console.log(customer)
  try {
    const query = `SELECT * FROM customer_identifier INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id WHERE customer_info.customer_first_name LIKE '%${customer.query}%' OR customer_info.customer_last_name LIKE '%${customer.query}%' OR customer_identifier.customer_email LIKE '%${customer.query}%' OR customer_identifier.customer_phone_number LIKE '%${customer.query}%'`;

    const rows = await connection.query(query);

    console.log(rows);

    return rows;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  checkIfCustomerExists,
  createCustomerr,
  getAllCustomerss,
  updateCustomerr,
  getSingleCustomerr,
  findCustomerr,
};
