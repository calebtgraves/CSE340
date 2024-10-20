// Needed Resources
const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");
const accValidate = require("../utilities/account-validation");
const utilities = require("../utilities");

// Route to build account login view
router.get("/login", accountController.buildLogin);

// Route to build account register view
router.get("/register", accountController.buildRegister);

// Route to register a new account
// Process the registration data
router.post(
  "/register",
  accValidate.registationRules(),
  accValidate.checkRegData,
  accountController.registerAccount
);

// Process the login attempt
router.post(
  "/login",
  accValidate.loginRules(),
  accValidate.checkLoginData,
  accountController.accountLogin
);

// Base account route
router.get("/", utilities.checkLogin, accountController.buildAccount);

// Route to logout
router.get("/logout", accountController.accountLogout);

//update account page
router.get(
  "/update/:id",
  utilities.checkLogin,
  accountController.buildUpdateAccountView
);

//update account
router.post(
  "/update",
  accValidate.updateRules(),
  accValidate.checkUpdateData,
  utilities.checkLogin,
  accountController.updateAccountInfo
);

//update password
router.post(
  "/update-password",
  accValidate.updatePasswordRules(),
  accValidate.checkUpdatePasswordData,
  utilities.checkLogin,
  accountController.updatePassword
);

module.exports = router;
