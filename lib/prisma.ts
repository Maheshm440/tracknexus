import { PrismaClient } from '@prisma/client';

// PrismaClient singleton for Next.js
// Prevents multiple instances during hot reloading in development

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Force fresh client after schema changes by checking for new models
if (globalForPrisma.prisma) {
  const prismaInstance = globalForPrisma.prisma as any;
  if (!('botVisit' in prismaInstance)) {
    globalForPrisma.prisma.$disconnect().catch(() => {});
    globalForPrisma.prisma = undefined;
  }
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
