import urlMetadata from "url-metadata";
import { insertNewPost, getPosts } from "../repositories/post.repository.js";
import { getTag, insertNewTag, insertNewTagQuote } from "../repositories/hashtags.repositories.js";

async function createPost(req, res) {
  const { url, description } = req.body;
  const userId = res.locals.userId;

  const tags = description.split(' ').filter((word) => word[0]==='#' && word.length > 1).map((word) => word.slice(1));

  try {
    const postId = await insertNewPost({ description, userId, url });

    if(tags.length) {
      await tags.forEach(async (tag) => {

        let tagId = await getTag(tag);      
        if(!tagId?.rows.length) {
          tagId = await insertNewTag(tag);
        }

        await insertNewTagQuote({ post: postId?.rows[0]?.id, tag: tagId?.rows[0]?.id });
      });
    }

    return res.sendStatus(201);
  } catch (error) {
    return res.sendStatus(500);
  }
}

async function getTimelinePosts(req, res) {
  try {
    const posts = await getPosts();

    const completePosts = await Promise.all(
      posts.rows.map(async (post) => {
        const { title, image, url, description } = await urlMetadata(post.url);
        return {
          ...post,
          url: {
            title,
            image,
            path: url,
            description,
          },
        };
      })
    );

    res.status(200).send(completePosts);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export { createPost, getTimelinePosts };
