import Posts from "../model/posts.js";
export const createPost = async (req, res) => {
  const { caption, image, user, likedby } = req.body;
  try {
    const Post = await Posts.create({
      caption,
      image,
      user,
      likedby,
      comments: [],
      likes: 0,
    });
    Post.save();
    res.status(201).json(Post);
  } catch (error) {}
};

export const getPost = async (req, res) => {
  try {
    const postArr = await Posts.find();
    res.status(200).json(postArr);
  } catch (error) {}
};
