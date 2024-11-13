import express from "express";

const warehouseRoute = express.Router();

warehouseRoute.get("/", (req, res) => {
  res.send("This is the warehouse route!");
});

export default warehouseRoute;
