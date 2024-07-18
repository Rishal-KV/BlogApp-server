import { user } from "../model/userModel.js";
import { hashPassword, compare } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";
import { registrationSchema } from "../validations/user.js";
export const userController = {
  register: async (req, res) => {
    try {
      const { error, value } = registrationSchema.validate(req.body);
      console.log(error, "errr");
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const { name, email, password } = value;

      const userFound = await user.findOne({ email: email });
      if (userFound) {
        return res.status(409).json({
          status: false,
          message: "user with email already exists!!!",
        });
      } else {
        const hashedPassword = await hashPassword(password);
        user.create({
          name,
          email,
          password: hashedPassword,
        });
        res.status(200).json({ status: true, message: "user created!!" });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(req.body, "reqq");
      const userFound = await user.findOne({ email: email });

      if (userFound) {
        const verified = await compare(password, userFound.password);
        console.log(verified);

        if (verified) {
          const userData = await user
            .findOne({ email: email })
            .select("-password");
          const token = generateToken({ email: userFound.email });
          res
            .status(200)
            .json({ status: true, message: "welcome back", token, userData });
        } else {
          res.status(401).json({ status: false, message: "invalid password" });
        }
      } else {
        res.status(404).json({ status: false, message: "no user Found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  },

  getPorfile: async (req, res) => {
    try {
      const email = req.query.email;
      const userFound = await user.findOne({ email: email });
      res.status(200).json({ userFound });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  updateUser: async (req, res) => {
    try {
      console.log(req.body,"reqbody")
      const { email, name, about } = req.body;
      console.log();
      const oldImage = user.findOne({email:email})
      const image = req.file
      ? `https//blogapp.nutrix.fun/${req.file.filename}`
      : oldImage.image;
      const userUpdated = await user.findOneAndUpdate(
        { email: email },
        { $set: { name: name, image: image, about: about } },
        { new: true }
      );
console.log(userUpdated,"updated")
      res.status(200).json({ userUpdated });
    } catch (error) {
      console.log(error,"err");
      res.status(500).json({ error });
    }
  },
};
