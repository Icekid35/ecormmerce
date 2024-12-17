import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prismaClient: PrismaClient | undefined;
};

let prismadb: PrismaClient;

if (!globalForPrisma.prismaClient) {
  globalForPrisma.prismaClient = new PrismaClient();
}

prismadb = globalForPrisma.prismaClient;

export default prismadb;
