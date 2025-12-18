import * as Location from "expo-location";
import { createContext } from "react";

export type LocationContextType = {
  location: Location.LocationObject | null;
  setLocation: (location: Location.LocationObject | null) => void;

  buscarPorEndereco: (
    endereco: string
  ) => Promise<Location.LocationGeocodedLocation[]>;

  buscarPorCoordenadas: (
    latitude: number,
    longitude: number
  ) => Promise<Location.LocationGeocodedAddress[]>;

  error: string | null;
};

export const LocationContext =
  createContext<LocationContextType | undefined>(undefined);
