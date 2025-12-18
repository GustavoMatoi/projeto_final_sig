import { getDistance } from "geolib";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Marker } from "react-native-maps";
type AreaDeRisco = {
  id: number;
  latitude: number;
  longitude: number;
  tipo: "moderado" | "inundacao";
};

type MarcadoresProps = { 
  item: AreaDeRisco;
  distanciaLat: number;
  distanciaLong: number;
}

export default function Marcadores({item, distanciaLat, distanciaLong}: MarcadoresProps) {
  const [distancia, setDistancia] = useState<number>()

  function calcularDistancia (){
    const distance =  getDistance({
      latitude: item.latitude, longitude: item.longitude
    }, 
    {
      latitude: distanciaLat, longitude: distanciaLong
    }
  )
  setDistancia(distance)
  }

    useEffect(() => {calcularDistancia(), []})

  return (
    <Marker
      key={item.id}
      coordinate={{
        latitude: item.latitude,
        longitude: item.longitude,
      }}
      pinColor={item.tipo === "moderado" ? "yellow" : "blue"}
      title={
        item.tipo === "moderado"
          ? `Área de risco moderado`
          : "Área de inundação"
      }
      onPress={() =>
        Alert.alert(
          item.tipo === "moderado"
            ? "Área de risco moderado"
            : "Área de inundação",
          item.tipo === "moderado"
            ? `No momento, você se encontra a ${distancia} metros. Essa área pode apresentar riscos durante chuvas fortes. Mantenha atenção!`
            : `No momento, você se encontra a ${distancia} metros. Essa área é comumente inundada durante chuvas. Evite transitar por aqui em dias chuvosos!`
        )
      }
    />
  );
}
