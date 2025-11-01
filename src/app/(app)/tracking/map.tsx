"use client";

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Manually define the icon for leaflet markers to avoid issues with bundlers
const truckIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface MapComponentProps {
  vehicles: {
    id: string;
    platenumber: string;
    position: { lat: number; lng: number };
  }[];
}

export function MapComponent({ vehicles }: MapComponentProps) {
  const center: L.LatLngExpression = [9.145, 40.4897]; // Ethiopia center

  return (
    <MapContainer center={center} zoom={6} className="h-full w-full rounded-lg border">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {vehicles.map((vehicle) => (
        <Marker key={vehicle.id} position={[vehicle.position.lat, vehicle.position.lng]} icon={truckIcon}>
          <Popup>
            Plate: {vehicle.platenumber}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
