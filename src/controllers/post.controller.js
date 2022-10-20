import { insertNewPost, getPosts} from "../repositories/post.repository.js";

const createPost = async (req, res) => {
  
  const { url, description } = req.body;

  try {
    await insertNewPost(url, description);

    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
};

const getTimelinePosts = async (req,res) => {

  try {
    const posts = await getPosts();

    return res.status(200).send(posts.rows);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export { createPost, getTimelinePosts };
