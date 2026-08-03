import React from 'react'
import { Link } from 'react-router-dom'

export default function Pin({ item, onSave, onRemove, isSaved }) {
  const handleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSaved) {
      if (onRemove) onRemove(item.id)
    } else {
      if (onSave) onSave(item)
    }
  }

  return (
    <article className="pin">
      <Link to={`/pin/${item.id}`} state={{ pin: item }} className="pin-link">
        <figure>
          <img src={item.image} alt={item.title} />
          <figcaption className="overlay">
            <div className="overlay-title">{item.title}</div>
            <div className="overlay-actions">
              <button className={`btn small ${isSaved ? 'saved' : ''}`} onClick={handleSave}>
                {isSaved ? 'Saved' : 'Save'}
              </button>
            </div>
          </figcaption>
        </figure>
      </Link>
      <div className="pin-title">{item.title}</div>
    </article>
  )
}
