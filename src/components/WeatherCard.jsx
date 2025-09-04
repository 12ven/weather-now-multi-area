function formatTime(t){ // expects ISO string or yyyy-mm-ddThh:mm format
  if(!t) return '-'
  // if includes T, take time portion
  if(typeof t === 'string' && t.includes('T')) return t.split('T')[1].slice(0,5)
  return t
}

function safeFirst(arr){ return Array.isArray(arr) && arr.length>0 ? arr[0] : null }

export default function WeatherCard({ data }){
  const { name, current, hourly, daily } = data
  const temp = current?.temperature ?? '—'
  const wind = current?.windspeed ?? '—'
  const winddir = current?.winddirection ?? '—'
  const feels = safeFirst(hourly?.apparent_temperature) ?? '—'
  const humidity = safeFirst(hourly?.relativehumidity_2m) ?? '—'
  const precip = safeFirst(hourly?.precipitation_probability) ?? '—'
  const cloud = safeFirst(hourly?.cloudcover) ?? '—'
  const sunrise = safeFirst(daily?.sunrise) ? formatTime(safeFirst(daily.sunrise)) : '—'
  const sunset = safeFirst(daily?.sunset) ? formatTime(safeFirst(daily.sunset)) : '—'

  return (
    <div className="bg-white rounded-2xl p-5 shadow-md text-slate-900">
      <h3 className="text-lg font-semibold mb-2">{name}</h3>
      <div className="flex items-center gap-4 mb-3">
        <div className="text-4xl font-bold">{temp}°C</div>
        <div className="text-sm text-slate-600">Feels like {feels}°C</div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>💧 Humidity: <strong>{humidity}%</strong></div>
        <div>🌧 Precip: <strong>{precip}%</strong></div>
        <div>☁️ Cloud: <strong>{cloud}%</strong></div>
        <div>💨 Wind: <strong>{wind} km/h</strong></div>
        <div>🧭 Wind Dir: <strong>{winddir}°</strong></div>
        <div>📍 Lat/Lon: <strong>{data.latitude.toFixed(3)},{data.longitude.toFixed(3)}</strong></div>
      </div>

      <div className="mt-3 text-sm text-slate-600">
        <div>🌅 Sunrise: <strong>{sunrise}</strong></div>
        <div>🌇 Sunset: <strong>{sunset}</strong></div>
      </div>
    </div>
  )
}
