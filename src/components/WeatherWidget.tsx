import React from 'react'

import rainyImg from '../../public/rainy.svg'
import cloudyImg from '../../public/cloudy.svg'
import sunnyDayImg from '../../public/sunny-day.svg'
import sunnyNightImg from '../../public/sunny-night.svg'

type WeatherWidgetProps = {
  climateMorning: 'sunny' | 'cloudy' | 'rainy'
  climateAfternoon: 'sunny' | 'cloudy' | 'rainy'
  climateNight: 'sunny' | 'cloudy' | 'rainy'
}

export function WeatherWidget({
  climateMorning,
  climateAfternoon,
  climateNight
}: WeatherWidgetProps) {
  const climateImg = (climate: string, interval: 'day' | 'night') => {
    if (climate === 'sunny') {
      return interval === 'day' ? sunnyDayImg : sunnyNightImg
    }
    if (climate === 'cloudy') return cloudyImg
    if (climate === 'rainy') return rainyImg
    return ''
  }

  return (
    <div className="w-[32rem] h-72 bg-slate-200 rounded-lg p-10 flex flex-col justify-between">
      <h1 className="font-bold text-xl">Previsão do tempo</h1>
      <span className="text-lg font-medium">Probabilidade de chuva: 78%</span>
      <div className="flex justify-between">
        <div className="gap-8 flex items-center">
          <div className="text-center flex flex-col gap-2">
            <img
              className="w-20 h-20"
              src={climateImg(climateMorning, 'day')}
              alt={`Manhã - ${climateMorning}`}
            />
            <span className="font-medium">Manhã</span>
          </div>

          <div className="text-center flex flex-col gap-2">
            <img
              className="w-20 h-20"
              src={climateImg(climateAfternoon, 'day')}
              alt={`Tarde - ${climateAfternoon}`}
            />
            <span className="font-medium">Tarde</span>
          </div>

          <div className="text-center flex flex-col gap-2">
            <img
              className="w-20 h-20"
              src={climateImg(climateNight, 'night')}
              alt={`Noite - ${climateNight}`}
            />
            <span className="font-medium">Noite</span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-xl font-bold">27° max</span>
          <span className="text-xl font-bold">17° min</span>
        </div>
      </div>
    </div>
  )
}
