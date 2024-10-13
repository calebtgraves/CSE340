const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const invCont = {};

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId;
  const data = await invModel.getInventoryByClassificationId(classification_id);
  const grid = await utilities.buildClassificationGrid(data);
  let nav = await utilities.getNav();
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", data);
  const className = data[0]?.classification_name;
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  });
};

/* ***************************
 *  Build inventory detail view
 * ************************** */
invCont.buildDetail = async function (req, res, next) {
  const inv_id = req.params.invId;
  const [data] = await invModel.getInventoryDetail(inv_id);
  console.log(data);
  const detail = await utilities.buildDetailView(data);
  let nav = await utilities.getNav();
  res.render("./inventory/detail", {
    title: data.inv_make + " " + data.inv_model,
    nav,
    detail,
  });
};

/* ***************************
 *  Build inventory management view
 * ************************** */
invCont.buildManagement = async function (req, res, next) {
  let nav = await utilities.getNav();
  res.render("./inventory/management", {
    title: "Inventory Management",
    nav,
  });
};

/* ***************************
 *  Build classification creation view
 * ************************** */
invCont.buildAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav();
  res.render("./inventory/add-classification", {
    title: "Add Classification",
    nav,
  });
};

/* ***************************
 *  Create a new classification
 * ************************** */
invCont.createClassification = async function (req, res, next) {
  const { classification_name } = req.body;
  const newClassification = await invModel.createClassification(
    classification_name
  );
  const nav = await utilities.getNav();
  if (newClassification) {
    req.flash("notice", "Classification created successfully.");
    res.status(201).render("./inventory/management", {
      title: "Add Classification",
      nav,
    });
  } else {
    req.flash("notice", "Sorry, adding the classification failed.");
    res.status(501).render("./inventory/add-classification", {
      title: "Add Classification",
      nav,
    });
  }
};

/* ***************************
 *  Build inventory creation view
 * ************************** */
invCont.buildAddInventory = async function (req, res, next) {
  let classification_list = await utilities.buildClassificationList();
  let nav = await utilities.getNav();
  res.render("./inventory/add-inventory", {
    title: "Add Inventory",
    nav,
    classification_list,
  });
};

/* ***************************
 *  Create a new inventory item
 * ************************** */
invCont.createInventory = async function (req, res, next) {
  const {
    inv_make,
    inv_model,
    inv_year,
    inv_color,
    inv_price,
    inv_description,
    inv_miles,
    classification_id,
  } = req.body;
  console.log(
    ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",
    req.body
  );
  const newVehicle = await invModel.createInventory(
    inv_make,
    inv_model,
    inv_year,
    inv_color,
    inv_price,
    inv_description,
    inv_miles,
    classification_id
  );
  const nav = await utilities.getNav();
  const classification_list = await utilities.buildClassificationList();
  if (newVehicle) {
    req.flash("notice", "Inventory item added successfully.");
    res.status(201).render("./inventory/management", {
      title: "Management",
      nav,
    });
  } else {
    req.flash("notice", "Sorry, adding the inventory item failed.");
    res.status(501).render("./inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      classification_list,
    });
  }
};

module.exports = invCont;
