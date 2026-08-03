import React, { useState } from 'react'

export default function Collections({ collections = {}, onClose, onRemove }) {
  const [active, setActive] = useState(Object.keys(collections)[0] || '')
  const collectionNames = Object.keys(collections)

  return (
    <div className="collections-panel">
      <div className="collections-header">
        <h3>Collections</h3>
        <button className="btn" onClick={onClose}>Close</button>
      </div>

      <div className="collections-list">
        <aside className="collections-nav">
          {collectionNames.map(name => (
            <button key={name} className={`chip ${active===name? 'active':''}`} onClick={() => setActive(name)}>{name} <span className="muted">({collections[name].length})</span></button>
          ))}
        </aside>

        <div className="collections-content">
          {active ? (
            <div className="grid">
              {collections[active].length === 0 && <div className="muted">No items</div>}
              {collections[active].map(item => (
                <div className="collection-item" key={item.id}>
                  <img src={item.image} alt={item.title} />
                  <div className="item-meta">
                    <div className="item-title">{item.title}</div>
                    <div className="item-actions">
                      <button className="btn small" onClick={() => onRemove(item.id, active)}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="muted">No collections</div>
          )}
        </div>
      </div>
    </div>
  )
}
