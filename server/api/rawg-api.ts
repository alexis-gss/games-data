import { defineEventHandler, readBody } from 'h3'

const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const { endpoint, query } = await readBody(event)

  // Add api key to the url params.
  const url = new URL(`${config.public.apiUrl}/${endpoint}`)
  url.searchParams.append('key', config.public.apiKey)

  // Update URL with game id or query params.
  if (typeof query !== 'string') {
    for (const [key, value] of Object.entries(query as Object)) {
      url.searchParams.append(key, value.toString())
    }
  } else {
    url.pathname = url.pathname + `/${query}`
  }

  // Call RAWG api.
  try {
    const response = await fetch(url.toString())
    if (!response.ok) {
      throw new Error(`RAWG API responded with status ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching data from RAWG API:', error)
    throw error
  }
})
