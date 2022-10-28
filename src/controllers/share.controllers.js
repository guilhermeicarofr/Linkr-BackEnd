import { countPostShares, deleteShare, getSharebyId, insertNewShare } from "../repositories/share.repositories.js";

async function sharePost (req, res) {
    const { postId } = req.params;
    const userId = res.locals.userId;



    try {
        await insertNewShare({postId, userId});
        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
    }
}

async function unsharePost(req, res) {
    const { shareId } = req.params;
    const userId = res.locals.userId;
    
    try {
        const share = await getSharebyId(shareId);
        if(share.rows[0]?.shareUserId !== userId) {
            return res.sendStatus(401);
        }

        await deleteShare(shareId);
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
}

async function getShareCount(req, res) {
    const { postId } = req.params;

    try {
        const count = await countPostShares(postId);
        res.status(200).send(count?.rows[0]);
    } catch (error) {
        res.sendStatus(500);
    }
}

export { sharePost, getShareCount, unsharePost };