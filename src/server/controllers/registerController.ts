import user from "../models/userModel";
import { httpError } from "@/errors/http.erros";
export const existingUser = async (email: string): Promise<void> => {
  const duplicateemail = await user.findOne({ email });
  if (duplicateemail) {
    throw new httpError("Email already exists", 409);
  }
};
export const addNewUser = async (newUser: object): Promise<object> => {
  const newuseradded = await user.create(newUser);
  if (!newuseradded) {
    throw new httpError("Failed to add user", 400);
  }
  const { confirmPassword,password, ...safeUser } = newuseradded.toObject();
  return safeUser;
};
