import { userModel } from "./models/users.model.js";

export default class UserManager {
  async addUser(obj) {
    const newUser = await userModel.create(obj);
    return newUser;
  }

  async getUser(user) {
    const { email } = user;
    const userEncontrado = await userModel.findOne({ email });
    return userEncontrado;
  }
}
