import Post from "../models/post.model.js";

export const create = async (req, res, next) => {
  console.log(req.user);
  if (!req.user.isAdmin) {
    return next({
      statusCode: 403,
      message: "You are not authorized to create a post",
    });
  }

  if (!req.body.title || !req.body.content) {
    return next({
      statusCode: 400,
      message: "Please provide all required fields",
    });
  }

  // Fixing the typo from 'slit' to 'split'
  const slug = req.body.title
    .split(" ") // Corrected here
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, " ");

  const post = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};
