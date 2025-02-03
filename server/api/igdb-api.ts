import axios from 'axios'

const config = useRuntimeConfig()
let accessToken = null as string|null
let tokenExpiration = 0

export default defineEventHandler(async (event) => {
  const { endpoint, query } = await readBody(event)

  try {
    const response = await igdbRequest(endpoint, query)
    return response.data

  } catch (error) {
    console.error('Erreur lors de la requête multi-query à IGDB:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la récupération des données combinées'
    })
  }
})

async function getAccessToken() {
  if (accessToken && Date.now() < tokenExpiration) {
    return accessToken
  }

  const response = await axios.post(`https://id.twitch.tv/oauth2/token?client_id=${config.public.igdbClientId}&client_secret=${config.public.igdbClientSecret}&grant_type=client_credentials`)
  accessToken = response.data.access_token
  tokenExpiration = Date.now() + response.data.expires_in * 1000
  return accessToken
}

async function igdbRequest(endpoint: string, query: string) {
  const token = await getAccessToken()
  return axios.post(`https://api.igdb.com/v4/${endpoint}`, query, {
    headers: {
      'Client-ID': config.public.igdbClientId,
      'Authorization': `Bearer ${token}`,
    }
  })
}
