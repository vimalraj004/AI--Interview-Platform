import { RegisterDTO } from "@/app/types/signUpPage";
import {
  existingUser,
  addNewUser,
} from "@/server/controllers/registerController";
import { hashPassword } from "../lib/bcrypt";
export const registerUser = async (payload: RegisterDTO) => {
  const { email, password } = payload;
  // find existingUser or not
  await existingUser(email);
  // bcrpt(hash) password
  const hashedPassword = await hashPassword(password);
  let newuser = {
    ...payload,
    password: hashedPassword,
  };
  return await addNewUser(newuser);
};
