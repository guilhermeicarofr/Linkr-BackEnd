import { getPostById } from "../repositories/post.repository.js";


async function validatePost(req, res, next) {
	const postId = req.params.postId; 
	   
	try {
		const post = (await getPostById(postId)).rows;		
        if (post.length === 0) return res.sendStatus(404);
		next();
	} catch (error) {
		res.sendStatus(500);
	}
}

export { validatePost };
