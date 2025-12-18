import Marcadores from "@/components/Marcadores";
import { Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import React from "react";
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { useHomeViewModel } from "./HomeViewModel";

const HomeScreen = () => {
  const {
    location,
    clima,
    loading,
    getWeatherIcon,
    areasDeRisco,
    mapRegion,
  } = useHomeViewModel();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />

      {mapRegion ? (
        <>
          <MapView style={StyleSheet.absoluteFillObject} region={mapRegion}>
            <Marker
              coordinate={{
                latitude: mapRegion.latitude,
                longitude: mapRegion.longitude,
              }}
              pinColor="red"
              title="Você está aqui"
            />

            {areasDeRisco.map((item) => (
              <Marcadores
                key={item.id}
                item={item}
                distanciaLat={mapRegion.latitude}
                distanciaLong={mapRegion.longitude}
              />
            ))}
          </MapView>

          <View style={styles.alertaClima}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              {clima && (
                <Ionicons
                  name={getWeatherIcon(clima.main).name as any}
                  size={28}
                  color={getWeatherIcon(clima.main).color}
                />
              )}

              <Text style={styles.alertaTitulo}>Clima Atual</Text>
            </View>

            {loading ? (
              <Text style={styles.alertaTexto}>Carregando clima...</Text>
            ) : clima ? (
              <>
                <Text style={styles.alertaTexto}>
                  {Math.round(clima.temperature)}°C • {clima.description}
                </Text>
                <Text style={styles.alertaAviso}>
                  Umidade: {clima.humidity}% • Vento: {clima.wind} m/s
                </Text>
              </>
            ) : (
              <Text style={styles.alertaTexto}>Clima indisponível</Text>
            )}
          </View>

          <View style={styles.legenda}>
            <Text style={styles.legendaTitulo}>Legenda</Text>

            <View style={styles.legendaItem}>
              <Entypo name="location-pin" size={24} color="red" />
              <Text style={styles.legendaTexto}>Sua localização</Text>
            </View>

            <View style={styles.legendaItem}>
              <Entypo name="location-pin" size={24} color="gold" />
              <Text style={styles.legendaTexto}>Risco moderado</Text>
            </View>

            <View style={styles.legendaItem}>
              <Entypo name="location-pin" size={24} color="blue" />
              <Text style={styles.legendaTexto}>Áreas de inundação</Text>
            </View>
          </View>
        </>
      ) : (
        <View style={styles.loading}>
          <Text style={styles.loadingText}>Carregando mapa...</Text>
        </View>
      )}
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  alertaClima: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  alertaTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  alertaTexto: {
    fontSize: 14,
    color: "#555",
    marginBottom: 3,
  },
  alertaAviso: {
    fontSize: 12,
    color: "#777",
    fontStyle: "italic",
  },
  legenda: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  legendaTitulo: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  legendaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  legendaCor: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  legendaTexto: {
    fontSize: 13,
    color: "#555",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
});

export default HomeScreen;
