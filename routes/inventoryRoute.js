// Needed Resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const invValidate = require("../utilities/inventory-validation");
const utilities = require("../utilities");

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build inventory detail view
router.get("/detail/:invId", invController.buildDetail);

// Route to build inventory management view
router.get("/", invController.buildManagement);

// Route to build classifcation creation view
router.get("/add-classification", invController.buildAddClassification);

// Route to build inventory creation view
router.get("/add-inventory", invController.buildAddInventory);

// Route to create a new inventory item
router.post(
  "/add-inventory",
  invValidate.newInventoryRules(),
  invValidate.checkInventory,
  invController.createInventory
);

// Route to create a new classification
router.post(
  "/add-classification",
  invValidate.newClassificationRules(),
  invValidate.checkClassification,
  invController.createClassification
);

router.get(
  "/getInventory/:classification_id",
  utilities.handleErrors(invController.getInventoryJSON)
);

// Route to build inventory edit view
router.get(
  "/edit/:inv_id",
  utilities.handleErrors(invController.editInventoryView)
);

// Route to update inventory item
router.post(
  "/update",
  invValidate.updateInventoryRules(),
  invValidate.checkUpdateData,
  utilities.handleErrors(invController.updateInventory)
);

module.exports = router;
