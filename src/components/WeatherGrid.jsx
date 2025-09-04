import WeatherCard from './WeatherCard'

export default function WeatherGrid({ locations, loading }){
  if(loading) return <p className="text-center">Loading…</p>
  if(!locations || locations.length===0) return <p className="text-center text-lg">Search for a city to see area-level weather.</p>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {locations.map(loc => <WeatherCard key={loc.id} data={loc} />)}
    </div>
  )
}
