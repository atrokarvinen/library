import bcrypt from "bcrypt";
import { prisma } from "../core/prisma";
import randomNames from "./randomNames.json";

export class AuthService {
  validateSignIn = async (username: string, password: string) => {
    const user = await prisma.user.findFirst({ where: { name: username } });
    if (!user) {
      return `User '${username}' not found`;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return "Invalid password";
    }
  };

  signIn = async (username: string) => {
    return prisma.user.findFirst({ where: { name: username } });
  };

  validateSignUp = async (payload: any) => {
    const { username, password, confirmPassword } = payload;
    const existingUser = await prisma.user.findFirst({
      where: { name: username },
    });
    if (existingUser) {
      return `User '${username}' already exists`;
    }
    return null;
  };

  signUp = async (username: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name: username,
        password: hashedPassword,
      },
    });
    return user;
  };

  logout = async (userId: number) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new Error(`User '${userId}' not found`);
    }
    console.log(`Logged out user '${user.name}'`);
  };

  generate = async () => {
    const randomIdx = Math.floor(Math.random() * randomNames.length);
    const username = randomNames[randomIdx];
    const password = "test";
    await prisma.user.deleteMany({ where: { name: username } });
    const user = await this.signUp(username, password);
    console.log("Generated user:", user);
    return { ...user, password };
  };
}
