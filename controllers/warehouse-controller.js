import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const index = async (_req, res) => {
  try {
    const warehousesData = await knex("warehouses");
    res.status(200).json(warehousesData);
  } catch (error) {
    console.error(`Error retrieving Warehouses: ${error}`);
    res.status(400).json({ message: "Error retrieving Warehouses" });
  }
};

const findOne = async (req, res) => {
  try {
    const warehousesFound = await knex("warehouses").where({
      id: req.params.id,
    });

    if (warehousesFound.length === 0) {
      return res.status(404).json({
        message: `Warehouse with ID ${req.params.id} not found`,
        status: 404,
      });
    }
    const warehouseData = warehousesFound[0];
    res.status(200).json(warehouseData);
  } catch (error) {
    console.error("Error retrieving warehouse data", error);
    res.status(500).json({
      message: `Error retrieving warehouse data for warehouse with ID ${req.params.id}`,
      status: 500,
    });
  }
};

const add = async (req, res) => {
  if (
    !req.body.warehouse_name ||
    !req.body.address ||
    !req.body.city ||
    !req.body.country ||
    !req.body.contact_name ||
    !req.body.contact_position ||
    !req.body.contact_phone ||
    !req.body.contact_email
  ) {
    return res.status(400).json({
      message:
        "Please provide warehouse name, address, city, country, as well as contact name, position, phone number and email for create warehouse request",
      status: 400,
    });
  } else if (!req.body.contact_email.includes("@")) {
    return res.status(400).json({
      message: "Please provide a valid email address (ie. example@email.com)",
      error: "missing '@'",
      status: 400,
    });
  }

  function countDigits(string) {
    let count = 0;
    for (let i of string) {
      if (!isNaN(parseInt(i))) {
        count++;
      }
    }
    return count;
  }

  const areaCode = /^\+/;
  const firstSpace = /\+1\s/;
  const brackets = /\(\d{3}\)/;
  const hyphen = /\d{3}-\d{4}$/;
  const secondSpace = /\(\d{3}\)\s/;

  const phoneNumber = req.body.contact_phone;

  if (countDigits(phoneNumber) !== 11) {
    return res.status(400).json({
      message:
        "Please provide a valid phone number in the following format +1 (xxx) xxx-xxxx",
      error: "Phone number must contain 11 digits",
      status: 400,
    });
  } else if (!areaCode.test(phoneNumber)) {
    return res.status(400).json({
      message:
        "Please provide a valid phone number in the following format +1 (xxx) xxx-xxxx",
      error: "Phone number must contain +1",
      status: 400,
    });
  } else if (!firstSpace.test(phoneNumber)) {
    return res.status(400).json({
      message:
        "Please provide a valid phone number in the following format +1 (xxx) xxx-xxxx",
      error:
        "Phone number must contain a space between +1 and the phone number",
      status: 400,
    });
  } else if (!brackets.test(phoneNumber)) {
    return res.status(400).json({
      message:
        "Please provide a valid phone number in the following format +1 (xxx) xxx-xxxx",
      error: "Phone number must contain the are code in brackets",
      status: 400,
    });
  } else if (!hyphen.test(phoneNumber)) {
    return res.status(400).json({
      message:
        "Please provide a valid phone number in the following format +1 (xxx) xxx-xxxx",
      error:
        "Phone number must contain a hyphen between the first three and last four digits",
      status: 400,
    });
  } else if (!secondSpace.test(phoneNumber)) {
    return res.status(400).json({
      message:
        "Please provide a valid phone number in the following format +1 (xxx) xxx-xxxx",
      error: "Phone number must contain a space after the brackets",
      status: 400,
    });
  }

  try {
    const warehousesData = await knex("warehouses").insert(req.body);
    const newWarehouseId = warehousesData[0];
    const newWarehouse = await knex("warehouses")
      .where({ id: newWarehouseId })
      .first();

    res.status(201).json({
      message: "Warehouse succesfully created",
      newWarehouse,
    });
  } catch (error) {
    console.error("Error creating new warehouse", error);
    res.status(500).json({
      message: "Error creating new warehouse",
      status: 500,
    });
  }
};

const del = async (req, res) => {
  try {
    const selectedWarehouse = await knex("warehouses")
      .where({ id: req.params.id })
      .delete();

    if (selectedWarehouse === 0) {
      return res
        .status(404)
        .json({ message: `Warehouse with ID ${req.params.id} not found`,
        status: 404 });
    }
    res.status(204).json({message: `Warehouse with ID ${req.params.id} successfully deleted`});
    console.log(`Warehouse with ID ${req.params.id} succesfully deleted`);
  } catch (error) {
    console.error("Error deleting warehouse", error);
    res.status(500).json({
      message: `Error deleting warehouse`,
      status: 500
    });
  }
};

export { index, findOne, add, del };
