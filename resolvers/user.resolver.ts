import { generateRandomString } from "../helpers/generate";
import User from "../models/user.model"
import md5 from "md5";

export const resolversUser = {
  Query: {
    getUser: async (_, args, context) => {

      const infoUser = await User.findOne({
        token: context.user.token,
        deleted: false
      });

      if (infoUser) {
        return {
          code: 200,
          message: "Thành công!",
          id: infoUser.id,
          fullName: infoUser.fullName,
          email: infoUser.email,
          token: infoUser.token
        }
      }
      return {
        code: 400,
        message: "User not found"
      }
    }
  },

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
    },
    loginUser: async (_, args) => {
      const { user } = args;
      user.password = md5(user.password);
      const userExist = await User.findOne({
        email: user.email,
        password: user.password
      });
      if (!userExist) {
        return {
          code: 400,
          message: "Email or password is incorrect"
        }
      }
      return {
        code: 200,
        message: "Thành công!",
        id: userExist.id,
        fullName: userExist.fullName,
        email: userExist.email,
        token: userExist.token
      }
    }
  }
}