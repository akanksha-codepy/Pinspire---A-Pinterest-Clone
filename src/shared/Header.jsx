import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'

export default function Header({ value, onChange, onToggleCollections, savedCount=0, isDark, onToggleTheme }) {
  return (
    <header className="site-header top-nav">
      <div className="header-inner container">
        <div className="left-block">
          <Link to="/" className="brand-link">
            <div className="brand-icon" aria-hidden="true">P</div>
            <div className="brand-text">
              <span className="brand-name">Pinspire</span>
              <span className="brand-label">Home feed</span>
            </div>
          </Link>
          <nav className="nav-left">
            <Link to="/" className="nav-pill">Browse</Link>
          </nav>
        </div>

        <div className="center-block">
          <SearchBar value={value} onChange={onChange} />
        </div>

        <div className="right-block">
          <button className="theme-toggle" type="button" onClick={onToggleTheme} aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`} title={`Switch to ${isDark ? 'light' : 'dark'} theme`}>
            <span aria-hidden="true">{isDark ? '☀' : '☾'}</span>
          </button>
          <button className="saved-pill" onClick={onToggleCollections}>
            Saved <span className="saved-count">{savedCount}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
