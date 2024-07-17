import { saveModel } from "../model/savedPost.js";

const saveController = {
  savePost: async (req, res) => {
    try {
      const { userId, postId } = req.body;
      console.log(req.body,"user");
      const savedPost = await saveModel.findOne({ userId: userId });
      if (savedPost) {
        if (savedPost.posts.includes(postId)) {
          console.log("okkkk");
          await saveModel.updateOne(
            {
              userId,
            },
            {
              $pull: {
                posts: postId,
              },
            }
          );
        } else {
          await saveModel.updateOne({ userId }, { $push: { posts: postId } });
        }
      } else {
        await saveModel.create({
          userId,
          posts: [postId],
        });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  getSaved : async (req,res) => {
    try {
      const userId = req.query.userId
      console.log(userId,"hehe")
      const saved = await saveModel.findOne({userId : userId}).populate('posts');
      res.status(200).json({saved})
    } catch (error) {
      res.status(500).json({error})
    }
  }
};
export default saveController;
