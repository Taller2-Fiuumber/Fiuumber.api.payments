// import axios from 'axios';// For API consuming
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export const getSomething = (): Promise<User[]> => {
  return prisma.user.findMany();
};
