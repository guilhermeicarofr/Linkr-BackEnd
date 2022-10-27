import sanitizer from "../utils/sanitizer.js";

function validateSchema(schema) {
  return (req, res, next) => {

    if(req.body.name) {
        req.body.name = sanitizer(req.body.name);
    }
    if(req.body.comment) {
      req.body.comment = sanitizer(req.body.comment);
  }

    const validation = schema.validate(req.body, { abortEarly: false });

    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }
    next();
  };
}

export { validateSchema };
