import { getPostById } from "../repositories/post.repositories.js";
import { insertNewShare } from "../repositories/share.repositories.js";

async function sharePost (req, res) {
    const { postId } = req.params;
    const userId = res.locals.userId;

    try {
        const checkpost = await getPostById(postId);
        if(!checkpost?.rows.length) {
            return res.sendStatus(404);
        }

        await insertNewShare({postId, userId});
        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
    }
}

export { sharePost };