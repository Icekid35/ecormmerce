import { PrismaClient } from '@prisma/client';

const prismadb = (globalThis as any).prismadb || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  (globalThis as any).prismadb = prismadb;
}

export default prismadb;
