// WorldMapChart.js
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import geojson from './world-countries.json'; // Replace with your path

// Complete list of countries with values
const initialCountriesData = {
  'US': 0,
  'BR': 1,
  'CN': 0,
  'IN': 1,
  'ZA': 1,
  'FR': 0,
  'DE': 1,
  'IT': 0,
  'JP': 1,
  'KR': 1,
  'AU': 0,
  'EG': 1, // Egypt
  'NG': 1, // Nigeria
  'KE': 0,
  'AR': 1, // Argentina
  'MX': 0,
  'PE': 1, // Peru
  'CO': 0,
  'CL': 1, // Chile
  'UA': 0,
  'PL': 1, // Poland
  'RO': 0,
  'PT': 1, // Portugal
  'SE': 0,
  'NO': 1, // Norway
  'FI': 0,
  'DK': 1, // Denmark
  'BE': 0,
  'NL': 1, // Netherlands
  'CH': 0,
  'AT': 1, // Austria
  'IE': 0,
  'IS': 1, // Iceland
  'PS': 1, // Palestine
  'SA': 1, // Saudi Arabia
  'AE': 1, // United Arab Emirates
  'KW': 1, // Kuwait
  'QA': 1, // Qatar
  'BH': 1, // Bahrain
  'OM': 1, // Oman
  'YE': 1, // Yemen
  'JO': 1, // Jordan
  'LB': 1, // Lebanon
  'SY': 1, // Syria
  'IQ': 1, // Iraq
  'MA': 1, // Morocco
  'TN': 1, // Tunisia
  'LY': 1, // Libya
  'SD': 1, // Sudan
  'DJ': 1, // Djibouti
  'SO': 1, // Somalia
  'MR': 1, // Mauritania
  'EH': 1, // Western Sahara
  'DZ': 1, // Algeria
  'LR': 1, // Liberia
  'GH': 1, // Ghana
  'RW': 1, // Rwanda
  'UG': 1, // Uganda
  'TZ': 1, // Tanzania
  'ZM': 1, // Zambia
  'MW': 1, // Malawi
  'FJ': 1, // Fiji
  'WS': 1, // Samoa
  'TO': 1, // Tonga
  'TV': 1, // Tuvalu
  'VU': 1, // Vanuatu
  'PG': 1, // Papua New Guinea
  'MH': 1, // Marshall Islands
  'FM': 1, // Micronesia
  'NR': 1, // Nauru
  'KI': 1, // Kiribati
  // Add more countries as needed
};

const countryNames = {
   'United States':1,
   'Brazil':1,
   'China':1,
   'India':1,
   'South Africa':1,
   'France':1,
   'Germany':1,
   'Italy':1,
   'Japan':1,
   'South Korea':1,
   'Australia':1,
   'Egypt':1,
   'Nigeria':1,
   'Kenya':1,
   'Argentina':1,
   'Mexico':1,
   'Peru':1,
   'Colombia':1,
   'Chile':1,
   'Ukraine':1,
   'Poland':1,
   'Romania':1,
   'Portugal':1,
   'Sweden':1,
   'Norway':1,
   'Finland':1,
   'Denmark':1,
   'Belgium':1,
   'Netherlands':1,
   'Switzerland':1,
   'Austria':1,
   'Ireland':1,
   'Iceland':1,
   'Palestine':1,
   'Saudi Arabia':1,
   'United Arab Emirates':1,
   'Kuwait':1,
   'Qatar':1,
   'Bahrain':1,
   'Oman':1,
   'Yemen':1,
   'Jordan':1,
   'Lebanon':1,
   'Syria':1,
   'Iraq':1,
   'Morocco':1,
   'Tunisia':1,
   'Libya':1,
   'Sudan':1,
   'Djibouti':1,
   'Somalia':1,
   'Mauritania':1,
   'Western Sahara':1,
   'Algeria':1,
   'Liberia':0,
   'Ghana':0,
   'Rwanda':0,
   'Uganda':0,
   'Tanzania':0,
   'Zambia':1,
   'Malawi':1,
   'Fiji':1,
   'Samoa':1,
   'Tonga':1,
   'Tuvalu':1,
   'Vanuatu':1,
   'Papua New Guinea':1,
   'Marshall Islands':1,
   'Micronesia':1,
   'Nauru':1,
   'Kiribati':1,
  // Add more country names as needed
};

const WorldMapChart = () => {
  const [countriesData, setCountriesData] = useState(countryNames);
  const [hoveredCountry, setHoveredCountry] = useState(null);

  const handleCountryClick = (countryCode) => {
    setCountriesData((prevData) => {
      const newData = { ...prevData };
      delete newData[countryCode];
      return newData;
    });
  };

  const getCountryColor = (countryCode) => {
    if (countriesData[countryCode] === 0) return 'red';
    if (countriesData[countryCode] === 1) return 'green';
    return '#D0D0D0'; // Default color for countries not in the data
  };

  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeoJSON
        data={geojson}
        style={(feature) => ({
          fillColor: getCountryColor(feature.properties.name),
          weight: 1,
          color: 'black',
          opacity: 0.6,
          fillOpacity: 0.6,
        })}
        onEachFeature={(feature, layer) => {
          layer.on({
            mouseover: () => setHoveredCountry(feature.properties.ISO_A3),
            mouseout: () => setHoveredCountry(null),
          });
          layer.bindTooltip(countryNames[feature.properties.ISO_A3] || feature.properties.ISO_A3);
        }}
      />
      {hoveredCountry && (
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            padding: '10px',
            backgroundColor: 'rgba(0,0,0,0.7)',
            color: 'white',
            borderRadius: '4px',
            pointerEvents: 'none',
          }}
        >
          {countryNames[hoveredCountry] || hoveredCountry}
        </div>
      )}
    </MapContainer>
  );
};

export default WorldMapChart;
