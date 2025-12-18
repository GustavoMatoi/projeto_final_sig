import { useLocation } from "@/context/location/useLocation";
import { WeatherContext } from "@/context/weather/WeatherContext";
import * as Location from "expo-location";
import { useContext, useEffect, useState } from "react";

export function useWeatherScreenViewModel() {
  const { location, buscarPorCoordenadas } = useLocation();
  const {
    clima,
    loading,
    error,
    buscarDadosMeteorologicos,
    getWeatherIcon,
  } = useContext(WeatherContext);

  const [endereco, setEndereco] =
    useState<Location.LocationGeocodedAddress | null>(null);

  useEffect(() => {
    if (!location?.coords) return;

    const { latitude, longitude } = location.coords;

    async function carregarEndereco() {
      const resultado = await buscarPorCoordenadas(latitude, longitude);
      setEndereco(resultado[0] ?? null);
    }

    carregarEndereco();
  }, [location]);

  useEffect(() => {
    if (!endereco?.subregion) return;

    buscarDadosMeteorologicos(endereco.subregion);
  }, [endereco]);

  return {
    clima,
    loading,
    error,
    cidade: endereco?.subregion ?? null,
    getWeatherIcon,
  };
}
