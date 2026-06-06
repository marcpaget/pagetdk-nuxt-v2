export default defineEventHandler(async (event) => {
  return queryCollection(event, 'content').all()
})
