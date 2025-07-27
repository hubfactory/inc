import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    news: defineCollection({
      source: 'news/*.md',
      type: 'page',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        image: z.string().optional(),
        publishedAt: z.string()
      })
    }),
    eng: defineCollection({
      source: 'eng/*.md',
      type: 'page',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        image: z.string().optional(),
        publishedAt: z.string()
      })
    })
  }
})