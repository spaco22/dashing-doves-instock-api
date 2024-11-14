import express from "express";

const inventoryRoute = express.Router();

inventoryRoute.get("/", (req, res) => {
  res.send("This is the inventories route!");
});

export default inventoryRoute;


