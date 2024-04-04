// import the query function from the db.config.js file
const { query } = require("express");
const connection = require("../config/db.config");

// import the crypto module to generate random id
const crypto = require("crypto");

// create order sevice
async function createOrderr(order) {
  // console.log(order);
  try {
    const hash_id = crypto.randomUUID();

    ////////////////////////////////////////////////////////////////
    // insert the orders data in to the orders table
    const query =
      "INSERT INTO orders (employee_id, customer_id, vehicle_id, order_date, active_order, order_hash) VALUES (?,?,?,CURRENT_TIMESTAMP,1,?)";

    const rows = await connection.query(query, [
      order.employee_id,
      order.customer_id,
      order.vehicle_id,
      hash_id,
    ]);

    // console.log(rows)

    if (rows.affectedRows !== 1) {
      return false;
    }

    // console.log(rows.insertId);

    const order_id = rows.insertId;

    ////////////////////////////////////////////////////////////
    // insert the orders data in to the orders info table
    const query2 =
      "INSERT INTO order_info (order_id, order_total_price, estimated_completion_date, additional_request, notes_for_internal_use, notes_for_customer, additional_requests_completed) VALUES (?,?,?,?,?,?,0)";

    const rows2 = await connection.query(query2, [
      order_id,
      order.order_total_price,
      order.estimated_completion_date,
      order.additional_request,
      order.notes_for_internal_use,
      order.notes_for_customer,
    ]);

    // console.log(rows2);

    if (rows2.affectedRows !== 1) {
      return false;
    }

    /////////////////////////////////////////////////////////////////
    // insert the order data in to the order service table
    const query3 =
      "INSERT INTO order_services (order_id, service_id, service_completed) VALUES (?, ?, ?)";

    let afeectedRows3 = 0;
    // for (let service of order.order_services) {
    //   const values = [order_id, service.service_id, 0];

    //   const rows3 = await connection.query(query3, values);
    //   afeectedRows3 = rows3.affectedRows + afeectedRows3;
    // }

    // console.log(order.order_services.length)
    for (let i = 0; i < order.order_services.length; i++) {
      const values = [order_id, order.order_services[i].service_id, 0];
      const rows3 = await connection.query(query3, values);

      // console.log(rows3)

      afeectedRows3 = rows3.affectedRows + afeectedRows3;
    }

    // console.log(afeectedRows3, "ppppppppppppp");

    if (afeectedRows3 < 1) {
      return false;
    }

    // let rows3 = [];

    // for (const service of orderServices) {
    //   const values = [orderId, service.service_id, 0];
    //   rows3.append(await conn.query(orderServicesQuery, values));
    // }

    // console.log(rows3);
    // console.log("to be continue in the order service");

    /////////////////////////////////////////////////////////////////
    // insert the order data in to the order status table

    const query4 =
      "INSERT INTO order_status (order_id, order_status) VALUES (?,?)";

    const row4 = await connection.query(query4, [order_id, 0]);

    if (row4.affectedRows !== 1) {
      return false;
    }

    // console.log(row4, "row4");

    return true;
  } catch (error) {
    console.log(error);
  }
}

async function getAllOrderss() {
  try {
    const query1 = `
    SELECT 

    orders.order_id,

    orders.order_date,

    orders.order_hash, 

    customer_info.customer_first_name, 

    customer_info.customer_last_name,

    customer_identifier.customer_email, 

    customer_identifier.customer_phone_number, 

    customer_vehicle_info.vehicle_make, 

    customer_vehicle_info.vehicle_year,

    customer_vehicle_info.vehicle_tag, 

    employee_info.employee_first_name, 

    employee_info.employee_last_name, 

    order_status.order_status 

    FROM orders 

    INNER JOIN customer_info ON orders.customer_id = customer_info.customer_id 

    INNER JOIN  customer_identifier ON orders.customer_id = customer_identifier.customer_id 

    INNER JOIN customer_vehicle_info ON orders.vehicle_id = customer_vehicle_info.vehicle_id 

    INNER JOIN employee_info ON orders.employee_id = employee_info.employee_id 

    INNER JOIN order_status ON orders.order_id = order_status.order_id 

    INNER JOIN order_info ON orders.order_id = order_info.order_id`;

    const rows = await connection.query(query1);

    // const rows2 = await connection.query(query2);

    // console.log(rows);

    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function getsingleOrderr(order) {
  // console.log(order)
  try {
    const query =
      "SELECT orders.order_id, orders.order_hash, customer_info.customer_first_name, customer_info.customer_last_name, customer_identifier.customer_email, customer_identifier.customer_phone_number, customer_vehicle_info.vehicle_make, employee_info.employee_first_name, employee_info.employee_last_name, order_status.order_status, order_info.additional_request, order_info.additional_requests_completed FROM orders INNER JOIN customer_info ON orders.customer_id = customer_info.customer_id INNER JOIN  customer_identifier ON orders.customer_id = customer_identifier.customer_id INNER JOIN customer_vehicle_info ON orders.vehicle_id = customer_vehicle_info.vehicle_id INNER JOIN employee_info ON orders.employee_id = employee_info.employee_id INNER JOIN order_status ON orders.order_id = order_status.order_id INNER JOIN order_info ON orders.order_id = order_info.order_id WHERE orders.order_hash = ?";

    const rows = await connection.query(query, [order]);

    // console.log(rows.length);

    if (rows.length < 1) {
      return;
    }

    const query2 =
      "SELECT orders.order_hash, order_services.service_id, common_services.service_name, common_services.service_description, order_services.service_completed FROM order_services INNER JOIN orders ON order_services.order_id = orders.order_id INNER JOIN common_services ON order_services.service_id = common_services.service_id WHERE orders.order_hash = ?";

    const rows2 = await connection.query(query2, [order]);

    // console.log(rows2);

    // console.log({ ...rows[0], order_services: rows2 });

    // const order = [{ ...rows[0], order_services: rows2 }]

    return [{ ...rows[0], order_services: rows2 }];
  } catch (error) {
    console.log(error);
  }
}

module.exports = { createOrderr, getAllOrderss, getsingleOrderr };
