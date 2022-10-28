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
				let url = {};
				await urlMetadata(post.url).then((meta) => {
					url = {
						title: meta.title,
						image: meta.image,
						path: meta.url,
						description: meta.description
					}
				})
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
		console.log(completePosts)
		res.status(200).send(completePosts);
	} catch (error) {
		console.log(error)
		return res.sendStatus(500);
	}
}

export { getHashtags, getHashtagsByName };
