import express from "express";
import { userController } from "../controller/userController.js";
import { postController } from "../controller/postController.js";
import upload from "../middleware/multer.js";
import saveController from "../controller/saveController.js";
const userRoute = express();

userRoute.post("/register", userController.register);
userRoute.post("/login", userController.login);
// userRoute.post("/post", upload.single("image"), postController.createPost);
userRoute
  .route("/post")
  .post(upload.single("image"), postController.createPost)
  .get(postController.fetchPost);

userRoute
  .route("/save")
  .post(saveController.savePost)
  .get(saveController.getSaved);

userRoute.get("/article", postController.fetchSpecificPost);

userRoute
  .route("/profile")
  .get(userController.getPorfile)
  .post(upload.single('image'),userController.updateUser);
export default userRoute;


