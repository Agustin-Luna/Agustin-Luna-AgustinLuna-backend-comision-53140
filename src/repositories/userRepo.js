import { UserDao } from "../DAO/index.js";

export const getUserById = async (id) => await UserDao.getUserById(id)

export const getUserByEmail = async (email) => await UserDao.getUserByEmail(email)

export const userRegistro = async (user) => await UserDao.userRegistro(user)