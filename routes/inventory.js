import express from "express";
import initKnex from "knex"; 
import configuration from "../knexfile.js";
const knex = initKnex(configuration); 


const inventoryRoute = express.Router();

// GET /inventories - Get all inventory items with the warehouse name for each inventory item
inventoryRoute.get("/", async (req, res) => {
  try {
    const inventoryItems = await knex("inventories")
      .join("warehouses", "inventories.warehouse_id", "=", "warehouses.id")
      .select(
        "inventories.id",
        "warehouses.warehouse_name",  
        "inventories.item_name",
        "inventories.description",
        "inventories.category",
        "inventories.status",
        "inventories.quantity"
      );

    res.json(inventoryItems);
  } catch (err) {
    console.error("Error fetching inventory items:", err);
    res.status(500).json({
      message: "Error occurred",
      error: err,
      status: 500,
    });
  }
});

// GET /inventories/:id - Get a single inventory item by ID with the warehouse name
inventoryRoute.get("/:id", async (req, res) => {
  try {
    const inventoryItem = await knex("inventories")
      .join("warehouses", "inventories.warehouse_id", "=", "warehouses.id")
      .where("inventories.id", req.params.id)
      .select(
        "inventories.id",
        "warehouses.warehouse_name", 
        "inventories.item_name",
        "inventories.description",
        "inventories.category",
        "inventories.status",
        "inventories.quantity"
      )
      .first(); 

    if (inventoryItem) {
      res.json(inventoryItem);
    } else {
      res.status(404).json({
        message: "Inventory item not found",
      });
    }
  } catch (err) {
    console.error("Error fetching inventory item by ID:", err);
    res.status(500).json({
      message: "Error occurred",
      error: err,
      status: 500,
    });
  }
});

export default inventoryRoute;

