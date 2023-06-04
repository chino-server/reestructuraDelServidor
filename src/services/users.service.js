import UserManager from "../DAL/userManager.js";
import { hashData } from "../utils.js";

const userManager = new UserManager();

export const addUser = async (user) => {
  try {
    const existingUser = await userManager.getUser(user);
    
    if (existingUser) {
        throw new Error("Usuario existente");
    }
    const { password } = user;
    const hashPassword = await hashData(password);
    const newUser = { ...user, password: hashPassword };
    return await userManager.addUser(newUser);
  } catch (error) {
    throw error;
  }
};
