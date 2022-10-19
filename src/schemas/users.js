import joi from "joi";

const schemaSignUp = joi.object({
  email: joi.string().email().required().max(100).trim(),
  password: joi.string().required().max(50).trim(),
  username: joi.string().required().max(50).trim(),
  pictureUrl: joi
    .string()
    .required()
    .pattern(new RegExp(/(https?:\/\/.*\.(?:png|jpg))/i))
    .trim(),
});

export default schemaSignUp;
