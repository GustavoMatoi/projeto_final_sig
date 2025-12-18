# 🌧️ Sistema de Monitoramento Climático e Áreas de Risco

Este projeto consiste em um aplicativo mobile desenvolvido com React Native e Expo, cujo objetivo é monitorar condições climáticas e alertar usuários sobre áreas de risco geográficas, utilizando dados georreferenciados em tempo real.

O sistema integra geolocalização, dados meteorológicos e mapas interativos, oferecendo uma solução voltada à prevenção de riscos ambientais, especialmente em cenários de chuva intensa.

---

## 📌 Funcionalidades Principais

### 📍 Geolocalização
Utilizando a biblioteca `expo-location`, o sistema é capaz de recuperar a localização atual do usuário, obtendo informações como latitude e longitude, que servem de base para o funcionamento das demais funcionalidades.

---

### 🏙️ Geocoding Reverso
Após a obtenção das coordenadas geográficas, o sistema realiza uma operação de geocoding reverso, que consiste em converter dados geográficos em informações textuais, como o nome da cidade onde o usuário se encontra. Esse dado é utilizado para a consulta de informações meteorológicas.

---

### ☁️ Coleta de Dados Meteorológicos Georreferenciados
O sistema utiliza a API da OpenWeather para a coleta de dados meteorológicos com base no nome da cidade, permitindo o acesso a informações como:
- Temperatura;
- Umidade do ar;
- Velocidade do vento;
- Condições climáticas (chuva, tempestade, entre outras).

---

### 🗺️ Visualização Interativa de Mapas
A partir do uso da biblioteca `react-native-maps`, o aplicativo oferece mapas interativos, possibilitando a visualização da localização do usuário e a exibição dinâmica de marcadores geográficos.

---

### ⚠️ Representação de Áreas de Risco Geográficas
Com o recurso de mapas interativos, é possível realizar a marcação de áreas de risco por meio de marcadores geográficos definidos por latitude e longitude. Para evitar alarmes desnecessários, essas áreas só são exibidas quando há ocorrência de chuva.

---

### 📏 Análise de Proximidade entre Usuário e Áreas de Risco
Com o auxílio da biblioteca `geolib`, o sistema realiza o cálculo da distância, em metros, entre a localização atual do usuário e os pontos de risco mapeados.

---

### 🚨 Geração de Alertas de Risco em Tempo Real
Caso o usuário esteja a uma distância inferior a 100 metros de uma área de risco durante condições climáticas adversas, como chuva ou tempestade, o sistema pode emitir alertas em tempo real, informando sobre os possíveis riscos de permanência naquele local.

---

## 🛠️ Tecnologias Utilizadas

- React Native  
- Expo  
- TypeScript  
- expo-location  
- react-native-maps  
- OpenWeather API  
- geolib  

---

## 🎯 Objetivo do Projeto

O objetivo deste projeto é aplicar conceitos de Sistemas de Informação Geográfica (SIG), integração com APIs externas e análise espacial, oferecendo uma solução que contribua para a redução de riscos socioambientais em ambientes urbanos.
