const utilities = require("../utilities/");
const baseController = {};

baseController.buildHome = async function (req, res) {
  const nav = await utilities.getNav();
  res.render("index", { title: "Home", nav });
};

baseController.internalServerError = async function (req, res, next) {
  const nav = await utilities.getNav();
  //throw 500 error
  next(new Error("Internal Server Error"));
};

module.exports = baseController;
