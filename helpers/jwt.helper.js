const jwt = require("jsonwebtoken");
const path = require("path");
const rootDir = require("./path-helper");
require("dotenv").config({ path: path.join(rootDir, "secure", ".env") });

const maxAge = 3 * 24 * 60 * 60; // 3days in seconds

const createToken = (id) => {
  // Returns a JWT with a signature. Headers are already attached when created. 
  // First param is the payload. The second is the secret.
  return jwt.sign({ id }, process.env.JWTSECRET, { expiresIn: maxAge });
};

module.exports = createToken;