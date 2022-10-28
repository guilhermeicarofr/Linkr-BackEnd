import { getPostById } from "../repositories/post.repositories.js";
import { getTag, insertNewTagQuote, deleteTagQuote } from "../repositories/hashtags.repositories.js";
import { countPostShares, deleteShare, getSharebyId, insertNewShare } from "../repositories/share.repositories.js";
import { filterTags } from "../utils/filterTags.js";

async function sharePost(req, res) {
    const { postId } = req.params;
    const userId = res.locals.userId;

    try {
        const post = await getPostById(postId);
        if (!post.rows.length) {
            return res.sendStatus(404);
        }

        const tags = filterTags((post?.rows[0]?.description) ? (post?.rows[0]?.description) : "");
        if (tags.length) {
            await tags.forEach(async (tag) => {
                let tagId = await getTag(tag);

                await insertNewTagQuote({
                    post: post?.rows[0]?.id,
                    tag: tagId?.rows[0]?.id,
                });
            });
        }
        await insertNewShare({ postId, userId });

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
        if (share.rows[0]?.shareUserId !== userId) {
            return res.sendStatus(401);
        }

        const post = await getPostById(share?.rows[0]?.postId);
        if (!post.rows.length) {
            return res.sendStatus(404);
        }

        const tags = filterTags((post?.rows[0]?.description) ? (post?.rows[0]?.description) : "");
        if (tags.length) {
            await tags.forEach(async (tag) => {
                let tagId = await getTag(tag);

                await deleteTagQuote({
                    post: post?.rows[0]?.id,
                    tag: tagId?.rows[0]?.id,
                });
            });
        }

        await deleteShare(shareId);
    } catch (error) {
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
