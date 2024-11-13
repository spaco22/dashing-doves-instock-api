import express from "express";
import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const warehouseRoute = express.Router();

warehouseRoute.get("/", (req, res) => {
  res.send("This is the warehouse route!");
});


// NOTE: USED .ROUTE TO CHAIN OTHER REQUESTS :)
warehouseRoute.route("/:id").get(async (req, res) => {
  try {
    const warehouseData = await knex("warehouses")
      .where({ id: req.params.id })
      .first();

    if (warehouseData.length === 0) {
      console.log(`Error finding warehouse id ${req.params.id}`);
      return res.status(404).json({
        message: `Warehouse with ID ${req.params.id} not found`,
        status: 404,
      });
    }

    res.status(200).json(warehouseData);
  } catch (error) {
    console.error("Error retrieving warehouse data", error);
    res.status(500).json({
      message: "Error retrieving warehouse data",
      status: 500,
    });
  }
});

export default warehouseRoute;
