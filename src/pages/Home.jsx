import React, { useState, useEffect } from 'react'
import SearchBar from '../shared/SearchBar'
import MasonryGrid from '../shared/MasonryGrid'
import data from '../data/sample.json'
import { searchPexels } from '../lib/pexels'
import { searchPixabay } from '../lib/pixabay'
import { searchUnsplash } from '../lib/unsplash'
import Footer from '../shared/Footer'

export default function Home({ query, setQuery, onSave, onRemove, isSaved }) {
  const [pins, setPins] = useState([])
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [source, setSource] = useState('local')

  const hasPexelsKey = !!import.meta.env.VITE_PEXELS_API_KEY
  const hasPixabayKey = !!import.meta.env.VITE_PIXABAY_API_KEY
  const hasUnsplashKey = !!import.meta.env.VITE_UNSPLASH_API_KEY || !!import.meta.env.VITE_UNSPLASH_ACCESS_KEY
  const suggestions = ['sunset', 'city', 'forest', 'anime', 'cozy', 'beach', 'coffee']

  const handleSuggestion = (value) => {
    setQuery(value)
  }

  useEffect(() => {
    setPins(data)
  }, [])

  // debounce the search input for better UX
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim()), 250)
    return () => clearTimeout(t)
  }, [query])

  useEffect(() => {
    let cancelled = false
    async function doSearch() {
      setError(null)
      if (!debouncedQuery) {
        setPins(data)
        setLoading(false)
        return
      }

      const q = debouncedQuery.toLowerCase()
      const localResults = data.filter(p =>
        p.title.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.tags && p.tags.join(' ').toLowerCase().includes(q))
      )

      if (!cancelled) {
        setPins(localResults)
        setSource('local')
      }

      const providers = []
      if (hasPexelsKey) providers.push({ name: 'pexels', fn: () => searchPexels(debouncedQuery, 30) })
      if (hasPixabayKey) providers.push({ name: 'pixabay', fn: () => searchPixabay(debouncedQuery, 30) })
      if (hasUnsplashKey) providers.push({ name: 'unsplash', fn: () => searchUnsplash(debouncedQuery, 30) })

      if (providers.length) {
        setLoading(true)
        try {
          const combined = []
          for (const provider of providers) {
            try {
              const results = await provider.fn()
              if (!cancelled && results.length) {
                combined.push(...results)
              }
            } catch (err) {
              // Ignore provider-specific failures and continue to the next one.
            }
          }

          if (!cancelled && combined.length) {
            const deduped = combined.filter((item, index, arr) => arr.findIndex(other => other.id === item.id) === index)
            setPins(deduped)
            setSource('multi')
          } else if (!cancelled) {
            setPins(localResults)
            setSource('local')
          }
        } catch (err) {
          if (!cancelled) setError(err.message || String(err))
        } finally {
          if (!cancelled) setLoading(false)
        }
      }
    }

    doSearch()
    return () => { cancelled = true }
  }, [debouncedQuery])

  const filtered = pins
  return (
    <div className="page-root">
      <main className="container main-area">
        <div className="hero">
          <div className="hero-badge">Image ideas for every mood</div>
          <h1 className="hero-title">Discover and save creative ideas</h1>
          <p className="hero-sub">Explore beautiful photos — search by keyword, browse curated scenes, and save favorites to your collection.</p>
          <div className="hero-row">
            <span className="pill">Search smarter</span>
            <span className="pill">Live API feed</span>
            <span className="pill">Save favorites</span>
          </div>
        </div>

        <div className="chip-row">
          {suggestions.map(term => (
            <button key={term} type="button" className="chip" onClick={() => handleSuggestion(term)}>
              {term}
            </button>
          ))}
        </div>
        {debouncedQuery && !loading && (
          <div className={`search-note ${source === 'local' ? '' : 'success'}`}>
            {source === 'local'
              ? 'Showing local sample results. Search results will load from Pexels, Pixabay, or Unsplash when available.'
              : 'Showing live results from connected image providers.'}
          </div>
        )}
        {error && <div className="search-error">{error}</div>}

        {loading ? (
          <div className="masonry">
            {Array.from({length:8}).map((_,i)=>(
              <div className="pin skeleton" key={i}>
                <div className="skeleton-img" />
                <div className="skeleton-line" />
              </div>
            ))}
          </div>
        ) : debouncedQuery && filtered.length === 0 ? (
          <div className="no-results">No results for "{debouncedQuery}"</div>
        ) : (
          <MasonryGrid items={filtered} onSave={onSave} onRemove={onRemove} isSaved={isSaved} />
        )}
      </main>
      <Footer />
    </div>
  )
}
