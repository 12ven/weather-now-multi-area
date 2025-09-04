import { useState } from 'react'

export default function SearchBar({ onSearch }){
  const [city, setCity] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if(city.trim()) onSearch(city.trim())
  }

  return (
    <form onSubmit={submit} className="flex items-center justify-center gap-3 mb-6">
      <input
        value={city}
        onChange={(e)=>setCity(e.target.value)}
        placeholder="Enter city (e.g. Hyderabad)"
        className="px-4 py-2 rounded-lg w-80 shadow-sm"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Search</button>
    </form>
  )
}
