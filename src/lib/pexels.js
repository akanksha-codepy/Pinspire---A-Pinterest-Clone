export async function searchPexels(query, perPage = 30) {
  const key = import.meta.env.VITE_PEXELS_API_KEY
  if (!key) throw new Error('VITE_PEXELS_API_KEY not set')

  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${perPage}`
  const res = await fetch(url, {
    headers: {
      Authorization: key,
    },
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Pexels error: ${res.status} ${text}`)
  }

  const json = await res.json()
  return (json.photos || []).map(photo => ({
    id: photo.id,
    title: photo.alt || photo.photographer || 'Pexels image',
    description: photo.alt || '',
    image: photo.src?.large || photo.src?.medium || photo.src?.original,
    tags: [photo.photographer?.toLowerCase() || 'photographer'],
  }))
}
