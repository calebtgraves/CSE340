const utilities = require("../utilities/");
const baseController = {};

baseController.buildHome = async function (req, res) {
  const nav = await utilities.getNav();
  res.render("index", { title: "Home", nav });
};

baseController.internalServerError = async function (req, res, next) {
  //throw 500 error
  res.status(500);
  next();
};

module.exports = baseController;
