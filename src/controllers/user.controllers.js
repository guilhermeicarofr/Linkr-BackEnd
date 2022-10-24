import urlMetadata from "url-metadata";

import {
	getUserPostsRepository,
	getUsersRepository,
	listUsersByName,
} from "../repositories/user.repositories.js";

async function userPostsController(req, res) {
	const userId = req.params.id;

	try {
		const user = await getUsersRepository(userId);

		if (user.rowCount === 0) return res.sendStatus(404);

		const userPosts = await getUserPostsRepository(userId);

		if (userPosts.rowCount === 0) return res.sendStatus(404);

		const completePosts = await Promise.all(
			userPosts.rows.map(async (post) => {
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

		const objectResponse = {
			id: user.rows[0].id,
			name: user.rows[0].name,
			picture: user.rows[0].picture,
			posts: completePosts,
		};

		return res.status(200).send(objectResponse);
	} catch (error) {
		return res.sendStatus(500);
	}
}
async function getUsersByName(req, res) {
	const name = req.query.name;
	if (!name) return res.send([]);

	try {
		const users = (await listUsersByName(userId)).rows;

		return res.status(200).send(users);
	} catch (error) {
		return res.sendStatus(500);
	}
}

export { userPostsController, getUsersByName };
