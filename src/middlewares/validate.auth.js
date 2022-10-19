import schemaSignUp from "../schemas/auth.schema.js";

function validateSignUp(req, res, next) {
  const { email, name, password, picture } = req.body;
  const validate = schemaSignUp.validate(
    {
      email,
      name,
      password,
      picture,
    },
    { abortEarly: false }
  );
  if (validate.error) {
    return res.status(422).send(validate.error.details.map((e) => e.message));
  }
  res.locals.body = { email, password, name, picture };
  next();
}

export { validateSignUp };
