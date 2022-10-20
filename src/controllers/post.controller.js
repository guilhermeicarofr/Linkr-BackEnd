import { insertNewPost, getPosts } from "../repositories/post.repository.js";

async function createPost(req, res) {
  const { url, description } = req.body;
  const userId = res.locals.userId;

  try {
    await insertNewPost({ description, userId, url });
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
}

async function getTimelinePosts (req, res) {
  try {
    const posts = await getPosts();

    return res.status(200).send(posts.rows);
  } catch (error) {
    return res.sendStatus(500);
  }
};

export { createPost, getTimelinePosts };
