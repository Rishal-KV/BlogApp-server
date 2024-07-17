import { postModel } from "../model/postModel.js";
export const postController = {
  createPost: async (req, res) => {
    try {
      const image = req.file
        ? `http://localhost:3000/${req.file.filename}`
        : null;
      const { title, description,user } = req.body;
      console.log(user,"userr");
      const posted = await postModel.create({
        user,
        title,
        description,
        image,
      });
      res.status(200).json({ posted });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error });
    }
  },

  fetchPost: async (req, res) => {
    try {
      const post = await postModel.find().sort({ createdAt: -1 }).populate('user');
      if (post) {
        res.status(200).json({ post });
      } else {
        res.status(401).json({ post });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  fetchSpecificPost : async (req,res) => {
    try {
      const postId = req.query.id
      const post = await postModel.findOne({_id :postId }).populate('user')
      res.status(200).json({post})
    } catch (error) {
      res.status(500).json({ error });
    }
  }

 
};
