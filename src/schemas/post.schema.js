import joi from "joi";

const postSchema = joi.object({
  url: joi
    .string()
    .empty()
    .pattern(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/)
    .required(),
  description: joi.string().max(250).trim(),
});

export { postSchema };
