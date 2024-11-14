import React, { useEffect, useState } from "react";
import eventBus from "host/eventBus";
import rainyImg from "../../public/rainy.svg";
import cloudyImg from "../../public/cloudy.svg";
import sunnyDayImg from "../../public/sunny-day.svg";
import sunnyNightImg from "../../public/sunny-night.svg";

type Climate = "sunny" | "cloudy" | "rainy";

export type Weather = {
  temperature: {
    max: number;
    min: number;
  };
  probabilityOfRain: number;
  morning: {
    climate: Climate;
  };
  afternoon: {
    climate: Climate;
  };
  night: {
    climate: Climate;
  };
  averageClimate: Climate;
};

export function WeatherWidget() {
  const [weather, setWeather] = useState<Weather>({} as Weather);

  useEffect(() => {
    eventBus.on("weatherData", (data: Weather) => {
      if (data) {
        setWeather(data);
      }
    });
  }, []);

  if (!weather) return <div>Loading...</div>;

  const { morning, afternoon, night, probabilityOfRain, temperature } = weather;

  const climateImg = (climate: string, interval: "day" | "night") => {
    if (climate === "sunny") {
      return interval === "day" ? sunnyDayImg : sunnyNightImg;
    }

    if (climate === "cloudy") return cloudyImg;

    if (climate === "rainy") return rainyImg;

    return "";
  };

  return (
    <div className="w-[32rem] h-72 bg-slate-200 rounded-lg p-10 flex flex-col justify-between">
      <h1 className="font-bold text-xl">Previsão do tempo</h1>
      <span className="text-lg font-medium">
        Probabilidade de chuva: {probabilityOfRain}%
      </span>

      <div className="flex justify-between">
        <div className="gap-8 flex items-center">
          <div className="text-center flex flex-col gap-2">
            <img
              className="w-20 h-20"
              src={climateImg(morning?.climate, "day")}
              alt={`Manhã - ${morning?.climate}`}
            />
            <span className="font-medium">Manhã</span>
          </div>

          <div className="text-center flex flex-col gap-2">
            <img
              className="w-20 h-20"
              src={climateImg(afternoon?.climate, "day")}
              alt={`Tarde - ${afternoon?.climate}`}
            />
            <span className="font-medium">Tarde</span>
          </div>

          <div className="text-center flex flex-col gap-2">
            <img
              className="w-20 h-20"
              src={climateImg(night?.climate, "night")}
              alt={`Noite - ${night?.climate}`}
            />
            <span className="font-medium">Noite</span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-xl font-bold">{temperature?.max}° max</span>
          <span className="text-xl font-bold">{temperature?.min}° min</span>
        </div>
      </div>
    </div>
  );
}
