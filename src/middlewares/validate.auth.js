import { schemaSignUp, schemaSignIn } from "../schemas/auth.schema.js";

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
function validateSignIn(req, res, next) {
  const { email, password } = req.body;
  const validate = schemaSignIn.validate(
    {
      email,
      password,
    },
    { abortEarly: false }
  );
  if (validate.error) {
    return res.status(422).send(validate.error.details.map((e) => e.message));
  }
  res.locals.body = { email, password };
  next();
}

export { validateSignUp, validateSignIn };
