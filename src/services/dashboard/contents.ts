import 'server-only'

import { prisma } from '@/lib/prisma'
import type { CreateContentInput } from '@/types/dashboard/content'

export async function createGeneratedContent(input: CreateContentInput) {
  return prisma.generatedContent.create({
    data: {
      userId: input.userId,
      platform: input.platform,
      topic: input.topic,
      keywords: input.keywords,
      content: input.content,
    },
  })
}
