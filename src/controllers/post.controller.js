import { insertNewPost } from "../repositories/post.repository.js";

const createPost = async (req, res) => {
  // TODO:Pegar o userId da validação(middleware) e corrigir no repository
  //const userId = res.locals;
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
