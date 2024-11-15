import express from "express";
import { editInventoryItem, getAllInventoryItems, getInventoryItemById, postNewInventoryItem } from "../controllers/inventory-controller.js";

const inventoryRoute = express.Router();

// GET /inventories - Get all inventory items with the warehouse name for each inventory item
inventoryRoute.get("/", getAllInventoryItems);

// GET /inventories/:id - Get a single inventory item by ID with the warehouse name
inventoryRoute.get("/:id", getInventoryItemById);

// POST /inventories - Create a new inventory item
inventoryRoute.post("/", postNewInventoryItem);

//PUT /inventories/:id 
inventoryRoute.put("/:id", editInventoryItem);

export default inventoryRoute;
