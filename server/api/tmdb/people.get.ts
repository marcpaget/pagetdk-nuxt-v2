// server/api/tmdb/people.get.ts

export default defineEventHandler(async (event) => {
  const { q } = getQuery(event)

  if (!q || typeof q !== 'string' || q.length < 2) {
    return {
      results: [],
    }
  }

  const config = useRuntimeConfig()

  return $fetch('https://api.themoviedb.org/3/search/person', {
    headers: {
      Authorization: `Bearer ${config.tmdbToken}`,
    },
    query: {
      query: q,
      language: 'en-US',
    },
  })
})
