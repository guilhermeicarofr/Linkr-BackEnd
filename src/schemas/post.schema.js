import joi from "joi";

const postSchema = joi.object({
  url: joi
    .string()
    .empty()
    .pattern(new RegExp(/(https?:\/\/.*\.(?:png|jpg))/i))
    .required(),
  description: joi.string().max(250).trim(),
});

export { postSchema };
