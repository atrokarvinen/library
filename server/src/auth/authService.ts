import bcrypt from "bcrypt";
import { prisma } from "../core/prisma";
import randomNames from "./randomNames.json";

export class AuthService {
  signIn = async (username: string, password: string) => {
    const user = await prisma.user.findFirst({ where: { name: username } });
    if (!user) {
      throw new Error(`User '${username}' not found`);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    return user;
  };

  signUp = async (username: string, password: string) => {
    const existingUser = await prisma.user.findFirst({
      where: { name: username },
    });
    if (existingUser) {
      throw new Error(`User '${username}' already exists`);
    }
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
