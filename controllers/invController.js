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
  const classificationSelect = await utilities.buildClassificationList();
  res.render("./inventory/management", {
    title: "Inventory Management",
    nav,
    classificationSelect,
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

/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id);
  const invData = await invModel.getInventoryByClassificationId(
    classification_id
  );
  if (invData[0].inv_id) {
    return res.json(invData);
  } else {
    next(new Error("No data returned"));
  }
};

/* ***************************
 *  Build edit inventory view
 * ************************** */
invCont.editInventoryView = async function (req, res, next) {
  const inv_id = parseInt(req.params.inv_id);
  let nav = await utilities.getNav();
  const [itemData] = await invModel.getInventoryById(inv_id);
  const classificationSelect = await utilities.buildClassificationList(
    itemData.classification_id
  );
  const itemName = `${itemData.inv_make} ${itemData.inv_model}`;
  res.render("./inventory/edit-inventory", {
    title: "Edit " + itemName,
    nav,
    classification_list: classificationSelect,
    errors: null,
    inv_id: itemData.inv_id,
    inv_make: itemData.inv_make,
    inv_model: itemData.inv_model,
    inv_year: itemData.inv_year,
    inv_description: itemData.inv_description,
    inv_image: itemData.inv_image,
    inv_thumbnail: itemData.inv_thumbnail,
    inv_price: itemData.inv_price,
    inv_miles: itemData.inv_miles,
    inv_color: itemData.inv_color,
    classification_id: itemData.classification_id,
  });
};

/* ***************************
 *  Update Inventory Data
 * ************************** */
invCont.updateInventory = async function (req, res, next) {
  let nav = await utilities.getNav();
  const {
    inv_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id,
  } = req.body;
  const updateResult = await invModel.updateInventory(
    inv_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id
  );

  if (updateResult) {
    const itemName = updateResult.inv_make + " " + updateResult.inv_model;
    req.flash("notice", `The ${itemName} was successfully updated.`);
    res.redirect("/inv/");
  } else {
    const classificationSelect = await utilities.buildClassificationList(
      classification_id
    );
    const itemName = `${inv_make} ${inv_model}`;
    req.flash("notice", "Sorry, the insert failed.");
    res.status(501).render("inventory/edit-inventory", {
      title: "Edit " + itemName,
      nav,
      classification_list: classificationSelect,
      errors: null,
      inv_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id,
    });
  }
};

/* ***************************
 * Delete Confirmation
 * ************************** */
invCont.buildDeleteConfirmation = async function (req, res, next) {
  const inv_id = parseInt(req.params.inv_id);
  const [itemData] = await invModel.getInventoryById(inv_id);
  let nav = await utilities.getNav();
  res.render("./inventory/delete-confirm", {
    title: "Delete " + itemData.inv_make + " " + itemData.inv_model,
    nav,
    inv_id: itemData.inv_id,
    inv_make: itemData.inv_make,
    inv_model: itemData.inv_model,
    inv_year: itemData.inv_year,
    inv_price: itemData.inv_price,
  });
};

/* ***************************
 * Delete Inventory Item
 * ************************** */
invCont.deleteInventory = async function (req, res, next) {
  const inv_id = parseInt(req.params.inv_id);
  const deleteResult = await invModel.deleteInventory(inv_id);
  if (deleteResult) {
    req.flash("notice", "The item was successfully deleted.");
    res.redirect("/inv/");
  } else {
    req.flash("notice", "Sorry, the delete failed.");
    res.redirect("/inv/delete/" + inv_id);
  }
};

module.exports = invCont;
