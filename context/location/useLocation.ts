import { useContext } from "react";
import { LocationContext } from "./LocationContext";

export function useLocation() {
  const context = useContext(LocationContext);

  if (!context) {
    throw new Error(
      "useLocation deve ser usado dentro de LocationProvider"
    );
  }

  return context;
}
