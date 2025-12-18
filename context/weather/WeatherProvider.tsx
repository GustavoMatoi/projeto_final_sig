import React, { useState } from "react";
import { Alert } from "react-native";
import { WeatherContext, WeatherContextType, WeatherData } from "./WeatherContext";

type Props = {
  children: React.ReactNode;
};

export function WeatherProvider({ children }: Props) {
  const [clima, setClima] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function buscarDadosMeteorologicos(cidade: string) {
    if (!cidade) {
      Alert.alert("Erro", "Cidade inválida");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setClima(null);


      
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=6fa075125c2a4a329ff707c1f429ddf0&units=metric&lang=pt`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Cidade não encontrada");
        }
        throw new Error("Erro ao buscar dados meteorológicos");
      }

      const data = await response.json();

      setClima({
        name: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        main: data.weather[0].main,
        max_temp: data.main.temp_max,
        min_temp: data.main.temp_min,
        wind: data.wind.speed,
        humidity: data.main.humidity,
        lat: data.coord.lat,
        lon: data.coord.lon,
      });
    } catch (err: any) {
      setError(err.message || "Erro inesperado");
    } finally {
      setLoading(false);
    }
  }

  const weatherIconMap: Record<string, { name: string; color: string }> = {
    Clear: { name: "sunny", color: "#fbbf24" },
    Clouds: { name: "cloud", color: "#94a3b8" },
    Rain: { name: "rainy", color: "#3b82f6" },
    Drizzle: { name: "rainy", color: "#60a5fa" },
    Thunderstorm: { name: "thunderstorm", color: "#6366f1" },
    Snow: { name: "snow", color: "#e5e7eb" },
    Mist: { name: "cloud-outline", color: "#9ca3af" },
    Smoke: { name: "cloud-outline", color: "#9ca3af" },
    Haze: { name: "cloud-outline", color: "#9ca3af" },
    Fog: { name: "cloud-outline", color: "#9ca3af" },
  };

  function getWeatherIcon(main: string) {
    return weatherIconMap[main] || {
      name: "help-circle",
      color: "#94a3b8",
    };
  }

  const value: WeatherContextType = {
    clima,
    loading,
    error,
    buscarDadosMeteorologicos,
    getWeatherIcon,
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
}
