import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import warehouseValidator from "../validators/warehouseValidator.js";

const index = async (_req, res) => {
  try {
    const warehousesData = await knex("warehouses");
    res.status(200).json(warehousesData);
  } catch (error) {
    console.error(`Error retrieving Warehouses data: ${error}`);
    res.status(400).json({ message: "Error retrieving Warehouses data" });
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
    console.error(
      `Error retrieving data for warehouse with ID ${req.params.id}`,
      error
    );
    res.status(500).json({
      message: `Error retrieving data for warehouse with ID ${req.params.id}`,
      status: 500,
    });
  }
};

const edit = async (req, res) => {
  const validation = warehouseValidator(req.body);
  if (!validation.valid) {
    return res.status(400).json({
      message: validation.message,
      status: 400,
    });
  }

  try {
    const warehouseDataById = await knex("warehouses")
      .where({
        id: req.params.id,
      })
      .update(req.body);

    if (warehouseDataById === 0) {
      return res.status(404).json({
        message: `Warehouse with ID ${req.params.id} not found`,
        status: 404,
      });
    }

    const updatedWarehouse = await knex("warehouses").where({
      id: req.params.id,
    });

    res.json(updatedWarehouse[0]);
  } catch (error) {
    console.error(
      `Error retrieving data for warehouse with ID ${req.params.id}`,
      error
    );
    res.status(500).json({
      message: `Error retrieving data for warehouse with ID ${req.params.id}`,
      status: 500,
    });
  }
};

const add = async (req, res) => {
  const validation = warehouseValidator(req.body);
  if (!validation.valid) {
    return res.status(400).json({
      message: validation.message,
      status: 400,
    });
  }

  try {
    const warehousesData = await knex("warehouses").insert(req.body);
    const newWarehouseId = warehousesData[0];
    const newWarehouse = await knex("warehouses")
      .where({ id: newWarehouseId })
      .first();

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

const del = async (req, res) => {
  try {
    const selectedWarehouse = await knex("warehouses")
      .where({ id: req.params.id })
      .delete();

    if (selectedWarehouse === 0) {
      return res
        .status(404)
        .json({
          message: `Warehouse with ID ${req.params.id} not found`,
          status: 404,
        });
    }
    res
      .status(204)
      .json({
        message: `Warehouse with ID ${req.params.id} successfully deleted`,
      });
  } catch (error) {
    console.error("Error deleting warehouse", error);
    res.status(500).json({
      message: `Error deleting warehouse`,
      status: 500,
    });
  }
};

export { index, findOne, add, edit, del };
