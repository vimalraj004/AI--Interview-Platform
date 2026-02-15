import { loginFormDTO } from "@/app/types/loginPage";
import { findUserEmail } from "../controllers/loginController";
import { comparePassword } from "../lib/bcrypt";
import { httpError } from "@/errors/http.erros";
export const loginService = async (payload: loginFormDTO): Promise<object> => {
  const { email, password, googleID } = payload;
  let verifyPassword;
  const account = await findUserEmail(email, googleID);
  if (password) {
    verifyPassword = await comparePassword(password, account.password);
  }
  if (password && !verifyPassword) {
    throw new httpError("Wrong Password ", 400);
  }
  return { email, _id: account._id };
};
