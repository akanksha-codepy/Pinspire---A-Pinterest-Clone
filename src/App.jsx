import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PinDetail from './pages/PinDetail'
import Header from './shared/Header'
import Collections from './shared/Collections'

const STORAGE_KEY = 'pc_collections'
const THEME_KEY = 'pc_theme'

export default function App() {
  const [query, setQuery] = useState('')
  const [collections, setCollections] = useState({ Saved: [] })
  const [showCollections, setShowCollections] = useState(false)
  const [isDark, setIsDark] = useState(() => localStorage.getItem(THEME_KEY) === 'dark')

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setCollections(JSON.parse(raw))
    } catch (err) {
      // ignore
    }
  }, [])

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(collections)) } catch (e) {}
  }, [collections])

  useEffect(() => {
    document.documentElement.classList.toggle('dark-theme', isDark)
    try { localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light') } catch (e) {}
  }, [isDark])

  function savePin(pin, collection = 'Saved') {
    setCollections(prev => {
      const next = { ...prev }
      if (!next[collection]) next[collection] = []
      if (!next[collection].some(p => p.id === pin.id)) next[collection] = [pin, ...next[collection]]
      return next
    })
  }

  function removePin(pinId, collection = 'Saved') {
    setCollections(prev => {
      const next = { ...prev }
      if (!next[collection]) return prev
      next[collection] = next[collection].filter(p => p.id !== pinId)
      return next
    })
  }

  function isSaved(pinId) {
    return Object.values(collections).some(arr => arr.some(p => p.id === pinId))
  }

  return (
    <div className="app-root">
      <Header value={query} onChange={setQuery} onToggleCollections={() => setShowCollections(s => !s)} savedCount={Object.values(collections).reduce((s,a)=>s+a.length,0)} isDark={isDark} onToggleTheme={() => setIsDark(value => !value)} />
      {showCollections && (
        <Collections
          collections={collections}
          onClose={() => setShowCollections(false)}
          onRemove={removePin}
        />
      )}
      <Routes>
        <Route path="/" element={<Home query={query} setQuery={setQuery} onSave={savePin} onRemove={removePin} isSaved={isSaved} />} />
        <Route path="/pin/:id" element={<PinDetail onSave={savePin} onRemove={removePin} isSaved={isSaved} />} />
      </Routes>
    </div>
  )
}
