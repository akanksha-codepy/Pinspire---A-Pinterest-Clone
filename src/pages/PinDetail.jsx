import React from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import data from '../data/sample.json'

function truncate(text, max = 140) {
  if (!text) return ''
  return text.length <= max ? text : `${text.slice(0, max).trim()}...`
}

export default function PinDetail() {
  const { id } = useParams()
  const location = useLocation()
  const pinFromState = location.state?.pin
  const pin = pinFromState || data.find(p => String(p.id) === id)

  if (!pin) return <div>Pin not found</div>

  return (
    <div className="detail">
      <Link to="/">Back</Link>
      <h2>{pin.title}</h2>
      <img src={pin.image} alt={pin.title} />
      {pin.description && <p>{truncate(pin.description)}</p>}
    </div>
  )
}
