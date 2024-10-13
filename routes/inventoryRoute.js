// Needed Resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const invValidate = require("../utilities/inventory-validation");

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build inventory detail view
router.get("/detail/:invId", invController.buildDetail);

// Route to build inventory management view
router.get("/management", invController.buildManagement);

// Route to build classifcation creation view
router.get(
  "/management/add-classification",
  invController.buildAddClassification
);

// Route to build inventory creation view
router.get("/management/add-inventory", invController.buildAddInventory);

// Route to create a new inventory item
router.post(
  "/management/add-inventory",
  invValidate.newInventoryRules(),
  invValidate.checkInventory,
  invController.createInventory
);

// Route to create a new classification
router.post(
  "/management/add-classification",
  invValidate.newClassificationRules(),
  invValidate.checkClassification,
  invController.createClassification
);

module.exports = router;
