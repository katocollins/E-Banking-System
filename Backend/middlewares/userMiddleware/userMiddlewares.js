const User = require("../../models/userModel");
const bcrypt = require("bcryptjs");

// Validate Password before Hashing it
// @useCase:- when guest/user registers/updates an account.
const validatePassword = (req, res, next) => {
  // Check for empty request first
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send("Empty body request");
  }

  if (!req.body.password) {
    return res.status(400).send("Password is required");
  }

  // Password validation regex
  let regex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );

  /*
    (?=.*[a-z]) >> The string must contain at least 1 lowercase alphabetical character
    (?=.*[A-Z]) >> The string must contain at least 1 uppercase alphabetical character
    (?=.*[0-9]) >> The string must contain at least 1 numeric character
    (?=.*[!@#$%^&*]) >> The string must contain at least one special character 
    (?=.{8,}) >> The string must be eight characters or longer
  */

  // Invalid Password
  if (!regex.test(req.body.password)) {
    return res.status(400).send(
      "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character."
    );
  }

  // Valid Password
  return next();
};

// Check if the password from the request is the same as the password saved in the database
// @useCase:- when a user is updating their info.
const checkPassword = async (req, res, next) => {
  try {
    // Get user
    const user = await User.findById(req.body.id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Compare password
    const isPassword = await bcrypt.compare(req.body.oldPassword, user.password);

    if (isPassword) {
      // Valid password
      return next();
    } else {
      return res.status(400).send("Wrong old password");
    }
  } catch (error) {
    return res.status(500).send("Oops! Something went wrong, please try again.");
  }
};

module.exports = {
  validatePassword,
  checkPassword,
};
