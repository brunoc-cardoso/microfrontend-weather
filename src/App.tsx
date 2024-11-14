import React from 'react'
import './styles/global.css'
import { WeatherWidget } from './components/WeatherWidget'

function App() {
  return (
    <div>
      <WeatherWidget
        climateMorning="sunny"
        climateAfternoon="cloudy"
        climateNight="sunny"
      />
    </div>
  )
}

export default App
