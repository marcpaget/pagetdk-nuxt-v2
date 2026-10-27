export default defineEventHandler((event) => {
  if (getRequestURL(event).pathname !== '/serviceWorker.js') return

  // Missing worker requests must not fall through to the content page renderer.
  setResponseStatus(event, 404)
  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  setHeader(event, 'Cache-Control', 'no-store')
  return 'Not found'
})
