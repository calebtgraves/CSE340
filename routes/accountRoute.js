// Needed Resources
const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");
const regValidate = require("../utilities/account-validation");

// Route to build account login view
router.get("/login", accountController.buildLogin);

// Route to build account register view
router.get("/register", accountController.buildRegister);

// Route to register a new account
// Process the registration data
router.post(
  "/register",
  regValidate.registationRules(),
  regValidate.checkRegData,
  accountController.registerAccount
);

module.exports = router;
