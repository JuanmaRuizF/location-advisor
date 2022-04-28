import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function MapCardComponent(props) {
  const element = props.element;
  return (
    <MapContainer
      center={[element.geocodes.main.latitude, element.geocodes.main.longitude]}
      zoom={15}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={[
          element.geocodes.main.latitude,
          element.geocodes.main.longitude,
        ]}
      >
        <Popup>{element.name}</Popup>
      </Marker>
    </MapContainer>
  );
}
