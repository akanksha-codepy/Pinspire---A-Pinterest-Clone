export async function searchUnsplash(query, perPage = 30) {
  const key = import.meta.env.VITE_UNSPLASH_API_KEY || import.meta.env.VITE_UNSPLASH_ACCESS_KEY
  if (!key) throw new Error('Unsplash API key not set')

  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${perPage}`
  const res = await fetch(url, {
    headers: {
      Authorization: `Client-ID ${key}`,
    },
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Unsplash error: ${res.status} ${text}`)
  }

  const json = await res.json()
  return (json.results || []).map(item => ({
    id: item.id,
    title: item.description || item.alt_description || item.user?.name || 'Unsplash image',
    description: item.alt_description || '',
    image: item.urls?.regular || item.urls?.small || item.urls?.thumb,
    tags: (item.tags || []).map(tag => tag.title || '').filter(Boolean),
  }))
}
