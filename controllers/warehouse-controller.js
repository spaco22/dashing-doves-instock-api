import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const index = async (_req, res) => {
  try {
    const data = await knex("warehouses");
    res.status(200).json(data);
  } catch (error) {
    console.error(`Error retrieving Warehouses: ${error}`);
    res.status(400).json({ message: "Error retrieving Warehouses" });
  }
};

const findOne = async (req, res) => {
  try {
    const warehousesFound = await knex("warehouses")
      .where({ id: req.params.id });

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

export { index, findOne };
