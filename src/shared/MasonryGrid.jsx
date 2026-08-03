import React from 'react'
import Pin from './Pin'

export default function MasonryGrid({ items, onSave, onRemove, isSaved }) {
  return (
    <div className="masonry">
      {items.map(item => (
        <Pin key={item.id} item={item} onSave={onSave} onRemove={onRemove} isSaved={isSaved && isSaved(item.id)} />
      ))}
    </div>
  )
}
