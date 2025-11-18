import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
 
// Declare google namespace for TypeScript
declare global {
  namespace google {
    namespace maps {
      class Map {
        constructor(element: HTMLElement, options: MapOptions);
      }
      interface MapOptions {
        center: { lat: number; lng: number };
        zoom: number;
        styles?: any[];
      }
      class Marker {
        constructor(options: MarkerOptions);
        setMap(map: Map | null): void;
        addListener(event: string, callback: Function): void;
      }
      interface MarkerOptions {
        position: { lat: number; lng: number };
        map: Map;
        icon?: any;
        title?: string;
        animation?: any;
      }
      class InfoWindow {
        constructor(options: InfoWindowOptions);
        open(map: Map, marker: Marker): void;
      }
      interface InfoWindowOptions {
        content: string;
      }
      namespace SymbolPath {
        const CIRCLE: any;
      }
      namespace Animation {
        const BOUNCE: any;
      }
    }
  }
}
 
interface StateData {
  state_name_en: string;
  migrant_number: number;
  risk_level: string;
  state_code: string;
}
 
interface GoogleMalaysiaMapProps {
  states: StateData[];
  selectedState: string | null;
  onStateClick: (stateName: string) => void;
}
 
// Malaysia state coordinates (latitude, longitude)
const malaysiaStateCoordinates: Record<string, { lat: number; lng: number }> = {
  'Johor': { lat: 1.4927, lng: 103.7414 },
  'Kedah': { lat: 6.1254, lng: 100.3675 },
  'Kelantan': { lat: 6.1256, lng: 102.2386 },
  'Kuala Lumpur': { lat: 3.1390, lng: 101.6869 },
  'Labuan': { lat: 5.2831, lng: 115.2308 },
  'Melaka': { lat: 2.1896, lng: 102.2501 },
  'Negeri Sembilan': { lat: 2.7259, lng: 101.9424 },
  'Pahang': { lat: 3.8126, lng: 103.3256 },
  'Penang': { lat: 5.4141, lng: 100.3288 },
  'Perak': { lat: 4.5921, lng: 101.0901 },
  'Perlis': { lat: 6.4443, lng: 100.1984 },
  'Putrajaya': { lat: 2.9264, lng: 101.6964 },
  'Sabah': { lat: 5.9804, lng: 116.0735 },
  'Sarawak': { lat: 1.5533, lng: 110.3592 },
  'Selangor': { lat: 3.0738, lng: 101.5183 },
  'Terengganu': { lat: 5.3117, lng: 103.1324 }
};
 
// Risk level colors
const riskColors = {
  low: '#22C55E',      // green-500
  high: '#EF4444'      // red-500
};
 
function mapRiskLevel(apiRisk: string): 'low' | 'high' {
  const risk = apiRisk.trim().toLowerCase();
  if (risk.includes('high')) return 'high';
  return 'low';
}
 
export default function GoogleMalaysiaMap({ states, selectedState, onStateClick }: GoogleMalaysiaMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
 
  useEffect(() => {
    // @ts-ignore - Vite environment variables
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    
    console.log('API Key loaded:', apiKey ? 'Present' : 'Missing');
    console.log('Environment:', import.meta.env.MODE);
    
    if (!apiKey || apiKey === 'your_google_maps_api_key_here') {
      const errorMsg = 'Google Maps API key not configured. Please add VITE_GOOGLE_MAPS_API_KEY to your .env file';
      console.error(errorMsg);
      setMapError(errorMsg);
      setIsLoading(false);
      return;
    }
 
    const loader = new Loader({
      apiKey,
      version: 'weekly',
      libraries: ['places']
    });
 
    loader.load().then(() => {
      if (!mapRef.current) return;
 
      // Initialize map centered on Malaysia
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 4.2105, lng: 108.9758 }, // Center of Malaysia
        zoom: 6,
        styles: [
          {
            featureType: 'all',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#ffffff' }]
          },
          {
            featureType: 'all',
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#000000' }, { weight: 2 }]
          },
          {
            featureType: 'water',
            stylers: [{ color: '#1E3A8A' }] // Dark blue water
          }
        ]
      });
 
      mapInstanceRef.current = map;
      setMapError(null); // Clear any previous errors
      setIsLoading(false); // Map is now loaded
 
      // Clear existing markers
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
 
      // Add markers for each state
      states.forEach(state => {
        const stateName = state.state_name_en.trim();
        const coordinates = malaysiaStateCoordinates[stateName];
        
        if (!coordinates) {
          console.warn(`Coordinates not found for state: ${stateName}`);
          return;
        }
 
        const risk = mapRiskLevel(state.risk_level);
        const markerColor = riskColors[risk];
        const isSelected = selectedState === stateName;
 
        // Create custom marker icon
        const markerIcon = {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: markerColor,
          fillOpacity: 0.8,
          strokeColor: '#ffffff',
          strokeWeight: 2,
          scale: isSelected ? 12 : 8
        };
 
        const marker = new google.maps.Marker({
          position: coordinates,
          map,
          icon: markerIcon,
          title: `${stateName}: ${state.migrant_number?.toLocaleString() || 0} workers`,
          animation: isSelected ? google.maps.Animation.BOUNCE : undefined
        });
 
        // Create info window content
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="color: #000; padding: 8px; min-width: 200px;">
              <h3 style="margin: 0 0 8px 0; color: #1f2937; font-weight: bold;">${stateName}</h3>
              <p style="margin: 4px 0; color: #4b5563;">
                <strong>Workers:</strong> ${state.migrant_number?.toLocaleString() || 0}
              </p>
              <p style="margin: 4px 0; color: #4b5563;">
                <strong>Risk Level:</strong> <span style="color: ${markerColor}; font-weight: bold;">${risk.toUpperCase()}</span>
              </p>
            </div>
          `
        });
 
        // Add click event to marker
        marker.addListener('click', () => {
          onStateClick(stateName);
          infoWindow.open(map, marker);
        });
 
        markersRef.current.push(marker);
 
        // Auto-open info window for selected state
        if (isSelected) {
          infoWindow.open(map, marker);
        }
      });
    }).catch(error => {
      const errorMsg = `Failed to load Google Maps: ${error.message}. Please check your API key configuration.`;
      console.error(errorMsg, error);
      setMapError(errorMsg);
      setIsLoading(false);
    });
 
    return () => {
      // Clean up markers
      markersRef.current.forEach(marker => marker.setMap(null));
    };
  }, [states, selectedState, onStateClick]);
 
  return (
    <div className="relative w-full h-64 md:h-96 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-slate-700">
      <div ref={mapRef} className="w-full h-full" />
      
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/90">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mb-4 shadow-2xl shadow-purple-500/50 animate-spin">
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"></div>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Loading Map...</h3>
            <p className="text-sm text-slate-400">Please wait while we load the interactive map</p>
          </div>
        </div>
      )}
 
      {/* Error Overlay */}
      {mapError && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/90">
          <div className="text-center max-w-md px-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mb-4 shadow-2xl shadow-red-500/50">
              <span className="text-white text-xl">⚠️</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Map Loading Error</h3>
            <p className="text-sm text-slate-400 mb-4">{mapError}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}
      
      {/* Legend */}
      {!isLoading && !mapError && (
        <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 flex items-center gap-2 md:gap-4 bg-black/70 px-2 md:px-3 py-1 md:py-2 rounded-lg">
          <div className="flex items-center gap-1 md:gap-2">
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500"></div>
            <span className="text-white text-xs">Low Risk</span>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500"></div>
            <span className="text-white text-xs">High Risk</span>
          </div>
        </div>
      )}
      
      {/* Selected state info */}
      {selectedState && !isLoading && !mapError && (
        <div className="absolute top-2 md:top-4 right-2 md:right-4 bg-black/80 text-white px-3 md:px-4 py-2 rounded-lg max-w-[calc(100%-2rem)] md:max-w-none">
          <div className="font-semibold text-sm md:text-base truncate">{selectedState}</div>
          <div className="text-xs md:text-sm text-gray-300">
            {states.find(s => s.state_name_en.trim() === selectedState)?.migrant_number?.toLocaleString()} workers
          </div>
        </div>
      )}
    </div>
  );
}
