import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
    LocationContext,
    LocationContextType,
} from "./LocationContext";

type Props = {
  children: React.ReactNode;
};

export function LocationProvider({ children }: Props) {
  const [location, setLocation] =
    useState<Location.LocationObject | null>(null);

  const [error, setError] = useState<string | null>(null);

  async function buscarPorEndereco(endereco: string) {
    return await Location.geocodeAsync(endereco);
  }

  async function buscarPorCoordenadas(
    latitude: number,
    longitude: number
  ) {
    return await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });
  }

  useEffect(() => {
    async function getCurrentLocation() {
      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setError("Permissão de acesso à localização não foi aceita");
        return;
      }

      const currentLocation =
        await Location.getCurrentPositionAsync({});

      setLocation(currentLocation);
    }

    getCurrentLocation();
  }, []);

  const value: LocationContextType = {
    location,
    setLocation,
    buscarPorEndereco,
    buscarPorCoordenadas,
    error,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}
