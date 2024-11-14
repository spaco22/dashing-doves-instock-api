import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const index = async (_req, res) => {
  try {
    const warehousesData = await knex("warehouses");
    res.status(200).json(warehousesData);
  } catch (error) {
    console.error(`Error retrieving Warehouses: ${error}`);
    res.status(400).json({ message: "Error retrieving Warehouses" });
  }
};

const findOne = async (req, res) => {
  try {
    const warehousesFound = await knex("warehouses").where({
      id: req.params.id,
    });

    if (warehousesFound.length === 0) {
      return res.status(404).json({
        message: `Warehouse with ID ${req.params.id} not found`,
        status: 404,
      });
    }
    const warehouseData = warehousesFound[0];
    res.status(200).json(warehouseData);
  } catch (error) {
    console.error("Error retrieving warehouse data", error);
    res.status(500).json({
      message: `Error retrieving warehouse data for warehouse with ID ${req.params.id}`,
      status: 500,
    });
  }
};

const add = async (req, res) => {

  if (!req.body.warehouse_name || !req.body.address || !req.body.city || !req.body.country  || !req.body.contact_name || !req.body.contact_position || !req.body.contact_phone || !req.body.contact_email ) {
    return res.status(400).json({
      message: "Please provide warehouse name, address, city, country, as well as contact name, position, phone number and email for create warehouse request",
      status: 400
    });
  }

  try {
    const warehousesData = await knex("warehouses").insert(req.body);
    const newWarehouseId = warehousesData[0];
    const newWarehouse = await knex("warehouses").where({ id: newWarehouseId }).first();

    res.status(201).json({
      message: "Warehouse succesfully created",
      newWarehouse,
    });
  } catch (error) {
    console.error("Error creating new warehouse", error);
    res.status(500).json({
      message: "Error creating new warehouse",
      status: 500,
    });
  }
};

export { index, findOne, add };
