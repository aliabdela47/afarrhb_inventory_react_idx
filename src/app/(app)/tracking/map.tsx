"use client";

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Manually define the icon for leaflet markers to avoid issues with SSR
const truckIcon = L.divIcon({
  html: `<div class="p-2 bg-primary rounded-full shadow-lg"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 text-primary-foreground" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M5 18H3c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2h10l4 5v7c0 1.1-.9 2-2 2h-1"></path><circle cx="7.5" cy="18.5" r="2.5"></circle><circle cx="17.5" cy="18.5" r="2.5"></circle><path d="M15 13H7V7h5.7"></path></svg></div>`,
  className: 'dummy', // This class is needed but doesn't have to be styled
  iconSize: [36, 36],
  iconAnchor: [18, 18]
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
