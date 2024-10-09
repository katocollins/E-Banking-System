const jwt = require("jsonwebtoken");

const Admin = require("../../models/adminModel");

process.env.JWT_SECRET = "4ffb6b7d6054d0dac6542cdfa210aec2b247ef943f1ed2cde08c859c10cd08e10f956463f84645953b50de21213028e05dfbb94ec4274acb6a63806bd058edba";
const authAdminProtect = async (req, res, next) => {
  let token;
  let admin;
  let decoded;
  if (
    req.headers.authorization &&
    req.headers.authorization.trim().startsWith("Bearer")
  ) {
    try {
      //Get Token from header
      token = req.headers.authorization.split(" ")[1];
      //verify token
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      //Get Admin from Token
      admin = await Admin.findById(decoded.id);
      if (!admin) {
        return res.status(401).send("Not Authorized with invalid token");
      }
      //pass admin object to next middleware
      req.admin = await Admin.findById(decoded.id);
      next();
    } catch (error) {
      if (!decoded || !(await Admin.findById(decoded.id)))
        return res.status(401).send("Not Authorized with invalid token");
      return res.status(500).send("Ooops!! Something Went Wrong, Try again...");
    }
  }
  if (!token) return res.status(401).send("Not Authorized without token");
};

module.exports = {
  authAdminProtect,
};
