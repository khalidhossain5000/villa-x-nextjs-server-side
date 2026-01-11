export const validateRequest = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body); // Zod validation check
    next(); // যদি valid → controller execution
  } catch (err) {
    return res.status(400).json({ error: err.errors }); // invalid → 400 response
  }
};
