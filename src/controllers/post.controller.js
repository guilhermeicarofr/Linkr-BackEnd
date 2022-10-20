import { insertNewPost } from "../repositories/post.repository.js";

const createPost = async (req, res) => {
  
  const { url, description } = req.body;

  try {
    await insertNewPost(url, description);

    return res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(500);
  }
};

export { createPost };
