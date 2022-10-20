import { listHashtagRepository } from "../repositories/hashtags.repositories.js";

async function hashtagGetController(req, res) {
	try {
		const trendings = (await listHashtagRepository()).rows;

		return res.status(200).send(trendings);
	} catch (error) {
		return res.sendStatus(500);
	}
}
export { hashtagGetController };
