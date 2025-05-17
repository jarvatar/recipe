import { Prisma, PrismaClient } from '@prisma/client'

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

declare module '@prisma/client' {
  export namespace Prisma {
    function parseJson<T = Record<string, any>>(json: Prisma.JsonValue): T
  }
}

Prisma.parseJson = <
  T = string | number | boolean | Record<string, any> | Array<any> | null,
>(
  json: Prisma.JsonValue
): T => {
  return json as T
}
