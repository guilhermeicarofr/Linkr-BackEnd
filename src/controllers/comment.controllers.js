import { listComments } from "../repositories/comment.repositories";

async function getComments(req, res) {
	const postId = req.params.postId;
	try {
		const comments = (await listComments(postId)).rows;
		return res.status(200).send(comments);
	} catch (error) {
		return res.sendStatus(500);
	}
}

export { getComments };
