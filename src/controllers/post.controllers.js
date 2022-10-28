import urlMetadata from "url-metadata";

import {
	insertNewPost,
	listPosts,
	listLikes,
	insertLike,
	getLikeByIds,
	deleteLike,
	deletePost,
	deletePostLikes,
	deletePostsHashtags,
  updatePost
} from "../repositories/post.repositories.js";

import {
  getTag,
  insertNewTag,
  insertNewTagQuote
} from "../repositories/hashtags.repositories.js";

import { filterTags } from "../utils/filterTags.js";

async function createPost(req, res) {
  const { url, description } = req.body;
  const userId = res.locals.userId;
  let tags = [];

  if (description) {
    tags = filterTags(description);
  }

  try {
    const postId = await insertNewPost({description, userId, url });

    if (tags.length) {
      await tags.forEach(async (tag) => {
        let tagId = await getTag(tag);
        if (!tagId?.rows.length) {
          tagId = await insertNewTag(tag);
        }

        await insertNewTagQuote({
          post: postId?.rows[0]?.id,
          tag: tagId?.rows[0]?.id,
        });
      });
    }

    return res.sendStatus(201);
  } catch (error) {
    return res.sendStatus(500);
  }
}

async function getTimelinePosts(req, res) {
  const count = req.query.count;
  try {
    const posts = await listPosts(count);

    const completePosts = await Promise.all(
      posts.rows.map(async (post) => {
        let url = {};
        await urlMetadata(post.url).then((meta) => {
          url = { 
            title: meta.title,
            image: meta.image,
            path: meta.url,
            description: meta.description
          }})
        .catch((error) => {
          url = { 
            title: "Preview not available",
            image: "",
            path: post.url,
            description: "This link has no description"
          }
        });

        return {
          ...post,
          url
        };
      })
    );

    res.status(200).send(completePosts);
  } catch (error) {
    return res.sendStatus(500);
  }
}

async function getLikes(req, res) {
  const postId = req.params.postId;
  try {
    const likes = (await listLikes(postId)).rows;
    return res.status(200).send(likes);
  } catch (error) {
    return res.sendStatus(500);
  }
}

async function changeLikes(req, res) {
  const postId = req.params.postId;
  const userId = res.locals.userId;
  try {
    const like = (await getLikeByIds({ postId, userId })).rows;
    if (like.length === 0) {
      await insertLike({ postId, userId });
      return res.sendStatus(201);
    }
    await deleteLike({ postId, userId });
    return res.sendStatus(204);
  } catch (error) {
    return res.sendStatus(500);
  }
}

async function editPosts(req, res) {
  const { description } = req.body;
  const postId = req.params.postId;

  let tags = [];

  if (description) {
    tags = filterTags(description);
  }

  try {
    await updatePost({ description, postId });
    await deletePostsHashtags(postId);

    if (tags.length) {
      await tags.forEach(async (tag) => {
        let tagId = await getTag(tag);
        if (!tagId?.rows.length) {
          tagId = await insertNewTag(tag);
        }

        await insertNewTagQuote({
          post: postId,
          tag: tagId?.rows[0]?.id,
        });
      });
    }

    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
}

async function deleteUserPost(req, res) {
	const postId = req.params.postId;
	const userId = res.locals.userId;

	try {
		await deletePost({postId, userId});
		await deletePostsHashtags(postId);
		await deletePostLikes(postId);

		return res.sendStatus(200);

	} catch (error) {
		return res.sendStatus(500);
	}
}

export { createPost, getTimelinePosts, getLikes, changeLikes, deleteUserPost, editPosts  };
