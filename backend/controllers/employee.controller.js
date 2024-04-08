// import the employee service
const {
  checkIfEmployeeExists,
  createEmploye,
  getAllEmployees,
  updateEmploye,
  deleteEmploye,
  getSingleEmploye,
} = require("../services/employee.service");

// create Employee controller
async function createEmployee(req, res, next) {
  const { employee_email } = req.body;

  const employeeExists = await checkIfEmployeeExists(employee_email);

  // if employee exists, send a response to a client
  if (employeeExists) {
    return res.status(400).json({
      msg: "This email address is already associated with  another employee!",
    });
  } else {
    try {
      const employeeData = req.body;

      // create the employee
      const employee = await createEmploye(employeeData);

      if (!employee) {
        return res.status(400).json({
          error: "Failed to add the employee!",
        });
      } else {
        return res.status(200).json({
          status: "Employee added successfully! ",
        });
      }
    } catch (error) {
      return res.status(400).json({
        error: "Something went wrong!",
      });
    }
  }
}

// get all Employee data controller
async function getAllEmployeees(req, res, next) {
  try {
    // call the getAllEmployees methosd from the emplyees service
    const employees = await getAllEmployees();

    if (!employees) {
      res.status(400).json({
        error: "Failed to get all employees!",
      });
    } else {
      res.status(200).json({
        status: "Employees retrieved successfully! ",
        employees: employees,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
}

// get single employee data controller
async function getSingleEmployee(req, res, next) {
  const employee_hash = req.params.hash;
  try {
    const singleEmployee = await getSingleEmploye(employee_hash);

    if (!singleEmployee) {
      res.status(400).json({
        error: "Failed to get employee!",
      });
    } else {
      res.status(200).json({
        status: "Employee retrieved successfully! ",
        singleEmployee: singleEmployee,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
}

// update Employee controller
async function updateEmployee(req, res, next) {
  try {
    const updateEmployee = await updateEmploye(req.body);

    // the returned rows value
    const rows1 = updateEmployee.rows1.affectedRows;
    const rows2 = updateEmployee.rows2.affectedRows;
    const rows3 = updateEmployee.rows3.affectedRows;

    if (!updateEmployee) {
      res.status(400).json({
        error: "Failed to Update Employee",
      });
    } else if (rows1 === 1 && rows2 === 1 && rows3 === 1) {
      res.status(200).json({
        status: "Employee Succesfully Updated! ",
      });
    } else {
      res.status(400).json({
        status: "Update Incomplete!",
      });
    }
  } catch (error) {
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
}

// delete Employee controller
async function deleteEmployee(req, res, next) {
  const { employee_id } = req.body;
  try {
    const deleteEmployee = await deleteEmploye(employee_id);

    if (!deleteEmployee) {
      res.status(200).json({
        error: "Delete Incomplete!",
      });
    } else {
      res.status(400).json({
        status: "Employee Succesfully Delete!",
      });
    }
  } catch (error) {
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
}

module.exports = {
  createEmployee,
  getAllEmployeees,
  updateEmployee,
  deleteEmployee,
  getSingleEmployee,
};
