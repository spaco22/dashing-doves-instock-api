import express from "express";
import inventoryRoute from "./routes/inventory.js";
import warehouseRoute from "./routes/warehouses.js";
import cors from "cors";

const app = express();
const { PORT = 5050, CORS_ORIGIN = "http://localhost:5173" } = process.env;

const corsOptions = {
  origin: CORS_ORIGIN,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/warehouses", warehouseRoute);
app.use("/inventories", inventoryRoute);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to the InStock Backend! 🕊️ </h1>");
});

app.listen(PORT, () => console.log(`App running on port ${PORT}`));