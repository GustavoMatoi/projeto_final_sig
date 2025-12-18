import { useLocation } from "@/context/location/useLocation";
import { WeatherContext } from "@/context/weather/WeatherContext";
import { useWeatherScreenViewModel } from "@/hooks/useWeatherScreenViewModel";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";


const { width } = Dimensions.get("window");

export default function WeatherScreen() {
  const { clima, loading, error, cidade, getWeatherIcon } =
    useWeatherScreenViewModel();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {error && (
        <View style={styles.alertCard}>
          <Ionicons name="alert-circle" size={24} color="#ef4444" />
          <Text style={styles.alertText}>{error}</Text>
        </View>
      )}

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerCenter}>
            <View style={styles.locationRow}>
              <Ionicons name="location" size={18} color="#137fec" />
              <Text style={styles.cityName}>
                {clima?.name ?? "Carregando..."}
              </Text>
            </View>
            <Text style={styles.timeText}>Agora</Text>
          </View>
        </View>

        <View style={styles.currentWeather}>
          <View style={styles.glowBackground} />

          {clima && (
            <Ionicons
              name={getWeatherIcon(clima.main).name as any}
              size={120}
              color={getWeatherIcon(clima.main).color}
              style={styles.weatherIcon}
            />
          )}

          <Text style={styles.temperature}>
            {loading ? "..." : `${Math.round(clima?.temperature ?? 0)}°`}
          </Text>

          <Text style={styles.description}>
            {clima?.description?.toUpperCase() ?? "..."}
          </Text>

          <View style={styles.minMaxContainer}>
            <View style={styles.tempDetail}>
              <Text style={styles.tempLabel}>MAX</Text>
              <Text style={styles.tempValue}>
                {clima ? `${Math.round(clima.max_temp)}°` : "..."}
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.tempDetail}>
              <Text style={styles.tempLabel}>MIN</Text>
              <Text style={styles.tempValue}>
                {clima ? `${Math.round(clima.min_temp)}°` : "..."}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.alertCard}>
          <Ionicons name="information-circle" size={24} color="#3b82f6" />
          <View style={styles.alertContent}>
            <Text style={styles.alertTitle}>Atenção ao clima</Text>
            <Text style={styles.alertText}>
              Monitore as condições meteorológicas, especialmente em áreas de
              risco.
            </Text>
          </View>
        </View>

        <View style={styles.detailsGrid}>
          <View style={styles.detailCard}>
            <View style={styles.detailHeader}>
              <Ionicons name="leaf" size={20} color="#94a3b8" />
              <Text style={styles.detailLabel}>VENTO</Text>
            </View>
            <Text style={styles.detailValue}>
              {clima ? clima.wind : "..."}{" "}
              <Text style={styles.detailUnit}>m/s</Text>
            </Text>
          </View>

          <View style={styles.detailCard}>
            <View style={styles.detailHeader}>
              <MaterialCommunityIcons
                name="water-percent"
                size={20}
                color="#94a3b8"
              />
              <Text style={styles.detailLabel}>UMIDADE</Text>
            </View>
            <Text style={styles.detailValue}>
              {clima ? `${clima.humidity}%` : "..."}
            </Text>
            <Text style={styles.detailExtra}>Ponto de orvalho estimado</Text>
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101922",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: "rgba(16, 25, 34, 0.95)",
    borderBottomWidth: 1,
    borderBottomColor: "#1f2937",
  },

  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  cityName: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
  },
  timeText: {
    fontSize: 12,
    color: "#94a3b8",
    fontWeight: "500",
    marginTop: 2,
  },
  currentWeather: {
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 16,
    position: "relative",
  },
  glowBackground: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 192,
    height: 192,
    borderRadius: 96,
    backgroundColor: "rgba(19, 127, 236, 0.2)",
    transform: [{ translateX: -96 }, { translateY: -96 }],
  },
  weatherIcon: {
    marginBottom: 16,
    zIndex: 1,
  },
  temperature: {
    fontSize: 72,
    fontWeight: "700",
    color: "white",
    letterSpacing: -2,
    marginBottom: 8,
  },
  description: {
    fontSize: 20,
    fontWeight: "500",
    color: "#cbd5e1",
    marginBottom: 16,
  },
  minMaxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },
  tempDetail: {
    alignItems: "center",
  },
  tempLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#94a3b8",
    letterSpacing: 1,
    marginBottom: 4,
  },
  tempValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: "#374151",
  },
  alertCard: {
    flexDirection: "row",
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(59, 130, 246, 0.2)",
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 24,
    gap: 12,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#93c5fd",
    marginBottom: 4,
  },
  alertText: {
    fontSize: 12,
    color: "rgba(147, 197, 253, 0.8)",
    lineHeight: 16,
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    marginBottom: 32,
    gap: 12,
  },
  detailCard: {
    width: (width - 44) / 2,
    backgroundColor: "#1c2630",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  detailHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#94a3b8",
    letterSpacing: 1,
  },
  detailValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
    marginBottom: 4,
  },
  detailUnit: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748b",
  },
  detailExtra: {
    fontSize: 12,
    color: "#94a3b8",
  },
  bottomSpacer: {
    height: 20,
  },
});
