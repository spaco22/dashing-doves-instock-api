import express from "express";

const warehouseRoute = express.Router();

warehouseRoute.get("/", (req, res) => {
  res.send("This is the warehouse route!");
});

warehouseRoute.get("/:id", (req, res) => {
  res.send("This is the GET warehouse by id route!");
});

export default warehouseRoute;
