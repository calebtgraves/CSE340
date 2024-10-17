const utilities = require(".");
const { body, validationResult } = require("express-validator");
const accountModel = require("../models/account-model");
const validate = {};

/*  **********************************
 * New Classification Validation Rules
 * ********************************* */

validate.newClassificationRules = () => {
  return [
    body("classification_name")
      .trim()
      .escape()
      .notEmpty()
      .isAlphanumeric()
      .withMessage(
        "Classification name must not contain spaces or special characters."
      ),
  ];
};

/* ******************************
 * Check data and return errors or continue to classification creation
 * ***************************** */
validate.checkClassification = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    res.render("./inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: errors.array(),
    });
  }
  next();
};

/*  **********************************
 * New Inventory Validation Rules
 * ********************************* */
validate.newInventoryRules = () => {
  return [
    body("inv_make")
      .trim()
      .escape()
      .notEmpty()
      .isAlphanumeric()
      .withMessage("Make is required and must be alphanumeric."),
    body("inv_model")
      .trim()
      .escape()
      .notEmpty()
      .isAlphanumeric()
      .withMessage("Model is required and must be alphanumeric."),
    body("inv_year")
      .trim()
      .escape()
      .notEmpty()
      .isInt()
      .withMessage("Year is required and must be a number."),
    body("inv_price")
      .trim()
      .escape()
      .notEmpty()
      .isInt()
      .withMessage("Price is required and must be a number."),
    body("classification_id")
      .trim()
      .escape()
      .notEmpty()
      .isInt()
      .withMessage("Classification is required and must be a number."),
    body("inv_color")
      .trim()
      .escape()
      .notEmpty()
      .isAlphanumeric()
      .withMessage("Color is required and must be alphanumeric."),
    body("inv_miles")
      .trim()
      .escape()
      .notEmpty()
      .isInt()
      .withMessage("Miles is required and must be a number."),
    body("inv_description")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Description is required and must be text."),
  ];
};

/* ******************************
 * Check data and return errors or continue to inventory creation
 * ***************************** */
validate.checkInventory = async (req, res, next) => {
  const errors = validationResult(req);
  const classification_list = await utilities.buildClassificationList();
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    res.render("./inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      classification_list,
      errors: errors.array(),
    });
  }
  next();
};

validate.updateInventoryRules = () => {
  return [
    body("inv_make")
      .trim()
      .escape()
      .notEmpty()
      .isAlphanumeric()
      .withMessage("Make is required and must be alphanumeric."),
    body("inv_model")
      .trim()
      .escape()
      .notEmpty()
      .isAlphanumeric()
      .withMessage("Model is required and must be alphanumeric."),
    body("inv_year")
      .trim()
      .escape()
      .notEmpty()
      .isInt()
      .withMessage("Year is required and must be a number."),
    body("inv_price")
      .trim()
      .escape()
      .notEmpty()
      .isInt()
      .withMessage("Price is required and must be a number."),
    body("classification_id")
      .trim()
      .escape()
      .notEmpty()
      .isInt()
      .withMessage("Classification is required and must be a number."),
    body("inv_color")
      .trim()
      .escape()
      .notEmpty()
      .isAlphanumeric()
      .withMessage("Color is required and must be alphanumeric."),
    body("inv_miles")
      .trim()
      .escape()
      .notEmpty()
      .isInt()
      .withMessage("Miles is required and must be a number."),
    body("inv_description")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Description is required and must be text."),
    body("inv_id")
      .trim()
      .escape()
      .notEmpty()
      .isInt()
      .withMessage("Inventory ID is required and must be a number."),
  ];
};

validate.checkUpdateData = async (req, res, next) => {
  const errors = validationResult(req);
  const classification_list = await utilities.buildClassificationList();
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    res.render("./inventory/update-inventory", {
      title: "Update Inventory",
      nav,
      classification_list,
      errors: errors.array(),
    });
  }
  next();
};

module.exports = validate;
