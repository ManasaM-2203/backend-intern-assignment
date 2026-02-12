const Joi = require('joi');

// ================= SIGNUP VALIDATION =================
const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(30).required(),
    role: Joi.string().valid("user", "admin").required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Validation error", error });
  }
  next();
};

// ================= LOGIN VALIDATION =================
const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid("user", "admin").required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Validation error", error });
  }
  next();
};

module.exports = { signupValidation, loginValidation };
