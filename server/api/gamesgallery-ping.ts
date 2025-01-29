import { defineEventHandler, readBody } from 'h3'

const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const { slug } = await readBody(event)

  const url = new URL(`${config.public.ggUrl}/${slug}`)

  // Ping Gamesgallery website.
  try {
    const response = await fetch(url, { method: 'HEAD' })
    return { status: response.status, online: response.ok }
  } catch (error) {
    return { status: 0, online: false, error: error }
  }
})
