import express from "express";
import warehouseRoute from "./routes/warehouses.js";
import inventoryRoute from "./routes/inventory.js";
import initKnex from "knex";
import configuration from "./knexfile.js";
import cors from "cors";
const knex = initKnex(configuration);

const app = express();
const { BACKEND_URL, CORS_ORIGIN } = process.env;
const PORT = process.env.PORT || 8000;

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

app.use("/warehouses", warehouseRoute);
app.use("/inventories", inventoryRoute);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to the InStock Backend! 🕊️ </h1>");
});

app.listen(PORT, () => console.log(`app running on port ${PORT}`));
