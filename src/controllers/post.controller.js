import urlMetadata from "url-metadata";
import {
	insertNewPost,
	getPosts,
	listLikes,
	insertLike,
	getLikeByIds,
	deleteLike,
	deletePostRepository,
	deletePostLikesRespository,
	deletePostsHashtagsRepository,
} from "../repositories/post.repository.js";
import {
	getTag,
	insertNewTag,
	insertNewTagQuote,
} from "../repositories/hashtags.repositories.js";
import { filterTags } from "../utils/filterTags.js";

async function createPost(req, res) {
	const { url, description } = req.body;
	const userId = res.locals.userId;

	const tags = filterTags(description);

	try {
		const postId = await insertNewPost({ description, userId, url });

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

async function getLikes(req, res) {
	const postId = req.params.postId;
	try {
		const likes = (await listLikes(postId)).rows;
		return res.status(200).send(likes);
	} catch {
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
	} catch {
		return res.sendStatus(500);
	}
}

async function deleteUserPost(req, res) {
	const postId = req.params.postId;
	const userId = res.locals.userId;

	try {
		await deletePostRepository({postId, userId});
		await deletePostsHashtagsRepository(postId);
		await deletePostLikesRespository(postId);

		return res.sendStatus(200);

	} catch (error) {
		return res.status(500).send(error.message);
	}
}

export { createPost, getTimelinePosts, getLikes, changeLikes, deleteUserPost };
