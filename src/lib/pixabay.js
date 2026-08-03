export async function searchPixabay(query, perPage = 30) {
  const key = import.meta.env.VITE_PIXABAY_API_KEY
  if (!key) throw new Error('VITE_PIXABAY_API_KEY not set')

  const url = `https://pixabay.com/api/?key=${encodeURIComponent(key)}&q=${encodeURIComponent(query)}&per_page=${perPage}&image_type=photo`
  const res = await fetch(url)

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Pixabay error: ${res.status} ${text}`)
  }

  const json = await res.json()
  return (json.hits || []).map(item => ({
    id: item.id,
    title: item.tags || 'Pixabay image',
    description: item.tags || '',
    image: item.largeImageURL || item.webformatURL || item.previewURL,
    tags: (item.tags || '').split(',').map(tag => tag.trim()).filter(Boolean),
  }))
}
