import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const createUser = async ({ email, password }) => {
    if (!email || !password) {
        throw new Error("Email and password are required");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({ email, password: hashPassword });

    return user; // Ensure the user is returned
};