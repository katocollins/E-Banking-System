const jwt = require("jsonwebtoken");

process.env.JWT_SECRET= "4ffb6b7d6054d0dac6542cdfa210aec2b247ef943f1ed2cde08c859c10cd08e10f956463f84645953b50de21213028e05dfbb94ec4274acb6a63806bd058edba";

const generateUsersToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET);
};

module.exports = {
  generateUsersToken,
};
