import { useLocation } from "@/context/location/useLocation";
import { WeatherContext } from "@/context/weather/WeatherContext";
import * as Location from "expo-location";
import { useContext, useEffect, useMemo, useState } from "react";

export type AreaDeRisco = {
  id: number;
  latitude: number;
  longitude: number;
  tipo: "moderado" | "inundacao";
};

export function useHomeViewModel() {
  const { location, buscarPorCoordenadas } = useLocation();
  const {
    buscarDadosMeteorologicos,
    clima,
    loading,
    getWeatherIcon,
  } = useContext(WeatherContext);

  const [endereco, setEndereco] =
    useState<Location.LocationGeocodedAddress | null>(null);

  useEffect(() => {
    if (!location?.coords) return;

    async function carregarEndereco() {
      const resultado = await buscarPorCoordenadas(
        location.coords.latitude,
        location.coords.longitude
      );

      setEndereco(resultado[0] ?? null);
    }

    carregarEndereco();
  }, [location]);

  useEffect(() => {
    if (!endereco?.subregion) return;

    buscarDadosMeteorologicos(endereco.subregion);
  }, [endereco]);

  const areasDeRisco: AreaDeRisco[] = useMemo(
    () => [
      {
        id: 1,
        latitude: -21.278921,
        longitude: -43.178291,
        tipo: "moderado",
      },
      {
        id: 2,
        latitude: -21.280678,
        longitude: -43.17638,
        tipo: "moderado",
      },
      {
        id: 3,
        latitude: -21.268394,
        longitude: -43.179095,
        tipo: "inundacao",
      },
      {
        id: 4,
        latitude: -21.267413,
        longitude: -43.178123,
        tipo: "inundacao",
      },
      {
        id: 5,
        latitude: -21.266414,
        longitude: -43.176834,
        tipo: "inundacao",
      },
      {
        id: 6,
        latitude: -21.755075,
        longitude: -43.345060,
        tipo: "inundacao",
      },
      {
        id: 7,
        latitude: -21.753856, 
        longitude:-43.346577,
        tipo: "inundacao",
      },
      {
        id: 8,
        latitude:-21.748801,
        longitude: -43.352015,
        tipo: "inundacao",
      }
    ],
    []
  );

  const mapRegion = useMemo(() => {
    if (!location?.coords) return null;

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.015,
    };
  }, [location]);

  return {
    location,
    clima,
    loading,
    getWeatherIcon,
    areasDeRisco,
    mapRegion,
  };
}
