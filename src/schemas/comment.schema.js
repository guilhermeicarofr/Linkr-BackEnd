import joi from "joi";

const commentSchema = joi.object({ 
  comment: joi.string().min(1).max(250).trim().required(),
});

export { commentSchema };