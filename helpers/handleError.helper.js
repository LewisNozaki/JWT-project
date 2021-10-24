// Error handling and extracting from MongoDB validation
const handleErrors = (err) => {
  let errorsMsgs = { email: "", password: "" };

  // duplicate error code
  if (err.code === 11000) {
    errorsMsgs.email = "That email has already been registered.";
    return errorsMsgs;
  }
  
  // validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errorsMsgs[properties.path] = properties.message;
    })
  }

  return errorsMsgs;
};

module.exports = handleErrors;