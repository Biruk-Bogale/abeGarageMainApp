import axios from "../axiosConfig";

// A function to send post request to add a new vehicle
async function addVehicle(formData, loggedInEmployeeToken) {
  const headers = {
    "x-access-token": loggedInEmployeeToken,
  };

  const data = await axios.post("/api/vehicle", formData, { headers });

  return data;
}

// A function to get the customer vehicle
async function getCustomerVehicle(formData, loggedInEmployeeToken) {
  const headers = {
    "x-access-token": loggedInEmployeeToken,
  };

  const data = await axios.get(`/api/vehicle/customer?query=${formData}`, {
    headers,
  });

  return data;
}

async function getSingleVehicle(
  customer_hash,
  vehicle_id,
  loggedInEmployeeToken
) {
  const headers = {
    "x-access-token": loggedInEmployeeToken,
  };

  const data = await axios.get(
    `/api/vehicle/single/${customer_hash}/${vehicle_id}`,
    { headers }
  );

  return data;
}

const vehicleService = {
  addVehicle,
  getCustomerVehicle,
  getSingleVehicle,
};

export default vehicleService;
