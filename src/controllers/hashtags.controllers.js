import urlMetadata from "url-metadata";

import { listHashtagPosts, listHashtags } from "../repositories/hashtags.repositories.js";

async function getHashtags(req, res) {
	try {
		const trendings = (await listHashtags()).rows;

		return res.status(200).send(trendings);
	} catch (error) {
		return res.sendStatus(500);
	}
}

async function getHashtagsByName(req, res) {
	const hashtag = req.params.hashtag;
	try {
	  const hashtagPosts = await listHashtagPosts(hashtag);
	  if (hashtagPosts.rowCount === 0) return res.sendStatus(404);
	  const completePosts = await Promise.all(
		hashtagPosts.rows.map(async (post) => {
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
  

export { getHashtags,getHashtagsByName };
