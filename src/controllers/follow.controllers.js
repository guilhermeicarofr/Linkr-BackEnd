import { follow, getFollowing, unfollow } from "../repositories/follow.repositories.js";

async function postFollow(req, res) {
    const followedBy = res.locals.userId
    const userId = req.params.id;
    
    try {
        const following = await getFollowing({userId, followedBy});

        if(following.rowCount === 0) {
            await follow({userId, followedBy});
            return res.sendStatus(201);
        }
        
        await unfollow({userId, followedBy});
        return res.sendStatus(204);
       
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

async function getFollow(req, res) {
    const followedBy = res.locals.userId;
    const userId = req.params.id;
    
    const following = await getFollowing({userId, followedBy});

    if(following.rowCount === 0) {
        return res.status(200).send({isFollowing: false});
    }

    return res.status(200).send({isFollowing: true});
}

export { postFollow, getFollow }