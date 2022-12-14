import urlMetadata from "url-metadata";

import {
  listUserPosts,
  getUser,
  listUsersByName,
} from "../repositories/user.repositories.js";

async function getUserPosts(req, res) {
  const userId = req.params.id;

  try {
    const user = await getUser(userId);

    if (user.rowCount === 0) return res.sendStatus(404);

    const userPosts = await listUserPosts(userId);

    const completePosts = await Promise.all(
      userPosts.rows.map(async (post) => {
        let url = {};
        await urlMetadata(post.url).then((meta) => {
          url = { 
            title: meta.title,
            image: meta.image,
            path: meta.url,
            description: meta.description
          }})
        .catch((error) => {
          url = { 
            title: "Preview not available",
            image: "",
            path: post.url,
            description: "This link has no description"
          }
        });

        return {
          ...post,
          url
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
  const userId = res.locals.userId;
  const name = req.query.name;
  if (!name) return res.sendStatus(422);
  try {
    const users = (await listUsersByName({name,userId})).rows;
    const hash = {};
    const uniqueUsers = [];
    users.forEach((user)=>{
      if (!hash[user.id]){
        hash[user.id]=true;
        uniqueUsers.push(user);
      }
    })    
    res.status(200).send(uniqueUsers);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export { getUserPosts, getUsersByName };
