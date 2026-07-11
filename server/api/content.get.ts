import { queryCollection } from '@nuxt/content/server'

export default defineEventHandler(async (event) => {
  return queryCollection(event, 'content').all()
})
