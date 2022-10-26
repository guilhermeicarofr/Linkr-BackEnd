import joi from "joi";
import { stripHtml } from "string-strip-html";

const schemaSignUp = joi.object({
  email: joi.string().email().required().max(100).trim(),
  name: joi.string().required().max(50).trim(),
  password: joi.string().required().max(50).min(4).trim(),
  picture: joi
    .string()
    .required()
    .pattern(new RegExp(/(https?:\/\/.*\.(?:png|jpg))/i))
    .trim()
    .messages({
      "string.pattern.base": "image format is invalid",
    }),
});
const schemaSignIn = joi.object({
  email: joi.string().email().required().max(100).trim(),
  password: joi.string().required().max(50).min(4).trim(),
});

export { schemaSignUp, schemaSignIn };
