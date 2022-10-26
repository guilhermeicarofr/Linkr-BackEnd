import {
	insertComment,
	listComments,
} from "../repositories/comment.repositories";

async function getComments(req, res) {
	const postId = req.params.postId;
	try {
		const comments = (await listComments(postId)).rows;
		return res.status(200).send(comments);
	} catch (error) {
		return res.sendStatus(500);
	}
}

async function createComment(req, res) {
	const { comment } = req.body;
	const userId = res.locals.userId;

	try {
		await insertComment({ postId, userId, comment });
		return res.sendStatus(201);
	} catch (error) {
		return res.sendStatus(500);
	}
}
export { getComments, createComment };
