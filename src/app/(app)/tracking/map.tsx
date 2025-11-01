"use client";

import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { Truck } from "lucide-react";

interface MapComponentProps {
  apiKey: string | undefined;
  vehicles: {
    id: string;
    position: { lat: number; lng: number };
  }[];
}

export function MapComponent({ apiKey, vehicles }: MapComponentProps) {
  const center = { lat: 9.145, lng: 40.4897 }; // Ethiopia center

  if (!apiKey) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-lg border border-dashed bg-muted">
        <div className="text-center text-muted-foreground">
          <p>Google Maps API Key not configured.</p>
          <p className="text-xs">Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY.</p>
        </div>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        defaultCenter={center}
        defaultZoom={6}
        mapId="afar_rhb_map"
        className="h-full w-full rounded-lg border"
      >
        {vehicles.map((vehicle) => (
          <AdvancedMarker key={vehicle.id} position={vehicle.position}>
             <div className="p-2 bg-primary rounded-full shadow-lg">
               <Truck className="h-5 w-5 text-primary-foreground" />
             </div>
          </AdvancedMarker>
        ))}
      </Map>
    </APIProvider>
  );
}
