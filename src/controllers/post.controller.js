import { insertNewPost } from "../repositories/post.repositories.js";

const createPost = async (req, res) => {
  // TODO:Pegar o userId da validação(middleware)
  //const userId = res.locals
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
