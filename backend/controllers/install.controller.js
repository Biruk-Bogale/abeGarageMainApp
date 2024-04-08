// import the install service to handle communication with the database
const insatllService = require("../services/install.service");

// create a function to handle the install request
async function install(req, res, next) {
try {
  // Call the install service to create the database tables
  const installMessage = await insatllService.install();

  // console.log(installMessage.status)

  // Check if the install was successful or not and send the appropriate response to the client
  if (installMessage.status === 200) {
    // If successful, send a response to the client
    res.status(200).json({
      message: installMessage,
    });
  } else {
    // If unsuccessful, send a response to the client
    res.status(500).json({
      message: installMessage,
    });
  }
} catch (error) {
    return res.status(400).json({
      error: "Something went wrong!",
      error1:error
    });
}
}

// install()
// Export the install function
module.exports = { install };
