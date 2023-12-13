import { generateRandomString } from "../helpers/generate";
import User from "../models/user.model"
import md5 from "md5";

export const resolversUser = {
  Mutation: {
    registerUser: async (_, args) => {
      const { user } = args;
      
      const emailExist = await User.findOne({
        email: user.email
      });
      if (emailExist) {
        return {
          code: 400,
          message: "Email already exist"
        }
      }
      
      user.password = md5(user.password);
      user.token = generateRandomString(30);
      const newUser = await User.create(user);

      return {
        code: 200,
        message: "Thành công!",
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        token: newUser.token
      }
    }
  }
}