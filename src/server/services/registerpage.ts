import { RegisterDTO } from "@/app/types/signUpPage";
import {
  existingUser,
  addNewUser,
} from "@/server/controllers/registerController";
import { hashPassword } from "../lib/bcrypt";
export const registerUser = async (payload: RegisterDTO) => {
  const { email, password,photoURL,googleID } = payload;
  let newuser;
  // find existingUser or not
  await existingUser(email);
  // bcrpt(hash) password
  if(password){
const hashedPassword = await hashPassword(password);
 newuser = {
    ...payload,
    password: hashedPassword,
  };
  }else{
    newuser = {
      email,
      photoURL,
      googleID
    }
  }
  return await addNewUser(newuser);
};
