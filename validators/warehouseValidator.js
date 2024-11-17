const countDigits = (string) => {
  let count = 0;
  for (let i of string) {
    if (!isNaN(parseInt(i))) {
      count++;
    }
  }
  return count;
};

const validatePhoneNumber = (phoneNumber) => {
  const areaCode = /^\+/;
  const firstSpace = /\+1\s/;
  const brackets = /\(\d{3}\)/;
  const hyphen = /\d{3}-\d{4}$/;
  const secondSpace = /\(\d{3}\)\s/;

  if (countDigits(phoneNumber) !== 11) {
    return {
      valid: false,
      message: "Phone number must contain 11 digits"
    };
  } else if (!areaCode.test(phoneNumber)) {
    return {
      valid: false,
      message: "Phone number must contain +1",
    };
  } else if (!firstSpace.test(phoneNumber)) {
    return {
      valid: false,
      message: "Phone number must contain a space between +1 and the phone number",
    };
  } else if (!brackets.test(phoneNumber)) {
    return {
      valid: false,
      message: "Phone number must contain the area code in brackets",
    };
  } else if (!hyphen.test(phoneNumber)) {
    return {
      valid: false,
      message: "Phone number must contain a hyphen between the first three and last four digits",
    };
  } else if (!secondSpace.test(phoneNumber)) {
    return {
      valid: false,
      message: "Phone number must contain a space after the brackets",
    };
  }

  return { valid: true };
};

const warehouseValidator= (warehouse) => {
  const { warehouse_name, address, city, country, contact_name, contact_position, contact_phone, contact_email } = warehouse;

  if (!warehouse_name || !address || !city || !country || !contact_name || !contact_position || !contact_phone || !contact_email) {
    return { valid: false, message: "Please provide all the required fields (warehouse name, address, city, country, contact name, position, phone, and email)" };
  }

  if (!contact_email.includes("@")) {
    return { valid: false, message: "Please provide a valid email address (example@example.com). Missing '@'"};
  }

  const phoneValidation = validatePhoneNumber(contact_phone);
  if (!phoneValidation.valid) {
    return { valid: false, message: phoneValidation.message };
  }

  return { valid: true };
};

export default warehouseValidator;
