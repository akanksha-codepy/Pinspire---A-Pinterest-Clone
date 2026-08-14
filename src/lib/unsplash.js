export async function searchPhotos(query, perPage = 30) {
  const key = import.meta.env.VITE_UNSPLASH_ACCESS_KEY
  if (!key) throw new Error('VITE_UNSPLASH_ACCESS_KEY not set')

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
  return (json.results || []).map(r => ({
    id: r.id,
    title: r.description || r.alt_description || r.user?.name || 'Untitled',
    description: r.alt_description || '',
    image: r.urls?.regular,
    tags: (r.tags || []).map(t => (t.title || t.title))
  }))
}
