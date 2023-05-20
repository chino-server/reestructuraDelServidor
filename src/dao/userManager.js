import { userModel } from "../db/models/users.model.js";

export default class UserManager {
  async addUser(user) {
    const { email, password } = user;
    try {
      const userExiste = await userModel.find({ email, password });
      if (userExiste.length === 0) {
        const newUsuario = await userModel.create(user);
        return newUsuario;
      } else{
        return null
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getUser (user){
    const {email} = user
    const userEncontrado = await userModel.find({email})
    //console.log(userEncontrado);
    if (userEncontrado.length !==0){
        return userEncontrado
    }else{
        return null
    }
  }
}
