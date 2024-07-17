import { Schema, model } from "mongoose";

const userShema = new Schema({
  name: {
    require: true,
    type: String,
  },
  email: {
    require: true,
    type: String,
  },
  image: {
    type: String,
  },
  about : {
    type : String
  },
  password: {
    require: true,
    type: String,
  },
});

export const user = model("user", userShema);
