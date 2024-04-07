import axios from "../axiosConfig";

async function addOrder(formData, loggedInEmployeeToken) {
  console.log(formData);

  const headers = {
    "x-access-token": loggedInEmployeeToken,
  };

  const data = await axios.post("/api/order", formData, { headers });

  return data;
}

async function getAllOrder(loggedInEmployeeToken) {
  const headers = {
    "x-access-token": loggedInEmployeeToken,
  };

  const data = await axios.get("api/orders", { headers });

  // console.log(data)

  return data;
}

async function getSingleOrder(formData) {
  const data = await axios.get(`api/order/single/${formData}`);

  // console.log(data)

  return data;
}

async function updateOrder(formData, loggedInEmployeeToken) {
  console.log(formData);

  const headers = {
    "x-access-token": loggedInEmployeeToken,
  };

  const data = await axios.put("api/order/update", formData, { headers });

  console.log(data);

  // return data;
}

async function customerOrders(formData, loggedInEmployeeToken) {
  const headers = {
    "x-access-token": loggedInEmployeeToken,
  };

  const data = await axios.get(`api/order/customer/${formData}`, { headers });

  // console.log(data);

  return data;
}

const Order = {
  addOrder,
  getAllOrder,
  getSingleOrder,
  updateOrder,
  customerOrders,
};

export default Order;
