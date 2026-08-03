import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'

export default function Header({ value, onChange, onToggleCollections, savedCount=0 }) {
  return (
    <header className="site-header top-nav">
      <div className="header-inner container">
        <div className="left-block">
          <Link to="/" className="brand-link">
            <div className="brand-icon">P</div>
            <div className="brand-text">
              <span className="brand-label">P</span>
              <span className="brand-name">inspark</span>
            </div>
          </Link>
          <nav className="nav-left">
            <Link to="/" className="nav-pill">Home</Link>
          </nav>
        </div>

        <div className="center-block">
          <SearchBar value={value} onChange={onChange} />
        </div>

        <div className="right-block">
          <button className="saved-pill" onClick={onToggleCollections}>
            Saved <span className="saved-count">{savedCount}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
