import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

// Get all inventory items with warehouse name
export const getAllInventoryItems = async (req, res) => {
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
};

// Get a single inventory item by ID with warehouse name
export const getInventoryItemById = async (req, res) => {
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
};

// POST/CREATE a New Inventory Item
export const postNewInventoryItem = async (req, res) => {
    const { warehouse_id, item_name, description, category, status, quantity } =
      req.body;
  
    console.log("req.body", req.body);
  
    if (
      !warehouse_id ||
      !item_name ||
      !description ||
      !category ||
      !status ||
      quantity === undefined
    ) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }
  
    if (typeof quantity !== "number") {
      return res.status(400).json({
        message: "Quantity must be a number.",
      });
    }
  
    try {
      const warehouseExists = await knex("warehouses")
        .where("id", warehouse_id)
        .first();
      if (!warehouseExists) {
        return res.status(400).json({
          message: "The provided warehouse_id does not exist.",
        });
      }
  
      const [newInventoryItem] = await knex("inventories")
        .insert({
          warehouse_id,
          item_name,
          description,
          category,
          status,
          quantity,
        })
        .returning([
          "id",
          "warehouse_id",
          "item_name",
          "description",
          "category",
          "status",
          "quantity",
        ]);
  
      res.status(201).json({
        message: "Successfully posted a new item in the inventory.",
        item: newInventoryItem,
      });
    } catch (error) {
      console.error("Error creating new inventory item:", error);
      res.status(500).json({
        message: "Error occurred while creating a new inventory item.",
        error: error.message,
      });
    }
  };
  
