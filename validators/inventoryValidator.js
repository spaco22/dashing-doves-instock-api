const inventoryValidator = (inventory) => {
  const { warehouse_id, item_name, description, category, status, quantity } =
    inventory;

  if (
    !warehouse_id ||
    !item_name ||
    !description ||
    !category ||
    !status ||
    quantity === undefined
  ) {
    return { valid: false, message: "All fields are required." };
  }

  if (typeof quantity !== "number" || isNaN(quantity) || quantity < 0) {
    return {
      valid: false,
      message: "Quantity must be a number and greater than or equal to 0.",
    };
  }

  return { valid: true };
};

export default inventoryValidator;
