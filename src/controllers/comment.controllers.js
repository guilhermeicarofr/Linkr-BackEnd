import {
	insertComment,
	listComments,
} from "../repositories/comment.repositories.js";
import { getFollowing } from "../repositories/follow.repositories.js";

async function getComments(req, res) {
	const postId = req.params.postId;
	const followedBy = res.locals.userId;
	try {
		const comments = (await listComments(postId)).rows;
		await Promise.all(
			comments.map(async (comment) => {
				const userId = comment.isFollowing;
				const following = await getFollowing({ userId, followedBy });

				if (following.rowCount === 0) {
					comment.isFollowing = false;
				} else {
					comment.isFollowing = true;
				}
				return comment;
			})
		);
		return res.status(200).send(comments);
	} catch (error) {
		return res.sendStatus(500);
	}
}

async function createComment(req, res) {
	const { comment } = req.body;
	const userId = res.locals.userId;
	const postId = req.params.postId;
	try {
		await insertComment({ postId, userId, comment });
		return res.sendStatus(201);
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
}
export { getComments, createComment };
