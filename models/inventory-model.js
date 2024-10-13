const pool = require("../database/");

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications() {
  return await pool.query(
    "SELECT * FROM public.classification ORDER BY classification_name"
  );
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    );
    return data.rows;
  } catch (error) {
    console.error("getclassificationsbyid error " + error);
  }
}

/* ***************************
 *  Get inventory detail by inv_id
 * ************************** */
async function getInventoryDetail(inv_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
        JOIN public.classification AS c 
        ON i.classification_id = c.classification_id 
        WHERE i.inv_id = $1`,
      [inv_id]
    );
    return data.rows;
  } catch (error) {
    console.error("getInventoryDetail error " + error);
  }
}

/* ***************************
 * Create a new classification
 * ************************** */
async function createClassification(classification_name) {
  try {
    const result = await pool.query(
      `INSERT INTO classification (classification_name) VALUES ($1) RETURNING *`,
      [classification_name]
    );
    return result;
  } catch (error) {
    console.error("createClassification error " + error);
  }
}

/* ***************************
 * Create a new inventory item
 * ************************** */
async function createInventory(
  inv_make,
  inv_model,
  inv_year,
  inv_color,
  inv_price,
  inv_description,
  inv_miles,
  classification_id,
  inv_image = "/images/vehicles/no-image.png",
  inv_thumbnail = "/images/vehicles/no-image-tn.png"
) {
  try {
    const result = await pool.query(
      `INSERT INTO inventory (inv_make, inv_model, inv_year, inv_color, inv_price, inv_description, inv_image, inv_thumbnail, inv_miles, classification_id) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [
        inv_make,
        inv_model,
        inv_year,
        inv_color,
        inv_price,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_miles,
        classification_id,
      ]
    );
    return result;
  } catch (error) {
    console.error("createInventory error " + error);
  }
}

/* ***************************
 *  Export model functions
 * ************************** */
module.exports = {
  getClassifications,
  getInventoryByClassificationId,
  getInventoryDetail,
  createClassification,
  createInventory,
};
