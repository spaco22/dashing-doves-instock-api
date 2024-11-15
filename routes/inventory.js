import express from "express";
import { editInventoryItem, getAllInventoryItems, getInventoryItemById, deleteInventoryById, postNewInventoryItem } from "../controllers/inventory-controller.js";

const inventoryRoute = express.Router();

inventoryRoute.get("/", getAllInventoryItems);

inventoryRoute.get("/:id", getInventoryItemById);

inventoryRoute.post("/", postNewInventoryItem);

inventoryRoute.put("/:id", editInventoryItem);

inventoryRoute.delete('/:id', deleteInventoryById);

export default inventoryRoute;

