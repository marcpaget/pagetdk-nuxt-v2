export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') || ''
  const path = `/${slug}`

  return queryCollection(event, 'docs').path(path).first()
})
