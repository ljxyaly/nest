// prisma.extension.ts
import { PrismaClient } from '@prisma/client'
import pagination from 'prisma-extension-pagination'

// pagination for all models
export const extendedPrismaClient = new PrismaClient().$extends(
  pagination({
    pages: {
      limit: 20,
      includePageCount: true
    }
  })
)

export type ExtendedPrismaClient = typeof extendedPrismaClient
