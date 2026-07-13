type RestCountriesPage = {
  data?: {
    meta?: {
      count?: number
      more?: boolean
    }
    objects?: Array<{
      flag?: {
        url_png?: string
        url_svg?: string
      }
      flags?: {
        png?: string
        svg?: string
      }
      name?: {
        common?: string
      }
      names?: {
        common?: string
      }
    }>
  }
}

function getCountryName(country: RestCountriesPage['data']['objects'][number]) {
  return country?.names?.common || country?.name?.common || ''
}

function getCountryFlag(country: RestCountriesPage['data']['objects'][number]) {
  return (
    country?.flag?.url_png ||
    country?.flag?.url_svg ||
    country?.flags?.png ||
    country?.flags?.svg ||
    ''
  )
}

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const apiToken = config.restCountriesApiToken

  if (!apiToken) {
    throw createError({
      statusCode: 500,
      statusMessage: 'REST_COUNTRIES_API_TOKEN is not configured.',
    })
  }

  const countries = []
  let offset = 0
  let more = true
  const limit = 100

  while (more) {
    const payload = await $fetch<RestCountriesPage>(
      'https://api.restcountries.com/countries/v5',
      {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
        query: {
          limit,
          offset,
          response_fields: 'names.common,flag.url_png,flag.url_svg',
        },
      },
    )

    const objects = payload?.data?.objects || []
    const meta = payload?.data?.meta

    countries.push(
      ...objects
        .map((country) => ({
          flag: getCountryFlag(country),
          name: getCountryName(country),
        }))
        .filter((country) => country.flag && country.name),
    )

    more = Boolean(meta?.more)
    offset += Number(meta?.count || objects.length)

    if (objects.length === 0) {
      break
    }
  }

  return countries
})
