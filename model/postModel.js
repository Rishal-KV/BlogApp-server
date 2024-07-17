import { model, Schema } from "mongoose";

const postSchema = new Schema(
  {
    user: {
      require: true,
      ref: "user",
      type: String,
    },
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

export const postModel = model("post", postSchema);
