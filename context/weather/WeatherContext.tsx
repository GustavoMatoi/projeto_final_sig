import { createContext } from "react";

export type WeatherData = {
  name: string;
  temperature: number;
  description: string;
  main: string;
  max_temp: number;
  min_temp: number;
  wind: number;
  humidity: number;
  lat: number;
  lon: number;
};

export type WeatherContextType = {
  clima: WeatherData | null;
  loading: boolean;
  error: string | null;
  buscarDadosMeteorologicos: (cidade: string) => Promise<void>;
  getWeatherIcon: (main: string) => {
    name: string;
    color: string;
  };
};

export const WeatherContext = createContext<WeatherContextType>(
  {} as WeatherContextType
);
