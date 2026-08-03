import React from 'react'

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search">
      <div className="search-inner">
        <span className="search-icon">🔍</span>
        <input
          placeholder="Search images... (title or description)"
          value={value}
          onChange={e => onChange(e.target.value)}
        />
        {value && (
          <button className="search-clear" onClick={() => onChange('')} aria-label="clear">✕</button>
        )}
      </div>
    </div>
  )
}
