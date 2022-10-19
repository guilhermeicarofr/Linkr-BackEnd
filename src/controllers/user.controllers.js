import { getUserPostsRepository, getUsersRepository } from "../repositories/user.repositories.js";

const userPostsController = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await getUsersRepository(userId);

        if(user.rowCount === 0) return res.sendStatus(404);

        const userPosts = await getUserPostsRepository(userId);

        if(userPosts.rowCount === 0) return res.sendStatus(404);

        const objectResponse = {
            id: user.rows[0].id,
            name: user.rows[0].name,
            picture: user.rows[0].picture,
            posts: userPosts.rows
        }

        return res.status(200).send(objectResponse);

    } catch (error) {
        return res.status(500).send(error.message);
    }
};



export {userPostsController};