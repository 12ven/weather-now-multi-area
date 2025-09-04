import { useState } from 'react'
import SearchBar from './components/SearchBar'
import WeatherGrid from './components/WeatherGrid'

export default function App(){
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async (city) => {
    if(!city) return
    setLoading(true); setError(null); setLocations([])
    try{
      // get up to 6 matching locations for the city
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=6&language=en`)
      const geoData = await geoRes.json()
      if(!geoData.results || geoData.results.length === 0){
        setError('No locations found for "' + city + '"')
        setLoading(false)
        return
      }

      const results = await Promise.all(geoData.results.map(async (loc) => {
        const lat = loc.latitude
        const lon = loc.longitude
        // request current + hourly + daily with timezone=auto for local times
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m,apparent_temperature,precipitation_probability,cloudcover&daily=sunrise,sunset&timezone=auto`
        const res = await fetch(url)
        const j = await res.json()
        return {
          id: loc.id || `${lat}_${lon}`,
          name: loc.name + (loc.admin1 ? ', ' + loc.admin1 : '') + (loc.country ? ', ' + loc.country : ''),
          latitude: lat,
          longitude: lon,
          current: j.current_weather || null,
          hourly: j.hourly || null,
          daily: j.daily || null
        }
      }))

      setLocations(results)
    } catch(err){
      console.error(err)
      setError('Failed to fetch data. ' + (err.message||''))
    } finally{
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">🌤 Weather Now — Multi-area</h1>
        <SearchBar onSearch={handleSearch} />
        {error && <div className="text-red-600 text-center mb-4">{error}</div>}
        <WeatherGrid locations={locations} loading={loading} />
      </div>
    </div>
  )
}
